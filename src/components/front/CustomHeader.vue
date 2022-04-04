<template>
  <nav
    class="z-3 c-navbar fixed-top"
    :class="{'trans':isTrans, 'bg-secondary': isShow, 'small':isSmall}"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <a
        href="#"
        class="c-navbar__brand"
      >
        <img
          src="@/assets/images/logo__transparent.png"
          alt="Nature Gift"
          :class="{'small': isSmall}"
        >
      </a>
      <div
        class="c-navbar__togglerIcon"
        @click="toggleMenu"
      >
        <input
          class="c-navbar__togglerIcon__check"
          type="checkbox"
        >
        <div>
          <span />
          <span />
        </div>
      </div>
      <div class="c-navbar__collapse">
        <ul
          class="c-navbar__nav text-primary d-md-flex trans-ease"
          :class="{'d-none': !isShow}"
        >
          <li class="nav-item c-navbar__item">
            <router-link
              to="/products"
              class="nav-link fw-bold"
            >
              Products
            </router-link>
          </li>
          <li class="nav-item c-navbar__item">
            <router-link
              :to="{ path: '/', hash: '#OurStory'}"
              class="nav-link fw-bold"
            >
              About us
            </router-link>
          </li>
        </ul>
        <ul
          class="nav d-md-flex my-4 my-md-0"
          :class="{'d-none': !isShow}"
        >
          <li class="nav-item c-navbar__item">
            <router-link
              to="/login"
              class="nav-link"
            >
              <BIconPersonCircle
                width="24px"
                height="24px"
              />
            </router-link>
          </li>
          <li class="nav-item c-navbar__item">
            <a
              href="#offcanvasCart"
              class="nav-link position-relative"
              data-bs-toggle="offcanvas"
            >
              <BIconBag
                width="24px"
                height="24px"
              />
              <span
                v-if="quantity > 0"
                class="position-absolute top-20 start-75
              translate-middle badge rounded-pill bg-danger"
              >
                {{ quantity }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <OffcanvasCart @getQuantity="getQuantity" />
</template>

<script>
import OffcanvasCart from '@/components/front/OffcanvasCart.vue';

export default {
  data() {
    return {
      isTrans: false,
      isShow: false,
      quantity: 0,
      isSmall: false,
    };
  },
  components: { OffcanvasCart },
  methods: {
    scrollHeight() {
      const scrollPosition = document.documentElement.scrollTop;
      if (scrollPosition <= 150 && this.$route.name === 'Home') {
        this.isTrans = true;
      } else {
        this.isTrans = false;
      }
      if (scrollPosition >= 100) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    },
    toggleMenu() {
      this.isShow = !this.isShow;
    },
    getQuantity(quantity) {
      this.quantity = quantity;
    },
  },
  mounted() {
    document.addEventListener('scroll', this.scrollHeight);
    this.scrollHeight();
  },
  watch: {
    $route() {
      this.scrollHeight();
    },
  },
};
</script>
