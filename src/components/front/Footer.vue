<template lang="">
  <footer class="bg-primary text-center">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap items-center justify-center">
        <!-- Logo -->
        <div class="w-1/2 md:w-1/6 mb-4 md:mb-0">
          <img
            src="@/assets/images/logo.jpeg"
            alt="logo"
            class="max-w-full h-auto mx-auto"
          >
        </div>
        
        <!-- Newsletter -->
        <div class="w-full md:w-1/2 mb-10 md:mb-0">
          <h3 class="text-2xl font-bold mb-2">
            Let's Stay Connected
          </h3>
          <p class="mb-4">Enter your email to unlock 10% OFF.</p>
          <v-form
            class="flex flex-wrap items-center justify-center gap-2"
            @submit="getCoupon"
            v-slot="{ errors }"
            ref="form"
          >
            <div class="w-full md:w-8/12 mb-4 md:mb-0">
              <div class="relative">
                <v-field
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
                  id="sub-email"
                  :class="{ 'border-red-500': errors.Email }"
                  name="Email"
                  rules="required|email"
                  placeholder="Your Email"
                  v-model="email"
                  :validate-on-blur="false"
                  :validate-on-change="false"
                  :validate-on-input="false"
                />
                <ErrorMessage
                  name="Email"
                  class="text-red-500 text-sm absolute left-0 -bottom-6"
                />
                <!-- Floating label not easily replicated without extra CSS, using simple placeholder -->
              </div>
            </div>
            <div class="w-auto">
              <button
                class="bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold tracking-wider"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
          </v-form>
        </div>

        <!-- Social Icons -->
        <div class="w-full md:w-1/4 mb-0">
          <h3 class="text-2xl font-bold mb-0">Follow us</h3>
          <ul class="flex justify-center list-none p-0 m-0">
            <li>
              <a
                href="https://github.com/TimmyLin21/naturegift"
                class="block text-secondary p-4 transition-all duration-500 hover:-translate-y-2 hover:text-light"
              >
                <BIconGithub
                  width="24px"
                  height="24px"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block text-secondary p-4 transition-all duration-500 hover:-translate-y-2 hover:text-light"
              >
                <BIconFacebook
                  width="24px"
                  height="24px"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block text-secondary p-4 transition-all duration-500 hover:-translate-y-2 hover:text-light"
              >
                <BIconTwitter
                  width="24px"
                  height="24px"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block text-secondary p-4 transition-all duration-500 hover:-translate-y-2 hover:text-light"
              >
                <BIconInstagram
                  width="24px"
                  height="24px"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-secondary bg-opacity-25 py-3">
      <p class="text-gray-600 mb-0">
        © 2022 Nature Gift. All rights reserved
      </p>
    </div>
  </footer>
</template>

<script>
import alertMixin from '@/mixins/alertMixin';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    getCoupon() {
      // this.alert.msg = 'Coupon code: newbie2022';
      // this.alert.state = true;
      // this.sendMsg();
      this.$swal({
        title: 'Thanks for joining!',
        text: 'Coupon code: newbie2022',
        icon: 'success',
        button: 'Confirm',
      });
      this.$refs.form.resetForm();
    },
  },
  mixins: [alertMixin],
};
</script>

