<template>
  <section
    class="py-20 relative overflow-hidden"
    id="CategoryList"
  >
    <div class="py-12 bg-primary shadow-lg">
      <div class="container mx-auto px-4">
        <h2 class="mb-12 text-secondary text-left text-3xl font-bold">
          Shop by Category
        </h2>
        <ul class="flex justify-between flex-wrap md:flex-nowrap p-0 m-0 list-none">
          <li
            class="relative text-white w-3/4 md:w-auto mx-auto md:mx-0 mb-4 md:mb-0 transition-all duration-[650ms] rounded-lg group hover:-translate-y-2 basis-full md:basis-1/3"
            v-for="(category, i) in categories"
            :key="category.title"
            :class="{ 'md:mx-12': i === 1 }"
          >
            <figure class="overflow-hidden inline-block rounded-lg w-full m-0">
              <img
                :src="category.url"
                :alt="category.title"
                class="w-full h-64 md:h-80 object-cover rounded-lg transform transition-transform duration-[650ms] group-hover:scale-125"
              >
            </figure>
            <div class="absolute inset-0 p-4 flex items-end">
              <h3 class="text-left font-bold text-xl drop-shadow-md">
                {{ category.title }}
              </h3>
            </div>
            <a
              href="#"
              @click.prevent="toProducts(category.title)"
              class="absolute inset-0 z-10"
            />
          </li>
        </ul>
      </div>
    </div>
    <img
      src="@/assets/images/pine-branch.png"
      alt="pine-branch"
      class="absolute h-[23.75rem] top-[1.25rem] -right-[5.625rem] -rotate-[20deg]"
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
          url: './images/Nuts.jpeg',
        },
        {
          title: 'Beans',
          url: './images/Beans.jpeg',
        },
        {
          title: 'Spices',
          url: './images/Spices.jpeg',
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

