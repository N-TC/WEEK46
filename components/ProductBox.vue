<template>
  <div
    class="product-box"
    :class="[verticalClass, darkClass, product.promotionTemplateId]"
    :style="{ backgroundImage: 'url(' + product.backgroundImage + ')' }"
    :data-tile-id="product.description"
    @click="clicked"
  >
    <img
      v-if="product.promotionTemplateId === 'bulk'"
      class="bulk__header"
      src="images/bulk_header.png"
    />

    <a
      v-if="product.showAddButton"
      class="checklist"
      :class="{ added: addedToChecklist }"
      aria-label="Add to Checklist"
      @click="$emit('addToChecklist', product, addedToChecklist)"
    />
    <img
      v-if="product.promoImage"
      class="product-box__image"
      :class="{ clickable: product.articleNumberOrSku }"
      :src="product.promoImage"
      @click="addToCart"
    />

    <div
      v-else-if="product.articleNumberOrSku"
      class="product-box__background-click"
      @click="addToCart"
    />

    <img
      v-if="product.logoImage"
      class="product-box__logo-image"
      :src="product.logoImage"
    />

    <div class="product-box__content">
      <PriceBox :price="product.price" />
      <div class="product-description">
        <div
          class="product-description__copy"
          :class="[truncatedClass, expandedClass]"
          @click="toggleTruncated"
          v-html="formattedText(product.description)"
        >
        </div>
        <div class="product-description__code">
          {{ product.articleNumberOrSku }}
        </div>
      </div>
    </div>
    <div v-if="disclaimerText" class="product-disclaimer">
      {{ disclaimerText }}
    </div>

    <div v-if="product.points && product.points.value" class="points-badge">
      <div v-if="product.pointsHeader" class="points-badge__header">
        {{ product.pointsHeader }}
      </div>
      <div class="points-badge__logo">
        <div class="optimum">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 400 1258 440" height="18">
            <circle class="points0" cx="682.1" cy="459.35" r="18.27"></circle>
            <path class="points0" fill="#ED1C24" d="M629.53 535.83h21.82v-26.18h-21.82v-44.51h-28.05v44.51h-22.01v26.18h22.01v95.26h28.05zM746.55 568.38c0-12.72 1.8-22.02 5.43-27.93 3.61-5.91 9.37-8.85 17.26-8.85 12.47 0 18.7 10.81 18.7 32.42v67.08h28.18v-62.71c0-12.89 1.77-22.24 5.3-28.06 3.54-5.81 9.16-8.72 16.9-8.72 6.64 0 11.42 2.45 14.34 7.36 2.82 4.82 4.24 13.04 4.24 24.68v67.46h28.18v-75.06c0-33.16-13.67-49.75-41.02-49.75-15.05 0-26.98 5.99-35.79 17.95-7.98-11.97-18.83-17.95-32.54-17.95-6.16 0-11.26 1.04-15.34 3.13-3.82 1.99-8.43 5.81-13.83 11.47v-11.22H718.5v121.44h28.05v-62.74zM668.07 509.65h28.05v121.44h-28.05zM907.87 605.15c2.41 6.32 6.52 12.01 12.34 17.09 9.47 8.22 21.49 12.34 36.03 12.34 14.63 0 26.67-4.12 36.16-12.34 5.73-5.08 9.76-10.77 12.09-17.09 2.41-7.07 3.62-15.46 3.62-25.19v-70.31h-28.05v69.69c0 20.11-7.95 30.17-23.82 30.17-15.88 0-23.82-10.06-23.82-30.17v-69.69h-28.05v70.31c.01 11.14 1.18 19.54 3.5 25.19zM511.42 504.91c-13.28 0-25.61 4.07-35.82 11.02v-9.67h-27.93v187.72h27.93V621.4a63.443 63.443 0 0 0 35.82 11.02c35.21 0 63.75-28.54 63.75-63.75s-28.54-63.76-63.75-63.76zm0 99.55c-19.78 0-35.81-16.03-35.81-35.81s16.03-35.81 35.81-35.81 35.81 16.03 35.81 35.81-16.03 35.81-35.81 35.81zM367.55 504.91c-35.21 0-63.75 28.54-63.75 63.75s28.54 63.75 63.75 63.75 63.75-28.54 63.75-63.75c0-35.2-28.54-63.75-63.75-63.75zm0 99.55c-19.78 0-35.81-16.03-35.81-35.81s16.03-35.81 35.81-35.81 35.81 16.03 35.81 35.81-16.04 35.81-35.81 35.81zM1055.48 568.38c0-12.72 1.8-22.02 5.43-27.93 3.61-5.91 9.37-8.85 17.26-8.85 12.47 0 18.7 10.81 18.7 32.42v67.08h28.18v-62.71c0-12.89 1.77-22.24 5.3-28.06 3.54-5.81 9.16-8.72 16.9-8.72 6.64 0 11.42 2.45 14.34 7.36 2.82 4.82 4.24 13.04 4.24 24.68v67.46H1194v-75.06c0-33.16-13.67-49.75-41.02-49.75-15.05 0-26.98 5.99-35.79 17.95-7.98-11.97-18.83-17.95-32.54-17.95-6.16 0-11.26 1.04-15.34 3.13-3.82 1.99-8.43 5.81-13.83 11.47v-11.22h-28.05v121.44h28.05v-62.74zM78.49 430.48h161.55v263.8H78.49z"></path>
            <path class="points0" d="M150.94 569.5c-1.36.95-1.54 1.59.31 3.4 16.52 16.55 20.65 32.66 21.81 37.63 1.72 7.37 2.97 13.11 3.12 16.76.5 10.74-5.91 11.22-12.86 5.79-2.13-1.58-8.8-8.63-13.2-18.05-3.42-7.32-8.36-20.95-10.3-31.07-.87-4.57-1.92-3.55-3.27-4.37-2.2-1.28-4.43-4.54-2.98-7.53.98-1.84 2.54-1.7-.93-4.14-12.57-8.84-32.91-16.11-36.68-17.47-3.16-1.14-22.2-7.46-27.88-12.86-6.72-6.35-5.43-10.99 2.76-16.21 10.38-6.69 38.92-20.2 60.88-25.43 11.67-2.77 28.27-6.56 41.3 2.81 8.38-9.35 17.12-13.75 21.84-15.11 4.58-1.32 8.13-.14 10.17 2.38 7.29 9.03-2.06 10.72-5.54 7.39-1.29-1.25-3.98-.12-6.1 1.29-4.19 2.79-9.33 6.23-14.07 11.99 4.62 9.91 7.58 28.16-12.66 49.13 3.62 22.65 21.25 19.51 25.84 18.21 13.93-3.96 32.69-19.75 52.81-40.57 6.26-6.47 14.18-.13 7.49 7.06-22.31 23.84-46.53 39.69-60.67 43.04-14.17 3.37-27.17.44-33.59-20.04 0-.02-3.39 2.75-7.6 5.97zm16.07-62.91c-9.42-7.87-26.62-2.9-35.17-.71-12.01 3.07-27.67 9.03-32.52 11.23-5.12 2.33-9.04 4.48-13.41 6.77-3.42 1.78-11.56 5.54-4.74 9.45 3.34 1.91 7.3 3.45 13.85 6.24 7.05 3 16.87 6.91 21.34 8.88 3.67 1.62 12.52 5.79 16.16 8.3 6.96-4.05 9.71-1.16 11.2 2.58.91 2.26 2.04.95 2.85.16 2.61-2.28 6.64-5.67 8.78-7.9-4-27.02 11.66-45 11.66-45zm5.93 8.07c-5.47 6.99-8.9 20.75-7.95 26.74 10.25-11.29 7.95-26.74 7.95-26.74zm-23.72 69.62c1.93 10.3 9.09 27.97 12.58 33.04.93 1.36 8.69 10.99 1.74-10.92-4.12-13.13-14.32-22.12-14.32-22.12z" fill="#f2746d"></path>
            <path d="M150.94 563.82c-1.36.95-1.54 1.6.31 3.4 16.52 16.55 20.65 32.67 21.81 37.64 1.72 7.36 2.97 13.09 3.12 16.75.5 10.73-5.91 11.22-12.86 5.79-2.13-1.59-8.8-8.63-13.2-18.04-3.42-7.33-8.36-20.96-10.3-31.09-.87-4.58-1.92-3.55-3.27-4.37-2.2-1.28-4.43-4.54-2.98-7.53.98-1.85 2.54-1.71-.93-4.15-12.57-8.83-32.91-16.12-36.68-17.47-3.16-1.13-22.2-7.45-27.88-12.87-6.72-6.33-5.43-10.97 2.76-16.2 10.38-6.68 38.92-20.19 60.88-25.42 11.67-2.79 28.27-6.57 41.3 2.8 8.38-9.35 17.12-13.75 21.84-15.1 4.58-1.31 8.13-.13 10.17 2.37 7.29 9.03-2.06 10.72-5.54 7.37-1.29-1.23-3.98-.1-6.1 1.3-4.19 2.8-9.33 6.23-14.07 11.98 4.62 9.93 7.58 28.17-12.66 49.15 3.62 22.65 21.25 19.51 25.84 18.19 13.93-3.95 32.69-19.75 52.81-40.55 6.26-6.46 14.18-.12 7.49 7.04-22.31 23.85-46.53 39.71-60.67 43.06-14.17 3.36-27.17.45-33.59-20.05 0 .02-3.39 2.8-7.6 6zm16.07-62.9c-9.42-7.88-26.62-2.9-35.17-.72-12.01 3.07-27.67 9.04-32.52 11.24-5.12 2.33-9.04 4.47-13.41 6.75-3.42 1.78-11.56 5.55-4.74 9.47 3.34 1.92 7.3 3.44 13.85 6.23 7.05 3.01 16.87 6.92 21.34 8.89 3.67 1.61 12.52 5.77 16.16 8.27 6.96-4.04 9.71-1.17 11.2 2.6.91 2.25 2.04.95 2.85.16 2.61-2.29 6.64-5.68 8.78-7.91-4-27.01 11.66-44.98 11.66-44.98zm5.93 8.06c-5.47 6.99-8.9 20.75-7.95 26.74 10.25-11.29 7.95-26.74 7.95-26.74zm-23.72 69.63c1.93 10.3 9.09 27.98 12.58 33.04.93 1.36 8.69 10.99 1.74-10.92-4.12-13.12-14.32-22.12-14.32-22.12z" fill="#fff"></path>
          </svg>
        </div>
        <svg class="circle" xmlns="http://www.w3.org/2000/svg" viewBox="380 300 520 550" height="35">
          <path d="M731.52 466.14c.66.6 1.39 1.19 2.06 1.85 53.95 53.86 54.04 141.51.2 195.44-53.85 53.96-141.52 54.04-195.47.19-.67-.67-1.25-1.4-1.87-2.04l-76.07 76.2c.64.64 1.18 1.39 1.86 2.06 96.1 95.93 251.81 95.76 347.75-.34 95.93-96.11 95.77-251.77-.34-347.7-.68-.67-1.42-1.24-2.05-1.87l-76.07 76.21z" fill="#eca9a0"></path>
          <path d="M538.15 468.16c53.17-53.27 139.28-53.9 193.37-2.03l76.07-76.21c-96.24-93.92-250.38-93.26-345.66 2.18-95.26 95.44-95.67 249.62-1.57 345.69l76.07-76.2c-51.95-54.02-51.47-140.14 1.72-193.43" fill="#f2746d"></path>
        </svg>
      </div>
      <div class="points-badge__content">
        <span>{{ product.points.value }}</span>
        <span class="super">pts</span>
      </div>
    </div>

    <div v-if="product.formattedText" class="recipe__cta" @click="toggleRecipe" />

    <Recipe
      v-if="showRecipeModal"
      :recipe="product.formattedText"
      @toggleRecipe="toggleRecipe"
    />

  </div>
</template>

<script>
import PriceBox from '@/components/PriceBox'
import Recipe from '@/components/Recipe'

export default {
  components: {
    PriceBox,
    Recipe
  },

  props: {
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
      truncateLength: 80,
      truncateExpanded: false,
      showRecipeModal: false
    }
  },

  mounted() {
    let productPriceType
    const value = this.product.price.value
    if (value.priceSuffix) productPriceType = value.priceSuffix
    else if (value.pricePrefix && value.pricePrefix.includes('/')) {
      productPriceType = value.pricePrefix.replace('$', '')
    }
    else productPriceType = 'ea.'

    dataLayer.push({
      'productdisplay': [{
        'description': this.product.description,
        'id': this.product.articleNumberOrSku,
        'price': this.product.rawPrice,
        'priceType': 'per pound',
        'department': this.product.department,
        'position': this.product.pagePosition,
        'type': this.product.promotionTemplateId,
        'productPriceType': productPriceType,
      }],
      event: 'productLoad'
    })
  },

  computed: {
    verticalClass() {
      if (this.product.promotionTemplateId) return this.product.promotionTemplateId.includes('vertical') ? 'vertical' : ''
    },
    darkClass() {
      return this.product.darkBackground ? 'dark' : ''
    },
    truncatedClass() {
      if (this.product.description) {
        if (this.product.description.length > 155 && this.verticalClass) return 'truncated long'
        if (this.product.description.length > 300) return 'truncated long'
        if (this.product.description.length > 80) return 'truncated'
      }
    },
    expandedClass() {
      return this.truncateExpanded ? 'expanded' : ''
    },
    addedToChecklist() {
      return this.checklist.find(id => id === this.product.id)
    },
    disclaimerText() {
      if (this.product.disclaimer) return this.product.disclaimer
      if (this.product.subDepartment === 'FRESH SEAFOOD') return 'Fresh seafood items subject to availability'
      if (this.product.department === 'Great to Go') return 'Great to go items plus applicable taxes.'
    }
  },

  methods: {
    truncateText (value, length = this.truncateLength) {
      if (value) return value.length <= length ? value: value.substring(0, length) + '...'
    },

    formattedText(value) {
      if (value) {
        value = value.replace(/®/g, '<sup>&reg;</sup>')
        value = value.replace(/PCMD/g, 'PC<sup>MD</sup>')
        value = value.replace(/MD /g, '<sup>MD</sup> ')
        value = value.replace(/MD./g, '<sup>MD</sup>.')
        value = value.replace(/MD,/g, '<sup>MD</sup>,')
        value = value.replace(/MC /g, '<sup>MC</sup> ')
        value = value.replace(/MC,/g, '<sup>MC</sup>,')
        return this.truncateText(value)
      }
    },

    toggleTruncated() {
      this.truncateExpanded = !this.truncateExpanded
      this.truncateLength = (this.truncateLength == 80 ? 600 : 80);
    },

    addToCart() {
      let articleCode = this.product.articleNumberOrSku
      if (!articleCode) return
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
    },

    clicked() {
      dataLayer.push({
        'id': this.product.articleNumberOrSku,
	      'event': 'tileclick'
      })
    },

    toggleRecipe() {
      this.showRecipeModal = !this.showRecipeModal
    }
  }
}
</script>

<style lang="scss">
.product-box {
  background-size: 100% 100%;

  &__image {
    max-width: 70%;
    max-height: 50%;
    position: absolute;
    left: 0;
    right: 0;
    // top: 7%;
    //bottom: 37%;
    top: 0;
    bottom: 0;
    transform: translateY(-25%);
    margin: auto;

    &.clickable {
      cursor: pointer;
    }
  }

  &__background-click {
    height: 75%;
    cursor: pointer;
  }

  &__logo-image {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 45px;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    position: relative;
    margin-top: auto;
  }

  .product-description {
    margin-left: 6px;
    font-size: 4.5vw;

    @media screen and (min-width: $tablet) {
      font-size: 16px;
    }

    &__copy.truncated {
      padding: 3px 3px 0;
      margin: -3px -3px 0;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: $gray;
      }

      &.expanded {
        background-color: $white;
        z-index: 10;
        padding: 2px;
        border: 1px solid $gray;
      }

      &.long.expanded {
        position: absolute;
        bottom: 12px;
        right: 0;
      }
    }

    &__code {
      font-size: 2.75vw;
      line-height: 1.3em;
      overflow: hidden;
      text-overflow: ellipsis;

      @media screen and (min-width: $tablet) {
        font-size: 11px;
      }
    }
  }

  .product-disclaimer {
    font-size: 9px;
    line-height: 9px;
    font-weight: 100;
    margin: 5px 0 -5px;
    font-stretch: ultra-condensed;
    max-height: 16px;
    min-height: 8px;
    overflow: hidden;
  }

  &.promotion {
    background: $dark-orange;
    color: $white;

    .product-box__header {
      background: $red;
      color: $white;
      font-size: 5vw;
      margin: -10px;
      margin-bottom: 0;
      padding: 9px;
      // text-align: center;
      display: flex;
      justify-content: space-between;

      img.pc {
        height: 6vw;
        margin-top: -3px;
      }

      @media screen and (min-width: $tablet) {
        font-size: 17px;

        img.pc {
          height: 20px;
        }
      }
    }

    .trade {
      font: 100 8px/8px Univers LT Std,Helvetica Neue,Helvetica,Arial,sans-serif;
      font-stretch: ultra-condensed;
      text-align: center;
      position: absolute;
      bottom: 10px;
      left: 10px;
      right: 10px;
    }
  }

  .points-badge {
    min-width: 80px;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #f7dbd9;
    border: 2px solid $red;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__header {
      background: $red;
      color: $white;
      text-align: center;
      position: relative;
      z-index: 1;
      font-size: 12px;
      padding: 3px 0;
    }

    &__logo {
      position: relative;

      .optimum {
        display: flex;
        justify-content: center;
        margin-top: 2px;
        margin-right: 5px;
      }

      .circle {
        position: absolute;
        right: -15px;
        top: -13px;
      }
    }

    &__content {
      display: flex;
      justify-content: center;
      color: #ec1c24;
      font-stretch: normal;
      font-family: 'Noir Std';
      font-weight: 600;
      font-size: 24px;
      padding-left: 5px;
      padding-right: 5px;

      .super {
        font-size: 8px;
      }
    }
  }

  .checklist {
    background: url('/icons/list-add.png') no-repeat 50%;
    background-size: cover;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    cursor: pointer;

    &.added {
      background-image: url('/icons/list-remove.png');
    }
  }

  &.dark {
    .product-description {
      color: $white;
      text-shadow: 0px 0px 5px $black;
    }
    .product-description__copy.truncated.expanded {
      background: $black;
      border: 0;
    }
  }

  &.vertical {
    .product-box__image {
      margin-right: 10px;
      bottom: 0;
      top: 0;
      max-height: 80%;
      max-width: 36%;
      // transform: none;
      transform: translateX(-15%);
    }

    .product-box__content {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;

      max-width: 50%;

      .price-box {
        order: 2;
      }
      .product-description {
        margin-left: 0;
        margin-bottom: 2px;
        width: 100%;

        &__copy.truncated.long.expanded {
          position: static;
          width: 288px;
        }
      }
    }
  }

  &.bulk {
    background-image: url('/images/bulk_bg.png') !important;

    .bulk__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .checklist {
      top: 40px;
    }
  }

  .translate {
    position: absolute;
    background: $black;
    color: $white;
    bottom: 10px;
    right: 10px;
    padding: 2px;
    width: 15px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
