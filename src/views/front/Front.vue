<template>
  <CustomHeader />
  <router-view />
  <Footer />
</template>
<script>
import CustomHeader from '@/components/front/CustomHeader.vue';
import Footer from '@/components/front/Footer.vue';

export default {
  components: { CustomHeader, Footer },
};
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.mt-150 {
  margin-top: 150px;
}
</style>
