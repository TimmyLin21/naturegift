<template>
  <div class="d-flex flex-column flex-lg-row">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-secondary
    border-bottom border-bottom-lg-0 border-end-lg vh-lg-100 sticky-top"
    >
      <div class="container-fluid flex-lg-column vh-lg-100 align-items-lg-stretch">
        <router-link
          to="/"
          class="navbar-brand h1 my-3 mx-auto"
        >
          Nature Gift
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="navbar-collapse collapse align-items-start justify-content-center"
          id="sidebarCollapse"
        >
          <ul class="navbar-nav flex-lg-column justify-content-lg-center h-lg-100">
            <li class="nav-item">
              <router-link
                to="/admin"
                class="nav-link"
              >
                Product
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/coupon"
                class="nav-link"
              >
                Coupon
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/order"
                class="nav-link"
              >
                Order
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/article"
                class="nav-link"
              >
                Article
              </router-link>
            </li>
            <li class="nav-item mt-auto mb-3">
              <a
                href="#"
                class="btn btn-outline-light"
                @click.prevent="signOut"
              >Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView v-if="checkSuccess" />
  </div>
</template>

<script>
import { apiUserCheck } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkLogin() {
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
    },
    signOut() {
      document.cookie = 'hexToken=;expires=;';
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

<style lang="scss">
.router-link-active {
  color: white !important;
}

</style>
