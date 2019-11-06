<template>
  <div v-if="products.length">
    <PageHeader
      :departments="departments"
      :browse-by-departments="browseByDepartments"
      :current-filter="currentFilter"
      :list-items="checklist.length"
      :date="weeklyDate"
      :short-date="weeklyDateMid"
      @clearFilter="clearFilter"
      @filterProducts="filterProducts"
      @viewAll="viewAll"
      @toggleChecklist="toggleChecklist"
      v-model="search"
      id="search-term"
    />

    <div v-if="!isFiltered" class="main grid">
      <div v-if="sliderProducts.length" class="col double">
        <Slider :auto-play="true" :video-slider="true">
          <div v-for="product in sliderProducts" :key="product.id">
            <ProductBoxVideo
              :product="product"
              :checklist="checklist"
              @addToChecklist="addToChecklist"
            />
          </div>
        </Slider>
      </div>

      <div v-for="(department, index) in departments" :key="department.key" class="col">
        <ProductBoxFreshPicks
          v-if="department.key === 'fresh picks'"
          @click.native="filterProducts(department.key, department.productIds)"
        />
        <DepartmentBoxVideo
          v-else-if="department.key === 'Members Only' || department.key === 'treats' || department.key === 'decor'"
          :department="department.key"
          @click.native="filterProducts(department.key, department.productIds)"
        />
        <DepartmentBox
          v-else
          :department="department.key"
          :index="index"
          :active-department-animation="activeDepartmentAnimation"
          :current-filter="currentFilter"
          @click.native="filterProducts(department.key, department.productIds)"
          @mouseenter.native="mouseEnterDepartment(index)"
          @mouseleave.native="mouseLeaveDepartment"
        />
      </div>
      <ProductBoxViewAll @click.native="viewAll" />
    </div>

    <transition-group v-else name="product-box-transition" tag="div" class="main grid">

      <div v-if="!trimmedProducts.length" class="error-no-data" :key="'no results'">
        No Results
      </div>

      <div v-if="currentFilter === 'Produce'" class="product-filter" :key="'filter'">
        <h3 class="title">Filter By</h3>
        <form>
          <!-- <label v-for="filter in subDepartments" :key="filter">
            <input type="radio" name="filter" :value="filter" @click="subFilterProducts(filter)">{{ filter }}
          </label> -->

          <label>
            <input type="radio" name="filter" value="fruits" @click="subFilterProducts('fruits')">Fruits
          </label>
          <label>
            <input type="radio" name="filter" value="vegetables" @click="subFilterProducts('vegetables')">Vegetables
          </label>
          <label>
            <input type="radio" name="filter" value="floral" @click="subFilterProducts('floral')">Floral
          </label>
          <label>
            <input type="radio" name="filter" value="all" @click="subFilterProducts('all')">View All
          </label>
        </form>
      </div>

      <div v-for="(product, index) in trimmedProducts" :key="index" class="col">
        <DepartmentBox
          v-if="'productIds' in product"
          :department="product.key"
          :current-filter="currentFilter"
          @click.native="filterProducts(product.key, product.productIds)"
        />
        <ProductBoxSpendGet
          v-else-if="product.promotionTemplateId === 'Optimum Spend Get' || product.promotionTemplateId === 'Optimum Points'"
          :product="product"
          :date="weeklyDateShort"
        />
        <!-- <ProductBoxTemp
          v-else-if="product.promotionTemplateId === 'optimum members only'"
          :product="product"
          :date="weeklyDateShort"
        /> -->
        <ProductBoxMembersOnly
          v-else-if="product.promotionTemplateId === 'members offer'"
          :product="product"
          :date="weeklyDateShort"
        />
        <ProductBoxBogo
          v-else-if="product.promotionTemplateId === 'bogo'"
          :product="product"
          :date="weeklyDateShort"
        />
        <ProductBoxMustBuy
          v-else-if="product.promotionTemplateId === 'must buy'"
          :product="product"
          :checklist="checklist"
          @addToChecklist="addToChecklist"
        />
        <VendorAdCarousel
          v-else-if="product.slides"
          :zone="zone"
          :product="product"
          :checklist="checklist"
          @addToChecklist="addToChecklist"
        />
        <ProductBox
          v-else
          :product="product"
          :checklist="checklist"
          @addToChecklist="addToChecklist"
        />
      </div>
    </transition-group>

    <div class="grid">
      <Footer />
    </div>

    <a v-if="!nearTop" class="toTheTop" @click="toTheTop"/>
    <a v-if="!nearTop && isFiltered" class="homeButton" @click="clearFilter">Home</a>

    <transition name="modal">
      <Checklist
        v-if="showChecklist"
        :products="products"
        :checklist-ids="checklist"
        :departments-order="departmentsOrder"
        @toggleChecklist="toggleChecklist"
        @addToChecklist="addToChecklist"
        @oldChecklist="oldChecklist"
      />
    </transition>

    <transition name="modal">
      <Walkthrough
        v-if="showWalkthrough"
        @toggleWalkthrough="toggleWalkthrough"
      />
    </transition>

  </div>

  <div v-else class="error-no-data">
    <h1>Invalid zone parameter, no data found</h1>
  </div>
</template>

<script>
import Walkthrough from '@/components/Walkthrough'
import PageHeader from '@/components/PageHeader'
import DepartmentBox from '@/components/DepartmentBox'
import DepartmentBoxVideo from '@/components/DepartmentBoxVideo'
import ProductBox from '@/components/ProductBox'
import ProductBoxVideo from '@/components/ProductBoxVideo'
import ProductBoxViewAll from '@/components/ProductBoxViewAll'
import ProductBoxFreshPicks from '@/components/ProductBoxFreshPicks'
import ProductBoxSpendGet from '@/components/ProductBoxSpendGet'
import ProductBoxMembersOnly from '@/components/ProductBoxMembersOnly'
import ProductBoxBogo from '@/components/ProductBoxBogo'
import ProductBoxMustBuy from '@/components/ProductBoxMustBuy'
import ProductBoxTemp from '@/components/ProductBoxTemp'
import Slider from '@/components/Slider'
import Checklist from '@/components/Checklist'
import Footer from '@/components/Footer'
import VendorAdCarousel from '@/components/VendorAdCarousel'

import data from '@/static/products.json'
import throttle from 'lodash/throttle'

export default {
  components: {
    Walkthrough,
    PageHeader,
    DepartmentBox,
    DepartmentBoxVideo,
    ProductBox,
    ProductBoxVideo,
    ProductBoxViewAll,
    ProductBoxFreshPicks,
    ProductBoxSpendGet,
    ProductBoxMembersOnly,
    ProductBoxBogo,
    ProductBoxMustBuy,
    ProductBoxTemp,
    Slider,
    Checklist,
    Footer,
    VendorAdCarousel
  },

  data() {
    return {
      zone: null,
      date: {
        start: new Date(data.start),
        end: new Date(data.end)
      },
      products: data.products,
      filteredProducts: [],
      isFiltered: false,
      currentFilter: null,
      amountToShow: 20,
      trimmedProducts: [],
      sliderProducts: [],
      departments: [],
      browseByDepartments: [],
      activeDepartmentAnimation: -1,
      departmentsOrder: [
        'Produce',
        'Butcher',
        'Fish Market',
        'Bakery',
        'Deli',
        'Wellness',
        'Baby Health Beauty',
        'Everyday Essentials',
        'Great to Go',
        'Wine Beer and Cider',
        'Natural',
        'Home of PC',
        'House & Home',
        'treats',
        'decor'
      ],
      subDepartments: [],
      search: null,
      showWalkthrough: false,
      checklist: [],
      showChecklist: false,
      VendorAds: [],
      nearTop: true
    }
  },

  mounted() {
    this.zone = this.$route.query.zone

    // Filter by zone
    this.products = this.products.filter((product) => {
      if (product.zoneLevel) return product.zoneLevel.includes(this.zone)
      if (!product.zoneLevel) {
        return true
      }
    })

    // Create slider slides
    this.sliderProducts = this.products.filter((product) => {
      console.log('promotionTemplateId', product.promotionTemplateId)
      return product.layoutBlockName === 'DoubleSlider'
    })

    this.createDepartments()

    if (process.browser) {
      window.addEventListener('scroll', this.scroll)
      window.addEventListener('scroll', throttle(this.scrollThrottled, 75))

      let checklist = JSON.parse(window.localStorage.getItem('addedToList'))
      if (checklist) {
        const checkChecklist = this.products.find((product) => {
          return product.id === checklist[0]
        })
        if (checkChecklist) this.checklist = checklist
      }
    }

    if (window.innerWidth > 628) this.startDepartmentAnimationTimer()
    this.dataLayer()
  },

  watch: {
    search (query) {
      this.searchFilter(query)
    },

    isFiltered() {
      if (this.isFiltered) this.stopDepartmentAnimationTimer()
      else this.startDepartmentAnimationTimer()
    }
  },

  computed: {
    weeklyDate() {
      if (!this.date) return
      const options1 = { weekday: 'long', month: 'long', day: 'numeric' }
      const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return `${this.date.start.toLocaleDateString('en-us', options1)} - ${this.date.end.toLocaleDateString('en-us', options2)}`
    },

    weeklyDateMid() {
      if (!this.date) return
      const options1 = { weekday: 'short', month: 'short', day: 'numeric' }
      const options2 = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
      return `${this.date.start.toLocaleDateString('en-us', options1)} - ${this.date.end.toLocaleDateString('en-us', options2)}`
    },

    weeklyDateShort() {
      if (!this.date) return
      const options = { month: 'short', day: 'numeric' }
      return `${this.date.start.toLocaleDateString('en-us', options)} - ${this.date.end.toLocaleDateString('en-us', options)}`
    },
  },

  methods: {
    createDepartments() {
      this.departments = data.departments.filter(department => {
        const intersections = this.products.filter(product => department.productIds.indexOf(product.id) !== -1).length
        if (intersections === 0) return false
        return department.key !== 'Multi-Buy' && department.key !== 'points'
      }).sort((a, b) => {
        return this.departmentsOrder.indexOf(a.key) - this.departmentsOrder.indexOf(b.key)
      })

      const browseByDepartmentsOrder = ['Home of PC', 'points', 'Multi-Buy', 'treats', 'decor']
      this.browseByDepartments = data.departments.filter(department => {
        return department.key === 'Home of PC' || department.key === 'points' || department.key === 'Multi-Buy' || department.key === 'treats' || department.key === 'decor'
      }).sort((a, b) => {
        return browseByDepartmentsOrder.indexOf(a.key) - browseByDepartmentsOrder.indexOf(b.key)
      })
    },

    viewAll() {
      this.currentFilter = 'viewAll'
      this.isFiltered = true
      window.scrollTo(0,0)

      const viewAllDepartments = this.departments.filter(department => {
        return department.key !== 'optimum' && department.key !== 'Home of PC' && department.key !== 'Multi-Buy'
      })

      this.filteredProducts = []

      for (let department of viewAllDepartments) {
        if (department.key !== 'fresh picks') this.filteredProducts.push(department)
        for (let product of this.products) {
          if (department.productIds.includes(product.id)) this.filteredProducts.push(product)
        }
      }

      this.loadMore()

      dataLayer.push({
        'page': {'navItem': 'ViewAll'},
        event: 'pageload'
      })
    },

    filterProducts(department, ids) {
      console.log('filterProducts', department)

      this.currentFilter = department
      this.amountToShow = 20
      window.scrollTo(0,0)

      this.filteredProducts = this.products.filter((product) => {
        return ids.includes(product.id)
      })

      this.isFiltered = true
      this.loadMore()

      dataLayer.push({
        'page': {'navItem': department},
        event: 'pageload'
      })
    },

    subFilterProducts(subDepartment) {
      const productIds = this.departments.find(department => department.key === this.currentFilter).productIds
      this.filterProducts(this.currentFilter, productIds)
      if (subDepartment === 'all') return
      this.filteredProducts = this.filteredProducts.filter((product) => {
        if (product.subDepartment) return product.subDepartment.toLowerCase().includes(subDepartment)
      })
      this.loadMore()
    },

    searchFilter(query) {
      this.currentFilter = 'search'
      if (query) {
        this.filteredProducts = this.products.filter((product) => {
          if (product.description) return product.description.toLowerCase().includes(this.search.toLowerCase())
          if (product.articleNumberOrSku) return product.articleNumberOrSku.includes(this.search)
          if (product.slides) {
            for (let slide of product.slides) {
              if (slide.description && slide.articleNumberOrSku) {
                if (slide.description.toLowerCase().includes(this.search.toLowerCase()) || slide.articleNumberOrSku.includes(this.search))
                  return product
              }
            }
          }
        })
        this.isFiltered = true
        this.loadMore()
      } else this.isFiltered = false
    },

    clearFilter(value) {
      this.currentFilter = null
      this.isFiltered = false
      this.amountToShow = 20
      window.scrollTo(0,0)
    },

    toggleChecklist(close = null) {
      if (close) this.showChecklist = false
      if (!this.checklist.length) return
      this.showChecklist = !this.showChecklist
    },

    addToChecklist(product, isAdded) {
      if (!isAdded) {
        this.checklist.push(product.id)
      } else {
        this.checklist = this.checklist.filter(id => id !== product.id)
      }

      window.localStorage.setItem('addedToList', JSON.stringify(this.checklist))
    },

    oldChecklist() {
      this.checklist = []
    },

    toggleWalkthrough() {
      this.showWalkthrough = !this.showWalkthrough
    },

    scroll() {
      if (!this.isFiltered && window.innerWidth <= 628) this.landingAnimations()
      if (document.documentElement.scrollTop < 400) {
        this.nearTop = true
      } else {
        this.nearTop = false
      }
    },

    scrollThrottled() {
      if (this.isFiltered) this.checkLoadMore()
    },

    checkLoadMore() {
      const height = document.documentElement.offsetHeight - 100
      const scroll = window.scrollY + window.innerHeight
      const bottom = scroll >= height
      if (bottom) {
        let callCount = 1
        let repeater = setInterval(() => {
          if (callCount < 10) {
            callCount += 1
            this.amountToShow = this.amountToShow + 1
            this.loadMore()
          } else {
            clearInterval(repeater)
          }
        }, 150)
      }
    },

    loadMore() {
      this.trimmedProducts = this.filteredProducts.slice(0, this.amountToShow)
      // create nextDepartment
      const filter = this.currentFilter
      if (filter === 'search' || filter === 'viewAll' || filter === 'treats' || filter === 'decor') return

      if (this.trimmedProducts.length >= this.filteredProducts.length) {
        const index = this.departments.map((department) => department.key).indexOf(filter)
        let nextDepartment = this.departments[index + 1]
        if (filter === 'House & Home') {
          nextDepartment = this.departments[2]
        }
        if (nextDepartment) this.trimmedProducts.push(nextDepartment)
      }
    },

    landingAnimations() {
      const productBoxes = document.querySelectorAll('.product-box:not(.video)')
      for (let productBox of productBoxes) {
        const rect = productBox.getBoundingClientRect()
        if (rect.top != 0 && rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
          productBox.classList.add('active')
        } else {
          productBox.classList.remove('active')
        }
      }
    },

    mouseEnterDepartment(index) {
      this.stopDepartmentAnimationTimer()
      this.activeDepartmentAnimation = index
    },

    mouseLeaveDepartment() {
      this.startDepartmentAnimationTimer()
    },

    startDepartmentAnimationTimer () {
      if (this.timerId) {
        return
      }
      this.timerId = setInterval(() => {
        this.activeDepartmentAnimation = (this.activeDepartmentAnimation + 1) % this.departments.length
      }, 2000)
    },

    stopDepartmentAnimationTimer () {
      clearInterval(this.timerId)
      this.timerId = null
    },

    toTheTop() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },

    dataLayer() {
      dataLayer.push({
        'page': {'navItem': 'HomePage', 'storeZone': this.$route.query.zone, 'storeID': this.$route.query.store},
        event: 'pageload'
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: $black;
  overflow-x: hidden;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  .col {
    width: 100%;
  }

  /* TABLET */
  @media screen and (min-width: $tablet) {
    max-width: $tablet;
    width: $tablet;
    .col {
      flex: 0;
    }
  }

  /* DESKTOP */
  @media screen and (min-width: $desktop) {
    max-width: $desktop;
    width: $desktop;
  }
}

.main {
  margin-top: 45px;
  @media screen and (min-width: $tablet) {
    margin-top: 53px;
  }
}

.product-box {
  overflow: hidden;
  height: 83vw;
  padding: 10px;
  margin: 3px 6px;
  box-sizing: border-box;
  background-color: $white;
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (min-width: $tablet) {
    width: 308px;
    height: 275px;
    margin: 3px;
  }
}

.product-box-transition-enter-active {
  transition: all 1s;
}

.product-box-transition-enter {
  opacity: 0;
  transform: translateY(30px);
}

.product-filter {
  background: $dark-orange;
  color: $white;
  width: 100%;
  padding: 10px;
  margin: 3px;

  h3 {
    float: left;
    font-size: 24px;
    margin-right: 20px;
  }

  label {
    margin-right: 10px;
    display: inline-block;
    margin-top: 4px;
  }

  input {
    margin-right: 5px;
    position: relative;
    top: -2px;
  }
}

.modal {
  &__background {
    background: $black-transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: opacity .3s ease;
  }

  &__window {
    background: $dark-gray;
    padding: 10px;
    width: 85%;
    position: relative;
    transition: all .3s ease;
    margin-top: 60px;

    @media screen and (min-width: $tablet) {
      width: 480px;
    }
  }

  &__close {
    background: url('/icons/x.svg') no-repeat 50%;
    background-size: 13px 13px;
    transform: rotate(45deg);
    position: absolute;
    width: 24px;
    height: 24px;
    padding: 4px;
    top: -10px;
    right: -10px;
    background-color: $dark-orange;
    border-radius: 50%;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__window,
.modal-leave-active .modal__window {
  transform: scale(1.1);
}

.btn {
  background: $dark-orange;
  color: $white;
  font: 700 4.5vw/1em 'Sharp Grotesk';
  padding: 9px 10px;
  cursor: pointer;

  @media screen and (min-width: $tablet) {
    font-size: 20px;
  }
}

.error-no-data {
  color: $red;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 34px;
  width: 100%;
}

.toTheTop {
  display: block;
  width: 50px;
  height: 50px;
  background: #afb226 url('/images/pointer.png') no-repeat center 45%;
  background-size: 50% auto;
  border-radius: 50%;
  position: fixed;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  z-index: 999;
}

.homeButton {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  width: 100px;
  padding: 10px;
  background: $dark-orange;
  color: $white;
  margin: auto;
  text-align: center;
  z-index: 999;
  cursor: pointer;
  box-shadow: 2px 2px 1.5px rgba(0, 0, 0, 0.5);

  @media screen and (min-width: $desktop) {
    display: none;
  }
}
</style>
