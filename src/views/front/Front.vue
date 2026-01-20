<template>
  <CustomHeader />
  <RouterView />
  <Footer />
  <BackToTopBtn />
</template>

<script>
import CustomHeader from '@/components/front/CustomHeader.vue';
import Footer from '@/components/front/Footer.vue';
import BackToTopBtn from '@/components/front/BackToTopBtn.vue';

export default {
  components: { CustomHeader, Footer, BackToTopBtn },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
