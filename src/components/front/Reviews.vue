<template lang="">
  <section class="mb-0 py-5">
    <div class="container">
      <h2
        class="mb-6 text-secondary d-flex justify-content-between
      align-items-center wow fadeInDown"
      >
        <b class="d-block h-2px bg-primary flex-grow-1 bg-opacity-75" />
        <span class="mx-4">See why customers love our products</span>
        <b class="d-block h-2px bg-primary flex-grow-1 bg-opacity-75" />
      </h2>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        navigation
        :pagination="{ clickable: true }"
        :breakpoints="{
          '768': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '992': {
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
          <div class="d-flex pb-5">
            <img
              :src="user.imgUrl"
              alt=""
              class="rounded-circle me-3 w-50 h-100px"
            >
            <div>
              <p class="fw-bold">
                {{ user.name }}
              </p>
              <p>{{ user.comment }}</p>
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
  Navigation, Pagination, A11y, Autoplay,
} from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

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
      modules: [Navigation, Pagination, A11y, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
