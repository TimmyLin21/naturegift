<template>
  <section
    class="py-7 position-relative overflow-hidden"
    id="CategoryList"
  >
    <div class="py-5 bg-primary shadow-lg">
      <div class="container">
        <h2 class="mb-5 align-start text-secondary text-start">
          Shop by Category
        </h2>
        <ul class="nav justify-content-between flex-md-nowrap">
          <li
            class="c-card text-white w-75 w-md-auto mx-auto mx-md-0 mb-3 mb-md-0"
            v-for="(category,i) in categories"
            :key="category.title"
            :class="{'mx-md-5': i === 1}"
          >
            <figure class="c-card__img">
              <img
                :src="category.url"
                :alt="category.title"
              >
            </figure>
            <div class="c-card__content">
              <h3 class="text-start">
                {{ category.title }}
              </h3>
            </div>
            <a
              href="#"
              @click.prevent="toProducts(category.title)"
              class="stretched-link"
            />
          </li>
        </ul>
      </div>
    </div>
    <img
      src="@/assets/images/pine-branch.png"
      alt="pine-branch"
      class="position-absolute category__decor rotate-n20"
    >
  </section>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [
        {
          title: 'Nuts',
          url: '@/assets/images/Nuts.jpeg',
        },
        {
          title: 'Beans',
          url: '@/assets/images/Beans.jpeg',
        },
        {
          title: 'Spices',
          url: '@/assets/images/Spices.jpeg',
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
