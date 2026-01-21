<template lang="">
  <section class="mb-0 py-12">
    <div class="container mx-auto px-4">
      <h2
        class="mb-12 text-secondary flex justify-between
      items-center wow animate__fadeInDown"
      >
        <b class="block h-[2px] bg-primary flex-grow bg-opacity-75" />
        <span class="mx-4 text-2xl font-bold">See why customers love our products</span>
        <b class="block h-[2px] bg-primary flex-grow bg-opacity-75" />
      </h2>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        :pagination="{ clickable: true }"
        :breakpoints="{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide
          v-for="user in users"
          :key="user.name"
        >
          <div class="flex pb-12 items-start">
            <img
              :src="user.imgUrl"
              alt=""
              class="rounded-full mr-4 w-24 h-24 object-cover border-2 border-primary"
            >
            <div class="text-justify">
              <p class="font-bold text-lg mb-1">
                {{ user.name }}
              </p>
              <p class="text-gray-700 leading-relaxed">{{ user.comment }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
// import Swiper core and required modules
import {
  Pagination, A11y, Autoplay,
} from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  name: 'Reviews',
  data() {
    return {
      users: [
        {
          name: 'Cynthia W.',
          imgUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
          comment: 'Just ordered these for the first time and now that I have them, will be ordering again! The macadamia are awesome 😍.',
        },
        {
          name: 'Terry K.',
          imgUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
          comment: 'I continue to trust Nature Gift as a reliable, high quality company. Your actions and customer service confirm my confidence. Thank you. 🙌🏼',
        },
        {
          name: 'SALLY O.',
          imgUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
          comment: "It's just awesome. Need I say anything else? I feel better. I'm healthier. I'm more energized. I'm like a whole new person! 💪🏼",
        },
        {
          name: 'Kenneth H.',
          imgUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
          comment: `I love ordering from this company. They always deliver on time and never miss anything. 
          👍🏼`,
        },
        {
          name: 'Sharon W.',
          imgUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
          comment: `I am very glad that you have the opportunity to buy a really useful product without any preservatives. 
          🤗`,
        },
        {
          name: 'Sherry S.',
          imgUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
          comment: `I have used this site before, and it is a quick and easy shopping experience.
          Thank you 🥺`,
        },
      ],
      modules: [Pagination, A11y, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
