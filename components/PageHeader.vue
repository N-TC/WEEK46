<template>
  <div>
    <header>
      <div class="grid">
        <div class="left" @click="$emit('clearFilter')">
          <div class="logo"/>
          <h1>Weekly Flyer
            <span class="nondesktop">{{ shortDate }}</span>
            <span class="desktop">{{ date }}</span>
          </h1>
        </div>

        <div class="checklist__icon" @click="$emit('toggleChecklist')">{{ listItems }}</div>
        <div class="search__icon nondesktop"  @click="searchToggle()" />
        <input
          ref="search"
          type="search"
          class="search__field desktop"
          placeholder="Search in flyer"
          v-bind:value="search"
          v-on:input="emitSearch($event.target)"
          v-on:keyup.enter="searchEnter($event.target)"
          v-on:blur="closeSearch"
        >
        <button class="close__icon desktop" type="reset" @click="clearSearchInput">
          <svg viewBox="0 0 24 24">
            <polygon
              points="17.8,16.7 16.6,17.9 12,13.3 7.4,17.9 6.2,16.7 10.8,12.1 6.2,7.5 7.4,6.3 12,11 16.6,6.4 17.8,7.6 13.2,12.2">
            </polygon>
          </svg>
        </button>

        <div class="nav__icon" @click="toggle()" />
        <div class="browse" @click="toggle()">
          browse by
        </div>
      </div>
    </header>

    <div v-if="showMenu" class="menu-container" @click.self="toggle()">
      <div class="grid">
        <nav class="menu">
          <ul class="menu__dropdown">
            <li>
              <a class="nav" @click="$emit('clearFilter'), toggle()" data-nav-item="home">Home</a>
            </li>
            <li>
              <a class="submenu__trigger" @click="subToggle()">Department</a>
              <ul v-if="showSubMenu" class="submenu__dropdown">
                <li
                  v-for="department in departments"
                  :key="department.key"
                  v-if="department.key !=='fresh picks'
                  && department.key !=='Members Only'
                  && department.key !=='optimum'
                  && department.key !=='Home of PC'
                  && department.key !=='treats'
                  && department.key !=='decor'"
                  @click="$emit('filterProducts', department.key, department.productIds), toggle(), subToggle()"
                >
                  <a
                    v-if="department.key != 'secondary' && department.key != 'homeofpc'"
                    class="nav"
                    :class="{ active: currentFilter === department.key }"
                    :data-nav-item="department.key"
                  >
                    <span v-if="department.key === 'Deli'">The Deli</span>
                    <span v-else>{{ department.key }}</span>
                  </a>
                </li>
                <li>
                  <a class="nav" :class="{ active: currentFilter === 'viewAll' }" @click="$emit('viewAll'), toggle()" data-nav-item="view all offers">View All Offers</a>
                </li>
              </ul>
            </li>

            <li
              v-for="department in browseByDepartments"
              :key="department.key"
              @click="$emit('filterProducts', department.key, department.productIds), toggle()"
            >
              <a
                v-if="department.key != 'secondary' && department.key != 'homeofpc'"
                class="nav"
                :class="{ active: currentFilter === department.key }"
                :data-nav-item="department.key"
              >
                <span v-if="department.key === 'Home of PC'">Home of PC<sup>&reg;</sup></span>
                <span v-else-if="department.key === 'points'"><span class="italic">PC Optimum</span> Points</span>
                <span v-else-if="department.key === 'treats'">Holiday treats</span>
                <span v-else-if="department.key === 'decor'">Holiday decor</span>
                <span v-else>{{ department.key }}</span>
              </a>
            </li>

            <!-- <li>
              <a class="nav" :class="{ active: currentFilter === 'homeofpc' }" @click="$emit('filterProducts', 'homeofpc'), toggle()" data-nav-item="home of pc">Home of President's Choice<sup>&reg;</sup></a>
            </li>
            <li>
              <a class="nav" :class="{ active: currentFilter === 'optimum' }" @click="$emit('filterProducts', 'optimum'), toggle()" data-nav-item="optimum"><span class="italic">PC Optimum</span> Points</a>
            </li>
            <li>
              <a class="nav" :class="{ active: currentFilter === 'insiders' }" @click="$emit('filterProducts', 'insiders'), toggle()" data-nav-item="insiders">Home of PC<sup>&reg;</sup> Insider's Collection<sup>&reg;</sup></a>
            </li>
            <li>
              <a class="nav" :class="{ active: currentFilter === 'multi' }" @click="$emit('filterProducts', 'multi'), toggle()" data-nav-item="multi-buy">Multi-Buy</a>
            </li> -->

          </ul>
        </nav>
      </div>
    </div>

    <input
      v-if="showSearch"
      ref="search"
      type="search"
      class="search__field nondesktop"
      placeholder="Search in flyer"
      v-bind:value="search"
      v-on:input="emitSearch($event.target)"
      v-on:keyup.enter="searchEnter($event.target)"
      v-on:blur="closeSearch"
    >
    <button v-if="showSearch" class="close__icon" type="reset" @click="clearSearchInput">
      <svg viewBox="0 0 24 24">
        <polygon
          points="17.8,16.7 16.6,17.9 12,13.3 7.4,17.9 6.2,16.7 10.8,12.1 6.2,7.5 7.4,6.3 12,11 16.6,6.4 17.8,7.6 13.2,12.2">
        </polygon>
      </svg>
    </button>

  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: null
    },
    shortDate: {
      type: String,
      default: null
    },
    search: {
      type: String,
      default: null
    },
    departments: {
      type: Array,
      default: null
    },
    browseByDepartments: {
      type: Array,
      default: null
    },
    currentFilter: {
      type: String,
      default: null
    },
    listItems: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      showMenu: false,
      showSubMenu: false,
      showSearch: false
    }
  },

  methods: {
    toggle(close = null) {
      if (close) this.showMenu = false
      this.showMenu = !this.showMenu
      this.showSearch = false
    },

    subToggle() {
      this.showSubMenu = !this.showSubMenu
    },

    searchToggle() {
      this.showSearch = !this.showSearch
      this.showMenu = false
      if (this.showSearch) {
        this.$nextTick(() => this.$refs.search.focus())
      }
    },

    closeSearch() {
      setTimeout(() => {
        this.showSearch = false
      }, 200)
    },

    emitSearch(target) {
      this.$emit('input', target.value)
      if (!target.value) this.showSearch = false
    },

    searchEnter(target) {
      if (!target.value) this.$emit('input', target.value)
      this.showSearch = false
      target.value = null
    },

    clearSearchInput() {
      this.$emit('clearFilter')
      this.showSearch = false
      this.$refs.search.value = null
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: $dark-orange;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  .grid {
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  .left {
    margin-right: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .logo {
    background: $dark-gray url('/icons/loblaws.png') no-repeat center;
    background-size: 70% auto;
    width: 42px;
    height: 42px;
    margin-right: 5px;
  }

  h1 {
    color: $white;
    font: 800 18px 'Sharp Grotesk';
    white-space: nowrap;
    text-shadow: 2px 2px 3.5px rgba(0,0,0,0.3);

    span {
      display: block;
      font: 11px 'Lato', sans-serif;
      text-transform: uppercase;
      text-shadow: none;
    }
  }
}

.checklist__icon {
  background: url('/icons/list.png') no-repeat center;
  background-size: contain;
  padding: 14px 20px 2px 5px;
  color: $dark-orange;
  margin-right: 14px;
  margin-top: 2px;
  font-size: 12px;
  cursor: pointer;
}

.search__icon {
  background: url('/icons/search.svg') no-repeat center;
  width: 20px;
  height: 20px;
  margin-right: 14px;
  cursor: pointer;
}

.search__field {
  position: fixed;
  top: 42px;
  z-index: 9999;
  border: 10px solid $dark-orange;
  padding: 10px;
  width: calc(100% - 40px);
  color: $dark-orange;
  font: 600 16px 'Univers LT Std';
  border-radius: 0;
  -webkit-appearance: none;

  @media screen and (min-width: $desktop) {
    border: 0;
    position: static;
    width: 200px;
    margin-right: 10px;
    padding: 7px 10px;
  }
}

.close__icon {
  position: fixed;
  z-index: 9999;
  border-radius: 50%;
  right: 15px;
  top: 57px;
  cursor: pointer;
  outline: 0;
  line-height: 0;
  padding: 3px;

  svg {
    width: 25px;
    height: 25px;
    fill: #999;
  }

  @media screen and (min-width: $desktop) {
    position: relative;
    top: 0;
    right: 40px;
  }
}

.nav__icon {
  background: url('/icons/hamburger.png') no-repeat center;
  background-size: 100% 100%;
  width: 20px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
}
.browse {
  display: none;
}

.menu-container {
  position: fixed;
  top: 42px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow-y: scroll;

  .grid {
    display: block;
  }
}

.menu {
  background: $dark-gray;
  color: $white;
  float: right;
  font: 16px 'Lato', sans-serif;
  overflow-y: auto;

  .submenu__dropdown {
    background: $dark-orange;
    color: $dark-gray;
  }

  a {
    display: block;
    padding: 7px 10px;
    cursor: pointer;
    outline: 0;

    &.active, &:hover {
      background: $orange;
    }

    span.italic {
      font-style: italic;
    }
  }
}

@media screen and (min-width: $tablet) {
  header {
    .logo {
      width: 50px;
      height: 50px;
    }
    h1 {
      font-size: 20px;
      span {
        font-size: 12px;
      }
    }
  }

  .checklist__icon {
    padding: 16px 25px 3px 8px;
    margin-right: 15px;
  }

  .search__icon {
    margin-right: 15px;
    width: 25px;
    height: 25px;
  }

  .nav__icon {
    display: none;
  }

  .browse {
    display: block;
    margin-right: 5px;
    color: $white;
    font: 800 16px 'Sharp Grotesk';
    cursor: pointer;
    text-shadow: 2px 2px 3.5px rgba(0,0,0,0.3);

    &:before {
      content: '';
      display: block;
      width: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 14px solid $red;
      margin-right: 6px;
      float: left;
      position: relative;
      top: 3px;
    }
  }

  .menu-container {
    top: 50px;
  }
  .menu {
    font-size: 14px;
  }
}

.desktop {
  display: none;
}
@media screen and (min-width: $desktop) {
  .nondesktop {
    display: none;
  }
  .desktop {
    display: block;
  }
}
</style>
