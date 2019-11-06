<template>
  <div
    :class="[`product-box product-box--department ${department}`, (activeDepartmentAnimation === index ? 'active' : '')]"
    :data-tile-id="department"
    nav-tile="true"
  >
    <div class="background" />
    <div class="background__filter" :class="{ 'animate': currentFilter && currentFilter !== 'viewAll' }">
      <button>
        <div class="product-box__title product-box__title">
          <span v-if="currentFilter && currentFilter !== 'viewAll'" class="next">Next:</span>
          <span class="text" v-if="department === 'Home of PC'">Home<br>of <img src="/icons/pc.png"></span>
          <span class="text" v-else-if="department === 'insiders'">Home of<br><img src="/icons/insiders.png"></span>
          <span v-else-if="department === 'secondary' || department === 'optimum' || department === 'multi'"></span>
          <span class="text" v-else-if="department === 'Deli'">The Deli</span>
          <span class="text" v-else>{{ department }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    department: {
      type: String,
      default: null
    },

    index: {
      type: Number,
      default: null
    },

    activeDepartmentAnimation: {
      type: Number,
      default: -1
    },

    currentFilter: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.product-box--department {
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-stretch: ultra-condensed;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0,0,0,0.5);

  .background {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transition: transform 1000ms ease-in;
  }

  &.active {
    .background {
      transform: scale(1.17);
      transition-delay: 1000ms;
      transition-timing-function: cubic-bezier();
    }
    .background__filter {
      background-color: rgba(0,0,0,.4);
    }
  }

  .background__filter {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: transparent;
    transition: background-color 1000ms ease-in;

    button {
      width: 100%;
      height: 100%;
      z-index: 10;

      .product-box__title {
        font: 700 13vw 'Sharp Grotesk';
        margin-top: 20px;
        text-shadow: 0px 0px 10px $black;

        @media screen and (min-width: $tablet) {
          font-size: 42px;
        }
      }
    }

    .next {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.animate {
      .next {
        animation: fade 6s forwards infinite;
      }
      .text {
        opacity: 0;
        animation: fade 6s 3s forwards infinite;
      }
    }
  }

  &.Produce .background  {
    background-image: url('/images/produce.png')
  }
  &.Butcher .background  {
    background-image: url('/images/butcher.png')
  }
  &.Fish .background  {
    background-image: url('/images/fish.png')
  }
  &.Bakery .background  {
    background-image: url('/images/bakery.png')
  }
  &.Deli .background  {
    background-image: url('/images/deli.jpeg')
  }
  &.Wellness .background {
    background-image: url('/images/wellness.png')
  }
  &.Natural .background {
    background-image: url('/images/natural.png')
  }
  &.Home.PC .background {
    background-image: url('/images/homeofpc.png')
  }
  &.optimum .background {
    background-image: url('/images/optimum.png')
  }
  &.Great .background {
    background-image: url('/images/togo.jpeg')
  }
  &.Health, .background {
    background-image: url('/images/health.png')
  }
  &.Essentials .background {
    background-image: url('/images/essentials.png')
  }
  &.Home .background {
    background-image: url('/images/home.png')
  }
  &.alcohol .background, &.Wine .background {
    background-image: url('/images/alcohol.png')
  }
  &.insiders .background {
    background-image: url('/images/insiders.jpeg')
  }

  &.PC img {
    height: 22vw;
    @media screen and (min-width: $tablet) {
      height: 70px;
    }
  }

  &.insiders img {
    height: 22vw;
    margin-left: 10%;
    @media screen and (min-width: $tablet) {
      height: 70px;
    }
  }
}

@keyframes fade {
  0%   { opacity: 0; }
  50%   { opacity: 1; }
  100%   { opacity: 0; }
}
</style>
