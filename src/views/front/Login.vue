<template lang="">
  <section class="container">
    <div class="row align-items-center">
      <div class="col-12 col-md-6">
        <img src="https://images.unsplash.com/photo-1510941005693-77a52ac643d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80"
        alt="" class="img-fluid rounded rounded-lg pe-3">
      </div>
      <div class="col-12 col-md-6 py-6">
        <h2 class="mb-0">Welcome Back!</h2>
        <small>Login to continue</small>
        <div class="form-floating my-3">
          <input type="email" class="form-control" id="loginEmail" placeholder="Email"
          v-model="userData.username">
          <label for="loginEmail">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="loginPassword" placeholder="Password"
          v-model="userData.password">
          <label for="loginPassword">Password</label>
        </div>
        <a href="#" class="c-btn" @click.prevent="login">
          <span class="c-btn__text">Login</span>
        </a>
      </div>
    </div>
    <BsAlert ref="alert" :is-success="isSuccess">{{ alertMsg }}</BsAlert>
  </section>
</template>
<script>
import { apiUserLogin, apiUserCheck } from '@/scripts/api';

export default {
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
      alertMsg: '',
      isSuccess: false,
    };
  },
  methods: {
    login() {
      if (!this.userData.username || !this.userData.password) {
        this.$refs.alert.open();
        this.alertMsg = 'Please enter email and password.';
      } else {
        this.sendLoadingState(true);
        apiUserLogin(this.userData)
          .then((res) => {
            this.sendLoadingState(false);
            this.$refs.alert.open();
            this.alertMsg = 'Login success';
            this.isSuccess = true;
            // save token in cookie
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            setTimeout(() => {
              this.$router.push('/admin/product');
            }, 1000);
          })
          .catch(() => {
            this.sendLoadingState(false);
            this.$refs.alert.open();
            this.alertMsg = 'Please check your email and password';
            this.isSuccess = false;
          });
      }
    },
    sendLoadingState(state) {
      this.$emitter.emit('loading-state', state);
    },
  },
  mounted() {
    apiUserCheck()
      .then(() => {
        this.$router.push('/admin/product');
      });
  },
};
</script>
