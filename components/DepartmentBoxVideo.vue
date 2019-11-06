<template>
  <div
    :class="`product-box product-box--department ${department}`"
    :data-tile-id="department"
    nav-tile="true"
  >
    <video loop muted autoplay playsinline>
      <source v-if="department === 'Members Only'" src="membersonly.mp4" type="video/mp4">
      <source v-if="department === 'treats'" src="treats.mp4" type="video/mp4">
      <source v-if="department === 'decor'" src="decor.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  props: {
    department: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  cursor: pointer;
}
</style>
