<template>
  <section class="container mt-100px mt-md-150px">
    <div class="row align-items-center">
      <div class="col-12 col-md-6 py-md-6 pt-5">
        <h2 class="mb-0">
          404 PAGE NOT FOUND
        </h2>
        <small class="d-block mb-3">Look like you lost your way!</small>
        <router-link
          to="/products"
          class="c-btn"
        >
          <span class="c-btn__text">Have some nuts?</span>
        </router-link>
      </div>
      <div class="col-12 col-md-6 my-5">
        <img
          src="@/assets/images/notfound.jpeg"
          alt="A bird wants to give you some nuts."
          class="img-fluid rounded rounded-lg w-75"
        >
      </div>
    </div>
  </section>
</template>
