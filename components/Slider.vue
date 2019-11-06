<template>
  <div class="slider" :class="{ 'dark': dark }" ref="slider">
    <div class="slider__list">
      <div class="slider__track" ref="sliderWrap" :style="{'transform': 'translate3d(' + translateX + 'px, 0, 0)','transition-duration': transitionDuration + 'ms'}" @transitionend="_onTransitionEnd">
        <slot></slot>
      </div>
    </div>

    <a class="slider__arrow slider__arrow--next" @click="nextSlide"></a>
    <button v-if="videoSlider" class="toggle" :data-current="currentVideoSrc" @click="togglePause">{{ toggleText }}</button>
  </div>
</template>

<script>
export default {
  created() {
    this.sliderWidth = 0
    this.startTranslate = 0
    this.delta = 0
    this.dragging = false
    this.startPos = null
  },

  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    speed: {
      type: Number,
      default: 500
    },
    videoSlider: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentIndex: 0,
      translateX: 0,
      transitionDuration: 0,
      sliderItems: [],
      isPaused: false,
      currentVideo: null
    }
  },

  mounted() {
    setTimeout(() => {
      this._initSlider()
      if (this.autoPlay && this.loop) {
        this._autoPlay()
      }
    }, 20)

    window.addEventListener('resize', () => {
      this.resizeTimer = setTimeout(() => {
        if (!this.sliderItems) {
          return
        }
        let width = 0
        if (this.$refs.slider) {
          this.sliderWidth = this.$refs.slider.clientWidth
        }
        let childs = this.$refs.sliderWrap.children
        for (let i = 0; i < childs.length; i++) {
          let child = childs[i]
          child.style.width = this.sliderWidth + 'px'
          width += this.sliderWidth
        }
        if (this.loop) {
          width += this.sliderWidth * 2
          this.slide(this.currentIndex, true)
        }
        this.$refs.sliderWrap.style.width = width + 'px'
      }, 300)
    })
  },

  activated() {
    if (this.autoPlay && this.loop) {
      this._autoPlay()
    }
  },

  deactivated() {
    clearTimeout(this.timer)
  },

  beforeDestroy() {
    clearTimeout(this.timer)
  },

  computed: {
    toggleText() {
      return this.isPaused ? 'play' : 'pause'
    },

    currentVideoSrc() {
      if (this.currentVideo) return this.currentVideo.currentSrc
    }
  },

  methods: {
    _initSlider() {
      let sliderWrap = this.$refs.sliderWrap
      this.sliderItems = [].map.call(sliderWrap.children, el => el)
      let width = 0
      this.sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.sliderItems.length; i++) {
        let child = this.sliderItems[i]
        child.style.width = this.sliderWidth + 'px'
        width += this.sliderWidth
      }
      if (this.loop) {
        let duplicateFirstChild = sliderWrap.firstElementChild.cloneNode(true)
        let duplicateLastChild = sliderWrap.lastElementChild.cloneNode(true)
        sliderWrap.insertBefore(duplicateLastChild, sliderWrap.firstElementChild)
        sliderWrap.appendChild(duplicateFirstChild)
        width += 2 * this.sliderWidth
        this.slide(this.currentIndex, true)
      }
      sliderWrap.style.width = width + 'px'
    },

    _onTouchStart(e) {
      clearTimeout(this.timer)
      this.startPos = this._getTouchPos(e)
      this.delta = 0
      this.startTime = new Date().getTime()
      this.transitionDuration = 0
      this.dragging = true
      this.startTranslate = this._getTranslateOffSet(this.currentIndex)
      document.addEventListener('touchmove', this._onTouchMove)
      document.addEventListener('touchend', this._onTouchEnd)
      e.preventDefault()
    },

    _onTouchMove(e) {
      this.delta = this._getTouchPos(e) - this.startPos
      this.translateX = this.startTranslate + this.delta
    },

    _onTouchEnd(e) {
      this.dragging = false
      let isAbnormalSlide = new Date().getTime() - this.startTime < 1000
      console
      if (this.delta < -100 || (isAbnormalSlide && this.delta < -15)) {
        this.nextSlide()
      }
      if (this.delta > 100 || (isAbnormalSlide && this.delta > 15)) {
        this.prevSlide()
      }
      if (Math.abs(this.delta) < 15) {
        let target = e.target.parentElement
        if (target.tagName.toUpperCase() === 'A') {
          target.click()
        }
      }
      document.removeEventListener('touchmove', this._onTouchMove)
      document.removeEventListener('touchend', this._onTouchEnd)
    },

    _getTouchPos(e) {
      return e.changedTouches ? e.changedTouches[0].pageX : e.pageX
    },

    _getTranslateOffSet(index) {
      if (this.loop) {
        index += 1
      }
      return -1 * index * this.sliderWidth
    },

    _revert() {
      this.slide(this.currentIndex)
    },

    _autoPlay() {
      this.timer = setTimeout(() => {
        this.nextSlide()
      }, this.interval)
    },

    _onTransitionEnd(e) {
      if(e.target.classList.contains('slider__track')){
        this._onSlideTransitionEnd(e);
      } else if(e.target.classList.contains('background__gradient')){
        this._onSlideFadeComplete(e);
      }
    },

    _onSlideTransitionEnd(e) {
      clearTimeout(this.timer)
      if (!this.dragging && this.autoPlay) {
        if (this.currentIndex === 0) {
          this.transitionDuration = 0
          this.translateX = this._getTranslateOffSet(this.currentIndex)
        }
        if (this.currentIndex === this.sliderItems.length - 1) {
          this.transitionDuration = 0
          this.translateX = this._getTranslateOffSet(this.currentIndex)
        }
        if (this.loop) {
          this._autoPlay()
        }
      }
    },

    _onSlideFadeComplete(e) {
      clearTimeout(this.timer);
      if (this.videoSlider) {
        this.currentVideo.play();
      }
    },

    slide(index, noAnimation) {
      this.currentIndex = index
      if (this.currentIndex === -1) {
        this.currentIndex = this.sliderItems.length - 1
      }
      if (this.currentIndex === this.sliderItems.length) {
        this.currentIndex = 0
      }
      if (noAnimation) {
        this.transitionDuration = 0
      } else {
        this.transitionDuration = this.speed
      }
      this.translateX = this._getTranslateOffSet(index)

      if (this.videoSlider) this.videoFuncs()
      this.isPaused = false
    },

    prevSlide() {
      let index = this.currentIndex
      if (index > 0 || this.loop) {
        this.slide(index - 1)
      } else {
        this._revert()
      }
    },

    nextSlide() {
      let index = this.currentIndex
      if (index < this.sliderItems.length - 1 || this.loop) {
        this.slide(index + 1)
      } else {
        this._revert()
      }
    },

    videoFuncs() {
      clearTimeout(this.timer);

      if(this.currentVideo) {
        this.currentVideo.ontimeupdate = null
        this.currentVideo.oncanplay = null
      }
      const currentSlide = this.sliderItems[this.currentIndex]

      for (let slide of this.sliderItems) {
        slide.classList.remove('active')
      }
      currentSlide.classList.add('active')
      this.currentVideo = currentSlide.querySelector('video')
      this.currentVideo.currentTime = 0;

      this.currentVideo.ontimeupdate = (e) => {
        const vid = e.target
        const diff = vid.duration - vid.currentTime;
        if (diff <= 0)  {
          this.currentVideo.ontimeupdate = null;
          this.currentVideo.oncanplay = null
          this.nextSlide()
        }
      }
    },

    togglePause() {
      this.isPaused = !this.isPaused
      if (this.isPaused) {
        clearTimeout(this.timer)
        if (this.videoSlider) this.currentVideo.pause()
      } else {
        this._autoPlay()
        if (this.videoSlider) this.currentVideo.play()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  min-height: 1px;
  max-width: 100vw;

  &__list {
    display: block;
    overflow: hidden;
    margin: 0 auto;
  }

  &__track {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > * {
      overflow: hidden;
    }
  }

  .slider__arrow {
    cursor: pointer;
    position: absolute;
    bottom: 40%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 20px;
    height: 40px;
    background-image: url('/icons/next.png');
    right: 5px;
  }

  &.dark .slider__arrow--next {
    background-image: url('/icons/next-black.png');
  }
}

.toggle {
  background: rgba(0,0,0,.4);
  color: $white;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 5px;
  right: 10px;
}
</style>
