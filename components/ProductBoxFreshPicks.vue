<template>
  <div class="col">
    <div class="product-box product-box--weekly-feature" data-tile-id="Weekly Feature" nav-tile="true">
      <div class="fresh">
        Fresh
      </div>
      <div class="picks">
        Picks
      </div>
      <!-- <img src="images/hand.png" /> -->
      <!-- <video loop muted autoplay>
        <source src="weeklyFeature.webm" type="video/webm">
      </video> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-box--weekly-feature {
  background: $red;
  color: $white;
  text-align: center;
  justify-content: center;
  display: flex;
  font: 700 13vw 'Sharp Grotesk';
  cursor: pointer;

  @media screen and (min-width: $tablet) {
    font-size: 38px;
  }

  // img {
  //   width: 80%;
  //   position: absolute;
  //   bottom: 0;
  //   right: 0;
  //   animation: hand 3s infinite;
  // }

  video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  &.active, &:hover {
    .fresh {
      animation: fresh .25s forwards;
      transform: translateX(290%);
    }
    .picks {
      animation: picks .25s .25s forwards;
      transform: translateX(-230%);
    }
  }

  // .text {
  //   transform: scale(.6);
  //   animation: text 3s infinite;
  // }
}

@keyframes fresh {
  from { transform: translateX(290%); opacity: 0; }
  to   { transform: translateX(0px); opacity: 1; }
}
@keyframes picks {
  from { transform: translateX(-230%); opacity: 0; }
  to   { transform: translateX(0px); opacity: 1; }
}

// @keyframes hand {
//   0%   { transform: translateX(100%) translateY(100%); }
//   25% { transform: translateX(0) translateY(0); }
//   75% { transform: translateX(0) translateY(0); }
//   100%   { transform: translateX(100%) translateY(100%); }
// }
// @keyframes text {
//   0%   { transform: scale(1); }
//   25% { transform: scale(.6); }
//   75% { transform: scale(.6); }
//   100%   { transform: scale(1); }
// }
</style>
