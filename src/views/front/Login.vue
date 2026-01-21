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
        
        <div class="my-4 relative bg-transparent z-50">
          <button 
            type="button" 
            class="flex items-center text-blue-500 hover:text-blue-700 font-bold transition-colors text-sm focus:outline-none"
            @click="showDemoInfo = !showDemoInfo"
          >
            <BIconInfoCircleFill class="w-4 h-4 mr-2" />
            <span>Want to try the Demo Admin?</span>
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div 
              v-if="showDemoInfo" 
              class="absolute bottom-full mb-2 w-full bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-lg z-50"
            >
              <p class="text-xs text-blue-800 mb-2">
                Use these credentials to view the admin dashboard in read-only mode:
              </p>
              <div class="text-xs bg-white p-2 rounded border border-blue-100">
                <p><span class="font-bold text-gray-700">Email:</span> demo@tech.cc</p>
                <p><span class="font-bold text-gray-700">Password:</span> demo</p>
              </div>
            </div>
          </transition>
        </div>
        
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
      showDemoInfo: false,
    };
  },
  methods: {
    login() {
      if (!this.userData.username || !this.userData.password) {
        this.alert.msg = 'Please enter email and password.';
        this.alert.state = false;
        this.sendMsg();
      } else if (this.userData.username === 'demo@tech.cc' && this.userData.password === 'demo') {
        const token = 'demoToken';
        const expired = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        document.cookie = `hexToken=${token}; expires=${expired}; path=/`;
        localStorage.setItem('isDemo', 'true');
        this.sendLoadingState(true);
        setTimeout(() => {
          this.sendLoadingState(false);
          this.$router.push('/admin');
        }, 1000);
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
            
            // Set demo flag - actually typical users aren't demo, so we remove it
            localStorage.removeItem('isDemo');

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
