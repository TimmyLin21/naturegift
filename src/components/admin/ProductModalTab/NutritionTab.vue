<template>
  <form class="row g-3">
    <div class="col-6">
      <label
        for="calories"
        class="form-label"
      >Calories (kg)</label>
      <input
        id="calories"
        type="number"
        min="0"
        class="form-control"
        placeholder="Product calories"
        v-model="cacheProduct.calories"
      >
    </div>
    <div class="col-6">
      <label
        for="carbohydrate"
        class="form-label"
      >Carbohydrate (g)</label>
      <input
        id="carbohydrate"
        type="number"
        min="0"
        class="form-control"
        placeholder="Product carbohydrate"
        v-model="cacheProduct.carbohydrate"
      >
    </div>
    <div class="col-6">
      <label
        for="protein"
        class="form-label"
      >Protein (g)</label>
      <input
        id="protein"
        type="number"
        min="0"
        class="form-control"
        placeholder="Product protein"
        v-model="cacheProduct.protein"
      >
    </div>
    <div class="col-6">
      <label
        for="fat"
        class="form-label"
      >Fat (g)</label>
      <input
        id="fat"
        type="number"
        min="0"
        class="form-control"
        placeholder="Product fat"
        v-model="cacheProduct.fat"
      >
    </div>
    <div class="col-6">
      <label
        for="fiber"
        class="form-label"
      >Fiber (g)</label>
      <input
        id="fiber"
        type="number"
        min="0"
        class="form-control"
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
