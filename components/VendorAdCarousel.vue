<template>
  <div class="product-box carousel" data-tile-id="Vendor Ad Carousel">
    <Slider v-if="slides.length > 1" :auto-play="true" :dark="true">
      <ProductBox
        v-for="product in slides"
        :key="product.id"
        :product="product"
        :checklist="checklist"
        @addToChecklist="addToChecklist"
      />
    </Slider>
    <ProductBox
      v-else-if="slides.length < 1 && slides[0]"
      :product="slides[0]"
      :checklist="checklist"
      @addToChecklist="addToChecklist"
    />
  </div>
</template>

<script>
import Slider from '@/components/Slider'
import ProductBox from '@/components/ProductBox'

export default {
  components: {
    Slider,
    ProductBox
  },

  props: {
    zone: {
      type: String,
      default: null
    },
    product: {
      type: Object,
      default: null
    },
    checklist: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      slides: []
    }
  },

  mounted() {
    // Filter by zone
    this.slides = this.product.slides.filter((product) => {
      if (product.zoneLevel) return product.zoneLevel.includes(this.zone)
    })
  },

  methods: {
    addToChecklist(product, addedToChecklist) {
      this.$emit('addToChecklist', product, addedToChecklist)
    },
  }
}
</script>

<style lang="scss" scoped>
.product-box.carousel {
  background-size: cover;
  padding: 0;

  .product-box {
    margin: 0;
  }
}
</style>
