<template>
  <nav class="z-3 c-navbar h-150 fixed-top"
  :class="{'bg-success': !isTrans, 'shadow-lg': !isTrans}">
    <div class="container d-flex justify-content-between align-items-center">
      <a href="#" class="c-navbar__brand">
        <img src="@/assets/images/logo__transparent.png" alt="Nature Gift" class="w-150 h-150">
      </a>
      <div class="c-navbar__togglerIcon" @click="toggleMenu">
        <input class="c-navbar__togglerIcon__check" type="checkbox" />
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="c-navbar__collapse">
        <ul class="c-navbar__nav text-primary d-md-flex trans-ease" :class="{'d-none': !isShow}">
          <li class="nav-item">
            <router-link to="/products" class="nav-link fw-bold">Products</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link fw-bold">About us</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link fw-bold">Blog</a>
          </li>
        </ul>
        <ul class="nav d-md-flex" :class="{'d-none': !isShow}">
          <li class="nav-item">
            <router-link to="/checkout" class="nav-link">
              <BIconBag width="24px" height="24px"></BIconBag>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <BIconPersonCircle width="24px" height="24px"></BIconPersonCircle>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isTrans: false,
      isShow: false,
    };
  },
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
