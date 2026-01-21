<template>
  <section class="container mx-auto px-4 mt-[100px] md:mt-[150px]">
    <div class="flex flex-wrap items-center pt-5 md:pt-0">
      <div class="w-full md:w-1/2 p-4">
        <img
          src="@/assets/images/login.jpeg"
          alt="Login"
          class="w-full h-auto rounded-lg shadow-lg object-cover"
        >
      </div>
      <div class="w-full md:w-1/2 py-6 px-4 md:px-12">
        <h2 class="text-3xl font-bold mb-2">
          Welcome Back!
        </h2>
        <p class="text-gray-500 mb-6">Login to continue</p>
        
        <div class="mb-4">
          <label for="loginEmail" class="block text-gray-700 font-bold mb-2">Email address</label>
          <input
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            id="loginEmail"
            placeholder="Email"
            v-model="userData.username"
          >
        </div>
        
        <div class="mb-8">
           <label for="loginPassword" class="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            id="loginPassword"
            placeholder="Password"
            v-model="userData.password"
            @keyup.enter="login"
          >
        </div>
        
        <a
          href="#"
          class="inline-block bg-secondary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold w-full text-center uppercase tracking-wider shadow-md active:scale-95"
          @click.prevent="login"
        >
          Login
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { apiUserLogin, apiUserCheck } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';

export default {
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      if (!this.userData.username || !this.userData.password) {
        this.alert.msg = 'Please enter email and password.';
        this.alert.state = false;
        this.sendMsg();
      } else {
        this.sendLoadingState(true);
        apiUserLogin(this.userData)
          .then((res) => {
            this.sendLoadingState(false);
            this.alert.msg = 'Login success';
            this.alert.state = true;
            this.sendMsg();
            // save token in cookie
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
            setTimeout(() => {
              this.$router.push('/admin');
            }, 1000);
          })
          .catch(() => {
            this.sendLoadingState(false);
            this.alert.msg = 'Please check your email and password';
            this.alert.state = false;
            this.$nextTick(() => {
              this.sendMsg();
            });
          });
      }
    },
  },
  mounted() {
    apiUserCheck()
      .then(() => {
        this.$router.push('/admin');
      });
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
