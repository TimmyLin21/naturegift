<template>
  <form class="row g-3">
    <div class="col-12">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" id="description"
      placeholder="Product description" v-model="cacheProduct.description"/>
    </div>
    <div class="col-12">
      <label for="content" class="form-label">Content</label>
      <textarea class="form-control" id="content"
      placeholder="Product content" v-model="cacheProduct.content" />
    </div>
  </form>
</template>
<script>
import productTab from '@/mixins/productTab';

export default {
  mixins: [productTab],
};
</script>
