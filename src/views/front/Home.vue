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
      class="hidden md:block absolute left-[5%] top-[60%] font-bold px-12 py-4 text-2xl bg-secondary text-white hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300 group"
      type="button"
      @click="toProducts"
    >
      SHOP NOW <BIconArrowRight class="mb-1 transition-transform group-hover:translate-x-2" />
    </button>
    <!-- Mobile Button -->
    <button
      class="md:hidden absolute left-[5%] top-[70%] font-bold px-6 py-2 text-xl bg-secondary text-white hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300 group"
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
      class="flex justify-center items-center w-full h-[30vw] md:h-[13vw] absolute bottom-0 translate-y-1/2 z-10 cursor-pointer"
      @click="scrollDown"
    >
      <BIconChevronDoubleDown
        class="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] text-primary -translate-y-1/2 md:-translate-y-[70%] z-20 animate-bounce"
      />
      <div class="absolute rounded-full border-[10px] border-double border-primary w-[30vw] h-[30vw] md:w-[13vw] md:h-[13vw]" />
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
