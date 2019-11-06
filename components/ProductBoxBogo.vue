<template>
  <div class="product-box product-box--bogo promotion" data-tile-id="Bogo Promotion">
    <div class="product-box__header">
      <span>{{ product.blockHeader }}</span>
    </div>

    <div class="row">
      <div class="column">
        <div class="product-description">
          <h3>Buy 1</h3>
          <div class="product-description__copy">{{ product.description }}</div>
          <div class="product-description__code">{{ product.articleNumberOrSku }}</div>
        </div>

        <img class="product-box__image" :src="product.promoImage">

      </div>

      <div class="column">
        <div class="product-description">
          <h3>{{ product.secondaryHeader }}</h3>
          <div class="product-description__copy">{{ product.secondaryDescription }}</div>
          <div class="product-description__code">{{ product.secondaryArticle }}</div>
        </div>

         <img class="product-box__image" :src="product.secondaryImage">

      </div>
    </div>
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

  mounted() {
    console.log('Buy X', this.product)
  }
}
</script>

<style lang="scss" scoped>
.product-box--bogo {
  .product-box__header {
    margin: 0;
    justify-content: center;
    align-self: center;
    padding: 0 4px;

    span {
      border: 1px solid #fff;
      padding: 6px 14px 4px;
      position: relative;
      top: -4px;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
  }

  .column {
    flex: 1;
    text-align: center;
    position: relative;

    & + .column {
      margin-left: 10px;
    }
  }

  h3 {
    color: $red;
    font: 600 20px 'Sharp Grotesk';
    margin-bottom: 10px;
  }

  .product-description {
    font-size: 13px;
    text-align: left;
  }

  .product-box__image {
    position: static;
    transform: none;
    max-height: 40%;
    margin: 10px auto 0;
  }
}
</style>
