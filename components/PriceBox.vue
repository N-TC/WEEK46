<template>
  <div class="price-box">
    <div class="price-box__inner">
      <div v-if="price.prefix" class="price-box__variation" :class="price.prefix.title">
        <div v-if="price.prefix.origin && price.prefix.origin != 'LOCAL'" class="price-box__origin" :class="price.prefix.origin">
          {{ price.prefix.origin }}
        </div>
        <div v-if="price.prefix.title" class="price-box__variation-text">
          {{ price.prefix.title }}
        </div>
        <div v-if="price.prefix.subtitle" class="price-box__variation-subtext">
          {{ price.prefix.subtitle }}
        </div>
      </div>
      <div class="price-box__price">
        <span v-if="price.value.pricePrefix" class="super" :class="{ 'from': price.value.pricePrefix === 'from' }">{{ price.value.pricePrefix }}</span>
        <!-- <span>{{ price.value.priceDollar }}</span> -->
        <span v-html="superDollar(price.value.priceDollar)"></span>
        <span class="super">{{ price.value.priceCents }}<span v-if="price.value.priceSuffix" class="super-super">{{ price.value.priceSuffix }}</span>
        </span>
      </div>
      <div v-if="price.suffix" class="price-box__origin" :class="price.suffix.title">
        {{ price.suffix.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Object,
      default: null
    }
  },

  methods: {
    superDollar (value) {
      if (value) return value.replace('$', '<span class="super dollar">$</span>')
    }
  }
}
</script>

<style lang="scss">
.price-box {
  min-width: 112px;
  flex-shrink: 0;
}

_:-ms-lang(x), .price-box__price {
  line-height: 60px !important;
}

.price-box__price {
  background-color: $black;
  color: $white;
  font-size: 22vw;
  line-height: 0.85em;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  padding: 0 2px;

  span {
    display: flex;
  }

  .super-wrap {
    display: flex;
    flex-wrap: wrap;
    max-width: 30px;
    .super-super {
      margin-top: -5px;
    }
  }
  .super {
    font-size: 12vw;
    line-height: 1em;

    &.from {
      font-size: 5vw;
    }
  }
  .super-super {
    font-size: 5vw;
    line-height: 1.5em;
  }

  @media screen and (min-width: $tablet) {
    font-size: 68px;
    .super {
      font-size: 40px;

      &.from {
        font-size: 16px;
      }
    }
    .super-super {
      font-size: 16px;
    }
  }
}

.price-box__footer {
  background: $white;
  color: $red;
  text-transform: uppercase;
  text-align: center;
  font-size: 15px;
  padding-top: 3px;
  height: 18px;
}

.price-box__variation {
  text-transform: uppercase;
  text-align: center;

  .price-box__variation-text {
    padding: 2px 0;
  }

  .price-box__variation-subtext {
    padding: 0 2px 2px 2px;
  }

  &.SALE {
    min-height: 40px;
    background-color: $red;
    .price-box__variation-text {
      color: $yellow;
      font-size: 24px;
    }
    .price-box__variation-subtext {
      color: $white;
      font-size: 14.5px;
    }
  }

  &.generic {
    background-color: $dark-gray;
    text-transform: none;
    .price-box__variation-text {
      color: $white;
      font-size: 15px;
    }
  }

  &.MULTI {
    background-color: $orange;
    .price-box__variation-text {
      color: $dark-red;
      font-size: 8vw;
    }
    .price-box__variation-subtext {
      color: $black;
      font-size: 3vw;
      font-style: italic;
      text-transform: none;
    }

    @media screen and (min-width: $tablet) {
      .price-box__variation-text {
        font-size: 30px;
      }
      .price-box__variation-subtext {
        font-size: 13px;
      }
    }
  }

  &.BAKED {
    background-color: $orange;
    color: $white;;
    font-size: 15px;
  }

  &.MIX {
    background-color: $red;
    color: $white;
    .price-box__variation-text {
      font-size: 18px;
      max-width: 80px;
      margin: 0 auto;
    }
    .price-box__variation-subtext {
      font-size: 13px;
      font-style: italic;
      text-transform: none;
    }
  }

  &.FLORAL {
    background-color: chocolate;
    color: $white;
    .price-box__variation-text {
      font-size: 18px;
    }
    .price-box__variation-subtext {
      font: 11px 'Lato', sans-serif;
      font-style: italic;
      text-transform: none;
      font-weight: 100;
    }
  }
}

.price-box__origin {
  padding: 2px;
  color: $white;
  font-size: 20px;

  &.ONTARIO {
    background-color: $blue;
  }

  &.CANADA {
    background-color: #cc3221;
  }

  &.ORGANIC {
    background: #a3c438;
    color: $white;
    padding: 2px;
    text-align: center;
  }
}
</style>
