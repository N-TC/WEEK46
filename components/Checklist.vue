<template>
  <div class="modal__background" @click.self="$emit('toggleChecklist')">
    <div class="modal__window checklist">
      <button
        class="modal__close"
        aria-label="Close Modal"
        @click="$emit('toggleChecklist')"
      />

      <h2>in-store checklist</h2>

      <div class="list">
        <div v-for="department in departments" :key="department" class="department">
          <h3>{{ department }}</h3>
          <div
            v-for="(product, index) in checklist"
            :key="product.id"
            v-if="product.department === department"
            class="product"
            :class="{ 'checked': product.isNonProduct }"
          >
            <i class="check" @click="checked(index)" />
            <div class="price" :class="{ variation: product.price.prefix }">
              <span v-if="product.price.value.pricePrefix">{{ product.price.value.pricePrefix }}</span>{{ product.price.value.priceDollar }}<span v-if="product.price.value.priceCents">.</span>{{ product.price.value.priceCents }}
              <span v-if="product.price.value.priceSuffix">{{ product.price.value.priceSuffix }}</span>
              <span v-if="product.price.prefix">
                {{ product.price.prefix.title }}
                <span v-if="product.price.prefix.subtitle">{{ product.price.prefix.subtitle }}</span>
              </span>
            </div>
            {{ product.description }}
            <i class="remove" @click="remove(product)" />
          </div>
        </div>
      </div>

      <div v-if="email && !validEmail" class="invalid">Please enter valid email</div>

      <div class="cta">
        <input
          type="email"
          placeholder="enter email address"
          v-model="email"
        />
        <a class="btn" @click="sendEmail">send</a>
      </div>

      <div class="cta">
        <a class="btn" @click="print">print</a>
        <a class="btn whatsapp" @click="whatsapp">Whatsapp</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: null
    },
    checklistIds: {
      type: Array,
      default: null
    },
    departmentsOrder: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      checklist: [],
      departments: [],
      email: null,
    }
  },

  mounted() {
    this.checklist = this.products.filter((product) => {
      return ~this.checklistIds.indexOf(product.id)
    })

    // Push products inside carousels as well
    for (let product of this.products) {
      if (product.slides) {
        for (let slide of product.slides) {
          if (~this.checklistIds.indexOf(slide.id)) this.checklist.push(slide)
        }
      }
    }

    // If no items then its still saved from previous flyer
    if (!this.checklist.length) this.none()

    // Create the departments
    for (let product of this.checklist) {
      let department = product.department
      if (!this.departments.includes(department)) this.departments.push(department)
    }
    this.departments.sort((a, b) => {
      return this.departmentsOrder.indexOf(a) - this.departmentsOrder.indexOf(b)
    })

    // Sort checklist by department
    this.checklist.sort((a, b) => {
      return this.departments.indexOf(a.department) - this.departments.indexOf(b.department)
    })
  },

  computed: {
    validEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(this.email).toLowerCase())
    },
  },

  methods: {
    remove(product) {
      this.checklist = this.checklist.filter(checklistProduct => checklistProduct.id !== product.id)
      this.$emit('addToChecklist', product, true)
      if (this.checklist.length == 0) this.$emit('toggleChecklist', true)

      // Check for empty departments
      for (let department of this.departments) {
        let length = this.checklist.filter(product => product.department === department).length
        if (length === 0) {
          let index = this.departments.indexOf(department)
          this.departments.splice(index, 1)
        }
      }
    },

    checked(index) {
      this.checklist[index].isNonProduct = !this.checklist[index].isNonProduct
    },

    createMessage(whatsapp = false) {
      let symbol = '☐ '
      if (whatsapp) symbol = '- '
      for (let department of this.departments) {
        let index = this.checklist.map((product) => {return product.department}).indexOf(department)
        this.checklist.splice(index, 0, department)
      }
      let body = 'Here is your shopping list: %0D%0A'
      let description
      for (let product of this.checklist) {
        if (product.description) description = `${symbol} $${product.price.value.priceDollar}.${product.price.value.priceCents} ${product.description.replace(/\&amp;/g, 'and')}
        `
        else description = '%0D%0A' + product.replace(/\&/g, 'and')
        body += description
        body += '%0D%0A'
      }
      return body
    },

    sendEmail() {
      if (!this.validEmail) return
      this.$emit('toggleChecklist')
      const body = this.createMessage()
      window.location.href = `mailto:${this.email}?subject=Loblaws in-store checklist&body=${body}`
    },

    print() {
      window.print()
    },

    whatsapp() {
      const body = this.createMessage(true)
      window.location.href = `whatsapp://send?text=${body}`
    },

    none() {
      window.localStorage.setItem('addedToList', null)
      this.$emit('toggleChecklist')
    }
  }
}
</script>

<style lang="scss">
.checklist {
  h2 {
    color: $dark-orange;
    text-align: center;
    font: 800 4.5vw 'Sharp Grotesk';
    margin-bottom: 10px;

    @media screen and (min-width: $tablet) {
      font-size: 18px;
    }
  }

  .list {
    max-height: 275px;
    overflow-y: scroll;
    background: $white;
    padding: 10px;

    @media screen and (min-width: $tablet) {
      max-height: 380px;
    }
  }

  h3 {
    background: $gray;
    color: $black;
    padding: 10px;
    font-size: 4.5vw;

    @media screen and (min-width: $tablet) {
      font-size: 16px;
    }
  }

  .product {
    padding: 10px 30px;
    padding-left: 50px;
    position: relative;
    font-size: 4.5vw;

    @media screen and (min-width: $tablet) {
      font-size: 16px;
    }
    &:before {
      content: '';
      background: lightskyblue;
      width: 1px;
      display: block;
      height: 100%;
      position: absolute;
      left: 35px;
      top: 0;
      z-index: 0;
    }

    & + .product {
      border-top: 1px solid lightskyblue;
    }
    &.checked {
      text-decoration: line-through
    }
  }

  .price.variation {
    color: $red;
  }

  .check {
    border: 1px solid $gray;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
  }
  .checked .check {
    background: url('/icons/checkmark.png') no-repeat center;
    background-size: contain;
  }

  .remove {
    background: url('/icons/x.svg') no-repeat 50%;
    background-size: 10px 10px;
    transform: rotate(45deg);
    width: 15px;
    height: 15px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .invalid {
    color: $white;
    text-align: center;
    padding: 10px 0 0;
  }

  .cta {
    background: $red;
    margin-top: 10px;
    padding: 10px;
    display: flex;

    input {
      border: 0;
      -webkit-appearance: none;
      padding: 10px;
      flex-grow: 1;
      font: 600 14px 'Univers LT Std';
    }

    .btn {
      margin-left: 8px;

      @media screen and (min-width: $tablet) {
        &.whatsapp {
          display: none;
        }
      }
    }
  }
}


@media print {
  #__layout > div > div, .homeButton {
    display: none;
  }
  #__layout > div > .modal__background {
    display: block;
    position: static;

    .checklist {
      h2 {
        font-size: 24px;
      }
      h3, .product {
        font-size: 18px;
      }
      .list {
        max-height: none;
      }
      .cta {
        display: none;
      }
    }
  }
}
</style>
