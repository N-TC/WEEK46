<template>
  <div class="product-box product-box--must-buy promotion" data-tile-id="must buy Promotion">
    <a
      v-if="product.showAddButton"
      class="checklist"
      :class="{ added: addedToChecklist }"
      aria-label="Add to Checklist"
      @click="$emit('addToChecklist', product, addedToChecklist)"
    />

    <img class="product-box__image" :src="product.promoImage" @click="addToCart" />

    <h3>Must Buy</h3>
    <h4>Thurs/Fri/Sat only!</h4>

    <div class="product-box__content">
      <PriceBox :price="product.price" />
      <div class="product-description">
        <div
          class="product-description__copy"
          :class="[truncatedClass, expandedClass]"
          @click="toggleTruncated"
        >
          <span v-html="truncateText(product.description)"></span>
        </div>
        <div class="product-description__code">
          {{ product.articleNumberOrSku }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PriceBox from '@/components/PriceBox'

export default {
  components: {
    PriceBox
  },

  props: {
    product: {
      type: Object,
      default: null
    },
    checklist: {
      type: Array,
      default: null
    },
    date: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      truncateLength: 80,
      truncateExpanded: false,
      collapsedTextClass: 'collapsed'
    }
  },

  computed: {
    truncatedClass() {
      if (this.product.description) return this.product.description.length > 80 ? 'truncated' : ''
    },
    expandedClass() {
      return this.truncateExpanded ? 'expanded' : ''
    },
    addedToChecklist() {
      return this.checklist.find(id => id === this.product.id)
    }
  },

  methods: {
    truncateText (value, length = this.truncateLength) {
      if (value) {
        // superscript &regs first
        value = value.replace(/®/g, '<sup>&reg;</sup>')
        value = value.replace(/PCMD/g, 'PC<sup>MD</sup>')
        return value.length <= length ? value: value.substring(0, length) + '...'
      }
    },

    toggleTruncated() {
      this.truncateExpanded = !this.truncateExpanded
      this.truncateLength = (this.truncateLength == 80 ? 500 : 80);
    },

    addToCart() {
      let articleCode = this.product.articleNumberOrSku
      if (articleCode.includes('/')) articleCode = articleCode.substring(0, articleCode.indexOf('/'))
      console.log('addToCart', articleCode)
      if (articleCode) {
        const item_json = {
          custom1: articleCode
        }

        window.parent.postMessage(
          window.JSON.stringify({
            type: 'ITEM_POP',
            item: item_json
          }), '*')
      } else {
        console.error('Unable to find article code for product.')
      }
    }
  }
}
</script>

<style lang="scss">
.product-box.product-box--must-buy {
  background: $red;

  h3 {
    text-align: center;
    font: 700 8vw 'Sharp Grotesk';

    @media screen and (min-width: $tablet) {
      font-size: 28px;
    }
  }

  h4 {
    text-align: center;
    font: 400 5vw 'Sharp Grotesk';

    @media screen and (min-width: $tablet) {
      font-size: 17px;
    }
  }

  .product-description__copy.truncated {
    &:hover {
      background: #f47176;
    }

    &.expanded {
      background-color: #f47176;
    }
  }

  .product-box__image {
    max-width: 60%;
    max-height: 36%;
    transform: translateY(-15%);
  }
}
</style>
