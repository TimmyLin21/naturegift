<template>
  <nav class="z-1 c-navbar h-150 fixed-top bg-success">
    <div class="container d-flex justify-content-between align-items-center">
      <a href="#" class="c-navbar__brand">
        <img src="@/assets/images/logo__transparent.png" alt="Nature Gift" class="w-150 h-150">
      </a>
      <div class="c-navbar__togglerIcon">
        <input class="c-navbar__togglerIcon__check" type="checkbox" />
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="c-navbar__collapse" id="navbarCollapse">
        <ul class="c-navbar__nav text-primary">
          <li class="nav-item">
            <router-link to="/shop" class="nav-link fw-bold">Shop</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link fw-bold">About us</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link fw-bold">Blog</a>
          </li>
        </ul>
        <ul class="nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <BIconBag width="24px" height="24px"></BIconBag>
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <BIconPersonCircle width="24px" height="24px"></BIconPersonCircle>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'CustomHeader',
};
</script>
<style lang="scss">
 .w-150 {
   width: 150px;
 }
 .h-150 {
   height: 150px;
 }
</style>
