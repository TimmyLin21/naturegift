<template>
  <nav
    class="z-30 fixed top-0 w-full flex items-center justify-between py-10 transition-all duration-500 h-[150px]"
    :class="{ 'bg-transparent': isTrans, 'bg-secondary': !isTrans, '!bg-secondary': isShow, '!h-[100px] shadow-lg py-6': isSmall || isShow }"
  >
    <div class="container mx-auto flex justify-between items-center px-4">
      <router-link
        to="/"
        class="absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-50"
        :style="{ top: isSmall || isShow ? '0px' : '24px' }"
      >
        <img
          src="@/assets/images/logo__transparent.png"
          alt="Nature Gift"
          class="w-[150px] h-[150px] transition-all duration-300"
          :class="{ '!w-[100px] !h-[100px]': isSmall || isShow }"
        >
      </router-link>
      <div
        class="md:hidden relative w-[50px] h-[50px] cursor-pointer"
        @click="toggleMenu"
        :style="{ transform: !isSmall && !isShow ? 'translateY(24px)' : 'translateY(0px)' }"
      >
        <div class="absolute inset-0 m-auto w-[22px] h-[12px]">
          <span class="absolute top-0 w-full h-[2px] bg-primary rounded-[1px] transition-all duration-200" :class="{ 'rotate-45 top-[5px]': isShow }" />
          <span class="absolute bottom-0 w-full h-[2px] bg-primary rounded-[1px] transition-all duration-200" :class="{ '-rotate-45 bottom-[5px]': isShow }" />
        </div>
      </div>
      <div 
        class="flex-basis-full flex-grow flex justify-between items-center md:flex-row transition-all duration-300"
        :class="{ 'flex-col absolute top-[100px] left-0 w-full bg-secondary z-[20000] pb-4': isShow, 'hidden md:flex': !isShow }"
        :style="{ transform: !isSmall && !isShow ? 'translateY(24px)' : 'translateY(0px)' }"
      >
        <ul
          class="flex list-none flex-wrap pl-0 mb-0 flex-row text-white md:flex md:flex-row transition-all duration-300 gap-6"
          :class="{ 'flex-col items-center gap-4': isShow, 'hidden': !isShow && !hiddenMenu }"
        >
          <li class="relative group">
            <router-link
              to="/products"
              class="block py-2 text-white font-bold no-underline"
              @click="toggleMenu"
            >
              Products
              <span class="absolute left-0 bottom-0 w-full h-[2px] bg-light transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </router-link>
          </li>
          <li class="relative group">
            <router-link
              :to="{ path: '/', hash: '#OurStory' }"
              class="block py-2 text-white font-bold no-underline"
              @click="toggleMenu"
            >
              About us
              <span class="absolute left-0 bottom-0 w-full h-[2px] bg-light transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </router-link>
          </li>
        </ul>
        <ul
          class="flex list-none flex-wrap pl-0 mb-0 flex-row text-white md:flex md:flex-row my-4 md:my-0 gap-4"
          :class="{ 'justify-center gap-6': isShow, 'hidden': !isShow && !hiddenMenu }"
        >
          <li class="relative group">
            <router-link
              to="/login"
              class="block py-2 text-white"
              @click="toggleMenu"
            >
              <BIconPersonCircle
                width="24px"
                height="24px"
              />
              <span class="absolute left-0 bottom-0 w-full h-[2px] bg-light transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </router-link>
          </li>
          <li class="relative group">
            <a
              href="#"
              class="block py-2 text-white relative"
              @click.prevent="toggleCart"
            >
              <BIconBag
                width="24px"
                height="24px"
              />
              <span
                v-if="quantity > 0"
                class="absolute top-0 right-0 translate-x-[25%] -translate-y-[25%] badge rounded-full bg-red-500 text-white text-xs px-2 py-0.5"
              >
                {{ quantity }}
              </span>
              <span class="absolute left-0 bottom-0 w-full h-[2px] bg-light transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <OffcanvasCart ref="offcanvasCart" @get-quantity="getQuantity" />
</template>

<script>
import OffcanvasCart from '@/components/front/OffcanvasCart.vue';

export default {
  data() {
    return {
      isTrans: false,
      isShow: false,
      quantity: 0,
      isSmall: false,
    };
  },
  components: { OffcanvasCart },
  methods: {
    scrollHeight() {
      const scrollPosition = document.documentElement.scrollTop;
      if (scrollPosition <= 150 && this.$route.name === 'Home') {
        this.isTrans = true;
      } else {
        this.isTrans = false;
      }
      if (scrollPosition >= 100 || this.$route.name !== 'Home') {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    },
    toggleMenu() {
      this.isShow = !this.isShow;
    },
    toggleCart() {
      this.$refs.offcanvasCart.openCart();
    },
    getQuantity(quantity) {
      this.quantity = quantity;
    },
  },
  mounted() {
    document.addEventListener('scroll', this.scrollHeight);
    this.scrollHeight();
  },
  watch: {
    $route() {
      this.scrollHeight();
      this.isShow = false;
    },
  },
};
</script>
