<template>
  <form class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <label
        for="description"
        class="block text-gray-700 font-bold mb-2"
      >Description</label>
      <textarea
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all min-h-[100px]"
        id="description"
        placeholder="Product description"
        v-model="cacheProduct.description"
      />
    </div>
    <div class="col-span-1">
      <label
        for="content"
        class="block text-gray-700 font-bold mb-2"
      >Content</label>
      <textarea
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all min-h-[100px]"
        id="content"
        placeholder="Product content"
        v-model="cacheProduct.content"
      />
    </div>
  </form>
</template>

<script>
import productTab from '@/mixins/productTab';

export default {
  mixins: [productTab],
};
</script>
