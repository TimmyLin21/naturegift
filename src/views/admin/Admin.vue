<template>
  <div class="d-flex flex-column flex-lg-row">
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary
    border-bottom border-bottom-lg-0 border-end-lg vh-lg-100">
      <div class="container-fluid flex-lg-column vh-lg-100 align-items-lg-stretch">
        <router-link to="/" class="navbar-brand h1 my-3 mx-auto">Nature Gift</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse align-items-start justify-content-center"
        id="sidebarCollapse">
          <ul class="navbar-nav flex-lg-column">
            <li class="nav-item">
              <router-link to="/admin/product" class="nav-link">Product</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/admin/coupon" class="nav-link">Coupon</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/order" class="nav-link">Order</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/article" class="nav-link">Article</router-link>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss">
.router-link-active {
  color: white !important;
}
</style>
