<template>
  <div id="showcase" class="position-relative overflow-hidden min-vh-100">
    <h1 class="d-none d-md-block display-5 lh-5 position-absolute text-white
     top-35 fw-bold start-5 text-start z-2">
      All you need is <br> <span class="me-5"></span>Fresh and Delicious
    </h1>
    <!-- <h1 class="d-sm-none display-3 lh-5 position-absolute text-white
     top-20 fw-bold start-5 text-start">
      Nature <br> <span class="me-6"></span> Gift
    </h1> -->
    <video class="position-absolute top-0 start-0 w-100 h-100 object-cover opacity-90 z-n1"
    autoplay loop muted playsinline>
      <source src="../assets/video/fresh-and-delicious.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="scrollMore">
      <BIconChevronDoubleDown class="scrollMore__icon scrollMore__icon--bounce"
       width="3vw" height="3vw"></BIconChevronDoubleDown>
      <div class="scrollMore__circle"></div>
    </div>
  </div>
  <CategoryList></CategoryList>
  <OurStory></OurStory>
  <Reviews></Reviews>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue';
import OurStory from '@/components/OurStory.vue';
import Reviews from '@/components/Reviews.vue';

export default {
  name: 'Home',
  components: {
    CategoryList,
    OurStory,
    Reviews,
  },
};
</script>

<style lang="scss">
  .top-35 {
    top: 35%;
  }
  .start-5 {
    left: 5%;
  }
  .w-160 {
    width: 160px;
  }
  .h-160 {
    height: 160px;
  }
</style>
