<template>
  <div class="col">
    <div class="product-box product-box--view-all animating" data-tile-id="View All"  nav-tile="true">
      <button>
        <div class="product-box__title">
          <div class="view">
            View
          </div>
          <div class="all">
            all
          </div>
          <div class="offers">
            offers
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-box--view-all {
  background: $dark-orange;
  overflow: hidden;
  justify-content: center;
  font: 700 13vw 'Sharp Grotesk';
  color: $white;
  text-align: center;
  cursor: pointer;

  @media screen and (min-width: $tablet) {
    font-size: 42px;
  }

  .offers {
    color: $red;
  }

  &.active, &:hover {
    .view {
      animation: view .25s forwards;
      transform: translateX(-230%);
    }
    .all {
      animation: all .25s .25s forwards;
      transform: translateX(290%);
    }
    .offers {
      animation: offers .25s .5s forwards;
      transform: translateY(350%);
    }
  }
}

@keyframes view {
  from { transform: translateX(-230%); opacity: 0; }
  to   { transform: translateX(0px); opacity: 1; }
}
@keyframes all {
  from { transform: translateX(290%); opacity: 0; }
  to   { transform: translateX(0px); opacity: 1; }
}
@keyframes offers {
  from { transform: translateY(350%); opacity: 0; }
  to   { transform: translateY(0px); opacity: 1; }
}
</style>
