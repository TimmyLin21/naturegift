<template>
  <Loading />
  <router-view />
</template>
<script>

export default {
  watch: {
    $route(to) {
      const nowTitle = to.meta.title || '';
      document.title = `Nature Gift - ${nowTitle}`;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/css/all';
</style>
