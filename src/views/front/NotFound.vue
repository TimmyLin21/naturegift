<template>
  <section class="container mx-auto px-4 mt-[100px] md:mt-[150px]">
    <div class="flex flex-wrap items-center justify-center">
      <div class="w-full md:w-1/2 md:py-6 pt-5 pr-0 md:pr-8">
        <h2 class="text-3xl font-bold mb-2">
          404 PAGE NOT FOUND
        </h2>
        <p class="block mb-6 text-gray-500">Look like you lost your way!</p>
        <router-link
          to="/products"
          class="inline-block bg-secondary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold uppercase tracking-wider shadow-md active:scale-95"
        >
          Have some nuts?
        </router-link>
      </div>
      <div class="w-full md:w-1/4 my-10 md:mb-10 flex justify-center md:justify-end">
        <img
          src="@/assets/images/notfound.jpeg"
          alt="A bird wants to give you some nuts."
          class="w-3/4 rounded-lg shadow-lg"
        >
      </div>
    </div>
  </section>
</template>
