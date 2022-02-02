<template lang="">
  <section class="my-7">
    <div class="py-5 bg-primary shadow-lg">
      <div class="container">
        <h2 class="mb-5 align-start text-secondary text-start">Shop by Category</h2>
        <ul class="nav flex-nowrap justify-content-between">
          <!-- TODO: Add hover effect -->
          <li class="card bg-dark text-white border-0 shadow">
            <img src="https://images.unsplash.com/photo-1542990253-a781e04c0082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=794&q=80"
            alt="nuts" class="card-img">
            <div class="card-img-overlay">
              <h3 class="card-text text-start">Nuts</h3>
            </div>
            <a href="#" class="stretched-link"></a>
          </li>
          <li class="card bg-dark text-white mx-5 border-0 shadow">
            <img src="https://images.unsplash.com/photo-1537516825040-16759cfde671?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="nuts" class="card-img">
            <div class="card-img-overlay">
              <h3 class="card-text text-start">Beans</h3>
            </div>
            <a href="#" class="stretched-link"></a>
          </li>
          <li class="card bg-dark text-white border-0 shadow">
            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="nuts" class="card-img">
            <div class="card-img-overlay">
              <h3 class="card-text text-start">Spices</h3>
            </div>
            <a href="#" class="stretched-link"></a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CategoryList',
};
</script>
<style lang="scss">
</style>
