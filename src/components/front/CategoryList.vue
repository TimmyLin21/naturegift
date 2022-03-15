<template>
  <section class="py-7 position-relative overflow-hidden" id="CategoryList">
    <div class="py-5 bg-primary shadow-lg">
      <div class="container">
        <h2 class="mb-5 align-start text-secondary text-start">Shop by Category</h2>
        <ul class="nav justify-content-between flex-md-nowrap">
          <!-- FIXED: Shadow Effect -->
          <li class="c-card text-white w-75 w-md-auto mx-auto mx-md-0 mb-3 mb-md-0"
          v-for="(category,i) in category" :key="category.title"
          :class="{'mx-md-5': i === 1}">
            <figure class="c-card__img">
              <img :src="category.url" :alt="category.title">
            </figure>
            <div class="c-card__content">
              <h3 class="text-start">{{ category.title }}</h3>
            </div>
            <a href="#" @click.prevent="toProducts(category.title)" class="stretched-link" />
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
  data() {
    return {
      category: [
        {
          title: 'Nuts',
          url: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=794&q=80',
        },
        {
          title: 'Beans',
          url: 'https://images.unsplash.com/photo-1537516825040-16759cfde671?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        },
        {
          title: 'Spices',
          url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        },
      ],
    };
  },
  methods: {
    toProducts(category) {
      this.$router.push(`/products?category=${category}`);
    },
  },
};
</script>
<style lang="scss">
  .category__decor {
    height: 23.75rem;
    top: 1.25rem;
    right: -5.625rem;
  }
</style>
