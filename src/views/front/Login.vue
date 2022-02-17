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
          <input type="email" class="form-control" id="floatingInput" placeholder="Email">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <router-link to='/admin/product' class="c-btn">
          <span class="c-btn__text">Login</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {

};
</script>
<style lang="">

</style>
