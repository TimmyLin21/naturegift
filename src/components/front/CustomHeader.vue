<template>
  <nav
    class="z-3 c-navbar h-150 fixed-top"
    :class="{'bg-success': !isTrans, 'shadow-lg': !isTrans, 'bg-secondary': isShow}"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <a
        href="#"
        class="c-navbar__brand"
      >
        <img
          src="@/assets/images/logo__transparent.png"
          alt="Nature Gift"
          class="w-150 h-150"
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
          <li class="nav-item">
            <router-link
              to="/products"
              class="nav-link fw-bold"
            >
              Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ path: '/', hash: '#OurStory'}"
              class="nav-link fw-bold"
            >
              About us
            </router-link>
          </li>
        </ul>
        <ul
          class="nav d-md-flex"
          :class="{'d-none': !isShow}"
        >
          <li class="nav-item">
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
          <li class="nav-item">
            <a
              href="#"
              class="nav-link position-relative"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasCart"
            >
              <BIconBag
                width="24px"
                height="24px"
              />
              <span
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
