<template>
  <div
    id="showcase"
    class="relative overflow-hidden min-h-screen"
  >
    <h1
      class="text-4xl md:text-5xl leading-tight absolute text-white font-bold text-left z-20 left-[5%] top-[45%] md:top-[35%]"
    >
      All you need is <br> <span class="mr-12" />Fresh and Delicious
    </h1>
    <!-- Desktop Button -->
    <button
      class="hidden md:flex items-center justify-center gap-2 rounded-lg absolute left-[5%] top-[60%] font-bold px-12 py-4 text-2xl bg-secondary text-white hover:bg-white hover:text-black border border-transparent hover:bg-primary transition-all duration-500 group"
      type="button"
      @click="toProducts"
    >
      SHOP NOW <BIconArrowRight class="mb-1 transition-transform group-hover:translate-x-2" />
    </button>
    <!-- Mobile Button -->
    <button
      class="md:hidden flex items-center justify-center gap-2 rounded-lg absolute left-[5%] top-[70%] font-bold px-6 py-2 text-xl bg-secondary text-white hover:bg-white hover:text-black border border-transparent hover:bg-primary transition-all duration-500 group"
      type="button"
      @click="toProducts"
    >
      SHOP NOW <BIconArrowRight class="mb-1 transition-transform group-hover:translate-x-2" />
    </button>
    <video
      class="absolute top-0 left-0 w-full h-full object-cover opacity-90 -z-10"
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
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
      @click="scrollDown"
    >
      <!-- Mouse Icon -->
      <div class="w-[30px] h-[50px] border-2 border-white rounded-full flex justify-center pt-2 opacity-80 group-hover:opacity-100 transition-opacity">
        <div class="w-1.5 h-3 bg-white rounded-full animate-bounce" />
      </div>
      <!-- Text/Arrow -->
      <BIconChevronDown class="text-white w-6 h-6 animate-pulse" />
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
