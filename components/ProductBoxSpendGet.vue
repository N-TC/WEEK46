<template>
  <div class="product-box product-box--spend-get promotion" data-tile-id="Spend Get Promotion">
    <div class="product-box__header">
      <img src="/icons/optimum.png" class="pc" />
      <span>{{ date }}</span>
    </div>

    <img class="product-box__image clickable" :src="product.promoImage" @click="addToCart">

    <div class="product-box__content">
      <div class="points">
        <span v-if="product.points.header" class="header">{{ product.points.header }}</span>
        <span>{{ product.points.value }}</span>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.16 24.81">
            <defs>
              <path id="SVGID_1_" d="M0 0h35.16v24.81H0z"></path>
            </defs>
            <clipPath id="SVGID_2_">
              <use xlink:href="#SVGID_1_" overflow="visible"></use>
            </clipPath>
            <path d="M22.75 23.91H12.4C6.05 23.91.9 18.76.9 12.41S6.05.9 12.4.9h10.35c6.35 0 11.5 5.15 11.5 11.5s-5.15 11.51-11.5 11.51" clip-path="url(#SVGID_2_)" fill="#fff"></path>
            <path class="st1" d="M22.75 24.81H12.41C5.57 24.81 0 19.25 0 12.41 0 5.57 5.57 0 12.41 0h10.35c6.84 0 12.4 5.57 12.4 12.41s-5.57 12.4-12.41 12.4m-10.34-23c-5.84 0-10.6 4.75-10.6 10.6 0 5.84 4.76 10.6 10.6 10.6h10.35c5.84 0 10.6-4.76 10.6-10.6 0-5.85-4.75-10.6-10.6-10.6H12.41z" fill="#ed1c24"></path>
            <path class="st1" d="M20.36 5.7h-1.92v3.05h-1.51v1.76h1.51v6.56h1.92v-6.56h1.49V8.75h-1.49zM26.17 11.96c-.12-.05-.24-.11-.36-.16-.08-.04-.17-.07-.25-.11-.67-.3-1.2-.59-1.2-1.05 0-.38.36-.63.69-.63.36 0 .72.25.9.62l.08.16 1.58-.84-.08-.15c-.48-.97-1.35-1.53-2.39-1.53-1.43 0-2.59 1.14-2.59 2.55 0 1.22.75 1.73 1.67 2.22l.55.29.98.52c.35.23.5.39.5.75 0 .64-.55.99-1.07.99-.68 0-1.02-.39-1.34-.96l-.08-.14-1.64.74.06.15c.44 1.17 1.65 1.95 3 1.95 1.68 0 2.99-1.26 2.99-2.88-.01-1.4-1.02-2.04-2-2.49M12.35 15.25c-1.34 0-2.43-1.07-2.45-2.41v-.03-.07c0-.13.02-.26.04-.38.2-1.15 1.21-2.02 2.41-2.02 1.35 0 2.46 1.1 2.46 2.46v.05a2.472 2.472 0 0 1-2.46 2.4m0-6.82c-.89 0-1.72.27-2.41.73-.02.01-.03.02-.05.03v-.67H8v12.04h1.89V16.4c.7.48 1.54.76 2.45.76 2.4 0 4.34-1.93 4.37-4.32v-.03c0-2.42-1.95-4.38-4.36-4.38" fill="#ed1c24"></path>
        </svg>
      </div>
      <p class="description">{{ product.description }}</p>
      <p class="product-description__code">{{ product.articleNumberOrSku }}</p>

      <p class="product-disclaimer">*Must be a PC Optimum member. See terms &<br/>conditions in-store for redemption restrictions.</p>
    </div>

    <p v-if="product.disclaimer" class="trade">{{ product.disclaimer }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    },
    date: {
      type: String,
      default: null
    }
  },

  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
.product-box--spend-get {
  .product-box__image {
    position: static;
    max-width: 65%;
    max-height: 30%;
    transform: none;
    margin: 3% auto 0;

  }

  .product-box__content {
    flex-direction: column;
    align-items: center;
    margin-top: 0;
    position: static;
  }

  .points {
    font: 16vw 'Noir Std';
    width: 100%;
    display: flex;
    justify-content: center;

    .header {
      color: $red;
      font-size: 6vw;
      width: 18vw;
      line-height: 1em;
      margin-top: 25px
    }

    svg {
      width: 7vw;
      height: 7vw;
      margin-top: 3vw;
      margin-left: 10px;
    }

    @media screen and (min-width: $tablet) {
      font-size: 46px;

      .header {
        font-size: 18px;
        width: 55px;
        margin-top: 10px
      }

      svg {
        width: 22px;
        height: 20px;
        margin-top: 8px;
        margin-left: 3px;
      }
    }
  }

  .description {
    font-size: 3.5vw;
    text-align: center;

    @media screen and (min-width: $tablet) {
      font-size: 12px;
    }
  }

  .product-disclaimer {
    position: absolute;
    bottom: 14px;
  }
}
</style>
