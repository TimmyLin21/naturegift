<template>
  <div
    class="fixed inset-0 h-screen w-full bg-black bg-opacity-25 z-50 flex items-center justify-center"
    :class="{ 'hidden': !isLoading }"
  >
    <FontAwesomeIcon :icon="['fas', 'kiwi-bird']" class="text-primary text-6xl animate-bounce" />
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
        window.scrollTo(0, 0);
        body.setAttribute('class', 'mh-100vh overflow-hidden');
      } else {
        body.setAttribute('class', '');
      }
    });
  },
};
</script>
