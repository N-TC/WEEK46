<template>
  <div class="product-box video" :data-tile-id="product.description">
    <a
      v-if="product.showAddButton"
      class="checklist"
      :class="{ added: addedToChecklist }"
      aria-label="Add to Checklist"
      @click="$emit('addToChecklist', product, addedToChecklist)"
    />

    <video playsinline="" muted="" >
      <source :src="'videos/' + product.associatedVideo" type="video/mp4">
    </video>
    <div class="background__gradient"></div>

    <div class="product-box__content">
      <PriceBox :price="product.price" />
      <div class="product-description">
        <div class="product-description__copy" v-html="formattedText(product.description)">
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
    }
  },

  computed: {
    addedToChecklist() {
      return this.checklist.find(id => id === this.product.id)
    }
  },

  methods: {
    formattedText(value) {
      if (value) {
        value = value.replace(/®/g, '<sup>&reg;</sup>')
        value = value.replace(/PCMD/g, 'PC<sup>MD</sup>')
        return value
      }
    }
  }
}
</script>

<style lang="scss">
.grid .col.double {
  flex: 100%;
  overflow: hidden;
  max-width: 628px;

  @media screen and (min-width: $tablet) {
    .slider {
      margin-right: 5px;
    }
  }

  @media screen and (min-width: $desktop) {
    flex: 50%;
    width: 50%;
  }
}

.product-box.video {
  background: $black;
  color: $white;

  @media screen and (min-width: $tablet) {
    width: 100%;
  }

  video {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    min-height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .background__gradient {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transition: background 1s 1s;
    background: $black;
  }
}

.active .product-box.video .background__gradient {
  background: linear-gradient(4deg,rgba(0,0,0,.5) 16%,rgba(0,0,0,.2) 40%,hsla(0,0%,100%,0) 50%);
}
</style>
