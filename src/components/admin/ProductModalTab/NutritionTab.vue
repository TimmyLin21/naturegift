<template>
  <form class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <label
        for="calories"
        class="block text-gray-700 font-bold mb-2"
      >Calories (kg)</label>
      <input
        id="calories"
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        placeholder="Product calories"
        v-model="cacheProduct.calories"
      >
    </div>
    <div class="col-span-1">
      <label
        for="carbohydrate"
        class="block text-gray-700 font-bold mb-2"
      >Carbohydrate (g)</label>
      <input
        id="carbohydrate"
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        placeholder="Product carbohydrate"
        v-model="cacheProduct.carbohydrate"
      >
    </div>
    <div class="col-span-1">
      <label
        for="protein"
        class="block text-gray-700 font-bold mb-2"
      >Protein (g)</label>
      <input
        id="protein"
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        placeholder="Product protein"
        v-model="cacheProduct.protein"
      >
    </div>
    <div class="col-span-1">
      <label
        for="fat"
        class="block text-gray-700 font-bold mb-2"
      >Fat (g)</label>
      <input
        id="fat"
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        placeholder="Product fat"
        v-model="cacheProduct.fat"
      >
    </div>
    <div class="col-span-1">
      <label
        for="fiber"
        class="block text-gray-700 font-bold mb-2"
      >Fiber (g)</label>
      <input
        id="fiber"
        type="number"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        placeholder="Product fiber"
        v-model="cacheProduct.fiber"
      >
    </div>
  </form>
</template>

<script>
import productTab from '@/mixins/productTab';

export default {
  mixins: [productTab],
};
</script>
