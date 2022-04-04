<template>
  <a
    href="#"
    class="btn-backToTop"
    :class="{'show': isShow}"
    @click.prevent="backToTop"
  >
    <BIconArrowUp aria-hidden="true" />
    <span class="visually-hidden">Back to top</span>
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
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 300) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
  },
};
</script>
