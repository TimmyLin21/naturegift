<template>
  <Loading />
  <BsAlert />
  <router-view />
</template>

<script>
export default {
  watch: {
    $route(to) {
      const nowTitle = to.meta.title || '';
      if (nowTitle) {
        document.title = `Nature Gift - ${nowTitle}`;
      } else {
        document.title = 'Nature Gift';
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/css/all';
</style>
