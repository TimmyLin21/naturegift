<template>
  <div
    id="showcase"
    class="position-relative overflow-hidden min-vh-100"
  >
    <h1
      class="display-6 display-md-5 lh-5 position-absolute text-white
      top-md-35 fw-bold start-5 text-start z-2 top-45"
    >
      All you need is <br> <span class="me-5" />Fresh and Delicious
    </h1>
    <button
      class="btn btn-secondary btn-hover-primary position-absolute start-5
      top-60 fw-bold px-5 py-3 fs-4 btn-hover-arrow d-none d-md-block"
      type="button"
      @click="toProducts"
    >
      SHOP NOW <BIconArrowRight class="mb-1" />
    </button>
    <button
      class="btn btn-secondary btn-hover-primary position-absolute start-5
      top-70 fw-bold px-4 py-2 fs-5 btn-hover-arrow d-md-none"
      type="button"
      @click="toProducts"
    >
      SHOP NOW <BIconArrowRight class="mb-1" />
    </button>
    <video
      class="position-absolute top-0 start-0 w-100 h-100 object-cover opacity-90 z-n1"
      autoplay
      loop
      muted
      playsinline
    >
      <source
        src="@/assets/video/fresh-and-delicious.mp4"
        type="video/mp4"
      >
      Your browser does not support the video tag.
    </video>
    <div
      class="scrollMore"
      @click="scrollDown"
    >
      <BIconChevronDoubleDown
        class="scrollMore__icon scrollMore__icon--bounce"
      />
      <div class="scrollMore__circle" />
    </div>
  </div>
  <CategoryList />
  <OurStory />
  <Reviews />
</template>

<script>
import CategoryList from '@/components/front/CategoryList.vue';
import OurStory from '@/components/front/OurStory.vue';
import Reviews from '@/components/front/Reviews.vue';

export default {
  name: 'Home',
  components: {
    CategoryList,
    OurStory,
    Reviews,
  },
  methods: {
    scrollDown() {
      this.$router.push({ path: '/', hash: '#CategoryList' });
    },
    toProducts() {
      this.$router.push('/products');
    },
  },
};
</script>
