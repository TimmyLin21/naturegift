<template lang="">
  <section class="py-7 position-relative overflow-hidden">
    <div class="py-5 bg-primary shadow-lg">
      <div class="container">
        <h2 class="mb-5 align-start text-secondary text-start">Shop by Category</h2>
        <ul class="nav flex-nowrap justify-content-between">
          <!-- FIXED: Shadow Effect -->
          <li class="c-card text-white">
            <figure class="c-card__img">
              <img src="https://images.unsplash.com/photo-1542990253-a781e04c0082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=794&q=80"
              alt="nuts">
            </figure>
            <div class="c-card__content">
              <h3 class="text-start">Nuts</h3>
            </div>
            <a href="#" class="stretched-link"></a>
          </li>
          <li class="c-card text-white mx-5">
            <figure class="c-card__img">
              <img src="https://images.unsplash.com/photo-1537516825040-16759cfde671?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="nuts">
            </figure>
            <div class="c-card__content">
              <h3 class="text-start">Beans</h3>
            </div>
            <a href="#" class="stretched-link"></a>
          </li>
          <li class="c-card text-white">
            <figure class="c-card__img">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="nuts">
            </figure>
            <div class="c-card__content">
              <h3 class="text-start">Spices</h3>
            </div>
            <a href="#" class="stretched-link"></a>
          </li>
        </ul>
      </div>
    </div>
    <img src="@/assets/images/pine-branch.png" alt="pine-branch"
    class="position-absolute category__decor rotate-n20">
  </section>
</template>
<script>
export default {
  name: 'CategoryList',
};
</script>
<style lang="scss">
  .category__decor {
    height: 23.75rem;
    top: 1.25rem;
    right: -5.625rem;
  }
</style>
