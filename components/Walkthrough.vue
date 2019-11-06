<template>
  <div class="modal__background" @click.self="$emit('toggleWalkthrough')">
    <div class="modal__window walkthrough">
      <button
        class="modal__close"
        aria-label="Close Modal"
        @click="$emit('toggleWalkthrough')"
      />

      <Slider :dark="true">
        <div>
          <h3>INTRO</h3>
          <p>Welcome to the new digital Loblaws flyer! Simple and easy to navigate… take a look around to see how it works.</p>
        </div>
        <div>
          <h3>NAVIGATION (SEARCH)</h3>
          <p>When it comes to navigating our flyer, you have 3 straightforward options:</p>
          <h4>KEYWORD:</h4>
          <p>Just enter the item you are looking for and voila!</p>
          <h4>BROWSE:</h4>
          <p>Use our pull-down menu to find exactly what you’re looking for by department.</p>
          <h4>THUMB-ROLL OR SCROLL:</h4>
          <p>Simply thumb-roll (while on your phone), or scroll up and down (while using your desktop computer or laptop) through our home page and tap/click on the category of your choice.</p>
        </div>
        <div>
          <h3>SHOPPING LIST</h3>
          <p>Create an in-store checklist by clicking on the icon by the product.</p>
          <p>Once the icon turns green, it is automatically added to your list.</p>
          <p>Feel free to add (and remove) as many items to your list as you want, whenever you want.</p>
          <p>At any time, you can email or print out your list, or pull it up on your phone when you’re in the store.</p>
          <p>By bringing up the list on your phone, you also have the option of either removing items from your list or checking them off as you shop.</p>
        </div>
        <div>
          <h3>ECOMMERCE</h3>
          <p>If you wish to have your groceries available for pick up or delivery, simply click on the picture and it will add the product to your shopping cart.</p>
        </div>
        <div>
          <h3>CONCLUSION</h3>
          <p>Enjoy quick, simple and convenient grocery shopping, every day.</p>
        </div>
      </Slider>


    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider'

export default {
  components: {
    Slider
  }
}
</script>

<style lang="scss" scoped>
.walkthrough {
  background: $white;
}
</style>
