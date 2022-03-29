<template>
  <section class="container mt-150px">
    <div class="row align-items-center">
      <div class="col-12 col-md-6">
        <img
          src="https://images.unsplash.com/photo-1510941005693-77a52ac643d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80"
          alt=""
          class="img-fluid rounded rounded-lg"
        >
      </div>
      <div class="col-12 col-md-6 py-6">
        <h2 class="mb-0">
          Welcome Back!
        </h2>
        <small>Login to continue</small>
        <div class="form-floating my-3">
          <input
            type="email"
            class="form-control"
            id="loginEmail"
            placeholder="Email"
            v-model="userData.username"
          >
          <label for="loginEmail">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="loginPassword"
            placeholder="Password"
            v-model="userData.password"
            @keyup.enter="login"
          >
          <label for="loginPassword">Password</label>
        </div>
        <a
          href="#"
          class="c-btn"
          @click.prevent="login"
        >
          <span class="c-btn__text">Login</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { apiUserLogin, apiUserCheck } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';

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
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            setTimeout(() => {
              this.$router.push('/admin/product');
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
        this.$router.push('/admin/product');
      });
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
