<template>
  <form class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-3">
      <label
        for="category"
        class="block text-gray-700 font-bold mb-2"
      >Category</label>
      <div class="relative">
        <select
          id="category"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white bg-none font-medium"
          v-model="cacheProduct.category"
        >
          <option value="Spices">Spices</option>
          <option value="Beans">Beans</option>
          <option value="Nuts">Nuts</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    
    <div class="col-span-12 md:col-span-9">
      <label
        for="title"
        class="block text-gray-700 font-bold mb-2"
      >Title</label>
      <input
        type="text"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        id="title"
        placeholder="Product title"
        v-model="cacheProduct.title"
      >
    </div>
    
    <div class="col-span-12 md:col-span-4">
      <label
        for="originPrice"
        class="block text-gray-700 font-bold mb-2"
      >Origin Price</label>
      <input
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        id="originPrice"
        placeholder="Product origin price"
        v-model="cacheProduct.origin_price"
      >
    </div>
    
    <div class="col-span-12 md:col-span-4">
      <label
        for="price"
        class="block text-gray-700 font-bold mb-2"
      >Price</label>
      <input
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        id="price"
        placeholder="Product price"
        v-model="cacheProduct.price"
      >
    </div>
    
    <div class="col-span-12 md:col-span-4">
      <label
        for="unit"
        class="block text-gray-700 font-bold mb-2"
      >Unit</label>
      <input
        type="text"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        id="unit"
        placeholder="Product unit"
        v-model="cacheProduct.unit"
      >
    </div>
    
    <div class="col-span-12">
      <hr class="my-4 border-gray-200">
      <div class="flex items-center">
        <label for="productEnabledSwitch" class="flex items-center cursor-pointer relative">
          <div class="relative">
            <input
              type="checkbox"
              id="productEnabledSwitch"
              class="sr-only"
              v-model="cacheProduct.is_enabled"
              :true-value="1"
              :false-value="0"
              :checked="cacheProduct.is_enabled === 1"
            >
            <div class="w-10 h-6 bg-gray-300 rounded-full shadow-inner toggle-bg transition-colors duration-300"></div>
            <div class="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition transform duration-300"></div>
          </div>
          <div class="ml-3 text-gray-700 font-medium">
            Enable product
          </div>
        </label>
      </div>
    </div>
  </form>
</template>
  
  <style scoped>
    select {
      background-image: none;
    }
    input:checked ~ .toggle-bg {
      background-color: #1a7f5a; /* Secondary color or similar green */
    }
    input:checked ~ .dot {
      transform: translateX(100%);
      left: 0.25rem;
    }
    .toggle-bg {
        width: 3rem;
        height: 1.5rem;
    }
    .dot {
        top: 0.25rem;
        left: 0.25rem;
        width: 1rem;
        height: 1rem;
    }
  </style>

<script>
import productTab from '@/mixins/productTab';

export default {
  mixins: [productTab],
};
</script>
