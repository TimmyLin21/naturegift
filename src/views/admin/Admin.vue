<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <nav class="bg-secondary text-white w-full lg:w-64 flex-shrink-0 p-4 lg:h-screen lg:sticky lg:top-0 lg:flex lg:flex-col">
      <div class="flex justify-between items-center lg:block">
        <router-link
          to="/"
          class="text-2xl font-bold flex items-center mb-0 lg:mb-8 text-white no-underline hover:text-light"
        >
          Nature Gift
          <span
            v-if="isDemo"
            class="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full uppercase tracking-wider"
          >Demo</span>
        </router-link>
        <button
          class="lg:hidden border border-white rounded px-3 py-2"
          type="button"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="block w-6 h-[2px] bg-white mb-1"></span>
          <span class="block w-6 h-[2px] bg-white mb-1"></span>
          <span class="block w-6 h-[2px] bg-white"></span>
        </button>
      </div>
      <div
        class="lg:flex lg:flex-col lg:flex-grow mt-4 lg:mt-0"
        :class="{ 'hidden': !isMenuOpen }"
      >
        <ul class="flex flex-col gap-2 list-none p-0 lg:flex-grow">
          <li>
            <router-link
              to="/admin"
              class="block py-2 px-4 hover:bg-primary hover:text-secondary rounded transition-colors text-white no-underline"
              exact-active-class="bg-primary !text-secondary font-bold"
            >
              Product
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/coupon"
              class="block py-2 px-4 hover:bg-primary hover:text-secondary rounded transition-colors text-white no-underline"
              active-class="bg-primary !text-secondary font-bold"
            >
              Coupon
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/order"
              class="block py-2 px-4 hover:bg-primary hover:text-secondary rounded transition-colors text-white no-underline"
              active-class="bg-primary !text-secondary font-bold"
            >
              Order
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/article"
              class="block py-2 px-4 hover:bg-primary hover:text-secondary rounded transition-colors text-white no-underline"
              active-class="bg-primary !text-secondary font-bold"
            >
              Article
            </router-link>
          </li>
          <li class="mt-8 lg:mt-auto">
            <a
              href="#"
              class="block py-2 px-4 border border-white text-center rounded hover:bg-white hover:text-secondary transition-colors text-white no-underline"
              @click.prevent="signOut"
            >Sign Out</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex-grow p-4 bg-gray-100">
      <RouterView v-if="checkSuccess" />
    </div>
  </div>
</template>

<script>
import { apiUserCheck } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';

export default {
  data() {
    return {
      checkSuccess: false,
      isMenuOpen: false,
      isDemo: false,
    };
  },
  methods: {
    checkLogin() {
      const isDemo = localStorage.getItem('isDemo') === 'true';
      if (isDemo) {
        this.isDemo = true;
        this.checkSuccess = true;
      } else {
        apiUserCheck()
          .then(() => {
            this.checkSuccess = true;
          })
          .catch(() => {
            this.alert.msg = 'Please login again :)';
            this.alert.state = false;
            this.sendMsg();
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
          });
      }
    },
    signOut() {
      document.cookie = 'hexToken=;expires=;';
      localStorage.removeItem('isDemo');
      this.alert.msg = 'Sign out success!';
      this.alert.state = true;
      this.sendMsg();
      setTimeout(() => {
        this.$router.push('/');
      }, 1000);
    },
  },
  mounted() {
    this.checkLogin();
  },
  mixins: [alertMixin],
};
</script>
