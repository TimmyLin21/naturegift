<template>
<div class="position-absolute top-0 bottom-0 w-100 bg-dark z-3 bg-opacity-25 d-flex
align-items-center justify-content-center" :class="{'d-none': !isLoading}">
  <i class="fa-solid fa-kiwi-bird fa-4x text-primary fa-bounce" />
</div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.$emitter.on('loading-state', (state) => {
      this.isLoading = state;
      const body = document.querySelector('body');
      if (state) {
        body.setAttribute('class', 'mh-100vh overflow-hidden');
      } else {
        body.setAttribute('class', '');
      }
    });
  },
};
</script>
