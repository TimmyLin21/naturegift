<template>
  <a
    href="#"
    class="fixed bottom-8 right-8 z-50 p-3 bg-secondary text-white rounded-full shadow-lg transition-opacity duration-300 hover:bg-primary hover:text-secondary focus:outline-none"
    :class="isShow ? 'opacity-100 visible' : 'opacity-0 invisible'"
    @click.prevent="backToTop"
  >
    <BIconArrowUp width="24" height="24" />
    <span class="sr-only">Back to top</span>
  </a>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    handleScroll() {
      if (window.scrollY > 300) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
