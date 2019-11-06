<template>
  <div class="recipe">
    <div class="recipe__inner">
      <div v-html="recipe" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.recipe {
  background: url('/images/recipe_bg.png') no-repeat center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;

  &__inner {
    padding: 10px;
  }

  h3 {
    color: #7a6b52;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;

    span {
      color: #333;
      font-weight: 100;
    }
  }

  ul, p {
    color: #333;
    font: 12px/16px 'Helvetica';
    margin-bottom: 10px;

    span {
      font-weight: 700;
    }
  }

  li {
    margin-left: 12px;
    list-style: disc;
  }

  &__cta {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 15%;
    cursor: pointer;
  }
}
</style>
