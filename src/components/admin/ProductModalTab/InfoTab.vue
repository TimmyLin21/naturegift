<template>
  <form class="row g-3">
    <div class="col-3">
      <label for="category" class="form-label">Category</label>
      <select id="category" class="form-select" v-model="cacheProduct.category">
        <option value="Spices">Spices</option>
        <option value="Beans">Beans</option>
        <option value="Nuts">Nuts</option>
      </select>
    </div>
    <div class="col-9">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title"
      placeholder="Product title" v-model="cacheProduct.title">
    </div>
    <div class="col-4">
      <label for="originPrice" class="form-label">Origin Price</label>
      <input type="number" class="form-control" id="originPrice"
      placeholder="Product origin price" v-model="cacheProduct.origin_price">
    </div>
    <div class="col-4">
      <label for="price" class="form-label">Price</label>
      <input type="number" class="form-control" id="price"
      placeholder="Product price" v-model="cacheProduct.price">
    </div>
    <div class="col-4">
      <label for="unit" class="form-label">Unit</label>
      <input type="text" class="form-control" id="unit"
      placeholder="Product unit" v-model="cacheProduct.unit">
    </div>
    <hr class="mb-0">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox"
        id="flexSwitchCheckChecked" :checked="cacheProduct.is_enabled === '1'">
        <label class="form-check-label" for="flexSwitchCheckChecked">
          Enable product
        </label>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      cacheProduct: '',
      isNew: true,
    };
  },
  inject: ['product', 'state'],
  watch: {
    product() {
      this.cacheProduct = this.product;
    },
    state() {
      this.isNew = this.state;
    },
  },
};
</script>
