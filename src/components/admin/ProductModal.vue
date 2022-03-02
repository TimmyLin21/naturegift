<template>
  <div class="modal fade" tabindex="-1"
  aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-secondary" v-if="isNew">Add New Product</h5>
          <h5 class="modal-title text-secondary" v-else>Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <ul class="nav nav-pills bg-success p-2 mb-3">
            <li class="nav-item" v-for="tab in tabs" :key="tab">
              <a class="nav-link" :class="{active: currentTab === tab}" @click="currentTab = tab">
                {{ tab }}
              </a>
            </li>
          </ul>
          <template v-if="currentTab === 'Info'">
            <form class="row g-3">
              <div class="col-3">
                <label for="category" class="form-label">Category</label>
                <select id="category" class="form-select" :value="product.category">
                  <option value="Spices">Spices</option>
                  <option value="Beans">Beans</option>
                  <option value="Nuts">Nuts</option>
                </select>
              </div>
              <div class="col-9">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title"
                placeholder="Product title" :value="product.title">
              </div>
              <div class="col-4">
                <label for="originPrice" class="form-label">Origin Price</label>
                <input type="number" class="form-control" id="originPrice"
                placeholder="Product origin price" :value="product.origin_price">
              </div>
              <div class="col-4">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" id="price"
                placeholder="Product price" :value="product.price">
              </div>
              <div class="col-4">
                <label for="unit" class="form-label">Unit</label>
                <input type="text" class="form-control" id="unit"
                placeholder="Product unit" :value="product.unit">
              </div>
              <hr class="mb-0">
              <div class="col">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox"
                  id="flexSwitchCheckChecked" :checked="product.is_enabled === '1'">
                  <label class="form-check-label" for="flexSwitchCheckChecked">
                    Enable product
                  </label>
                </div>
              </div>
            </form>
          </template>
          <template v-if="currentTab === 'Content'">
            <form class="row g-3">
              <div class="col-12">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description"
                placeholder="Product description" :value="product.description"/>
              </div>
              <div class="col-12">
                <label for="content" class="form-label">Content</label>
                <textarea class="form-control" id="content"
                placeholder="Product content" :value="product.content" />
              </div>
            </form>
          </template>
          <template v-if="currentTab === 'Nutrition'">
            <form class="row g-3">
              <div class="col-6">
                <label for="calories" class="form-label">Calories (kg)</label>
                <input id="calories" type="number" min="0" class="form-control"
                placeholder="Product calories" :value="product.calories">
              </div>
              <div class="col-6">
                <label for="carbohydrate" class="form-label">Carbohydrate (g)</label>
                <input id="carbohydrate" type="number" min="0" class="form-control"
                placeholder="Product carbohydrate" :value="product.carbohydrate">
              </div>
              <div class="col-6">
                <label for="protein" class="form-label">Protein (g)</label>
                <input id="protein" type="number" min="0" class="form-control"
                placeholder="Product protein" :value="product.protein">
              </div>
              <div class="col-6">
                <label for="fat" class="form-label">Fat (g)</label>
                <input id="fat" type="number" min="0" class="form-control"
                placeholder="Product fat" :value="product.fat">
              </div>
              <div class="col-6">
                <label for="fiber" class="form-label">Fiber (g)</label>
                <input id="fiber" type="number" min="0" class="form-control"
                placeholder="Product fiber" :value="product.fiber">
              </div>
            </form>
          </template>
          <template v-if="currentTab === 'Images'">
            <template v-if="product.imagesUrl.length > 0 || product.imageUrl">
              <div class="d-flex my-3 justify-content-between">
                <div class="w-30 detailImg" v-if="product.imageUrl">
                  <img :src="img"
                  alt="" class="w-100 rounded">
                  <a href="#" @click.prevent="delImg" class="link-danger">
                    <font-awesome-icon icon="times" class="detailImg__icon"/>
                  </a>
                  <div class="detailImg__text detailImg__text-active">Main image</div>
                </div>
                <template v-for="(img,key) in product.imagesUrl" :key="key">
                  <div class="w-30 detailImg">
                    <img :src="img"
                    alt="" class="w-100 rounded">
                    <a href="#" @click.prevent="delImg" class="link-danger">
                      <font-awesome-icon icon="times" class="detailImg__icon"/>
                    </a>
                    <a href="#" class="detailImg__text"
                    @click.prevent="setDefaultImg">Set main image</a>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="d-flex my-3 justify-content-between">
                <img src="https://img.icons8.com/ios/200/000000/image.png" class="w-30 rounded opacity-25" alt="no image"/>
                <img src="https://img.icons8.com/ios/200/000000/image.png" class="w-30 rounded opacity-25" alt="no image"/>
                <img src="https://img.icons8.com/ios/200/000000/image.png" class="w-30 rounded opacity-25" alt="no image"/>
              </div>
            </template>
            <label for="image-address" class="form-label">Image address</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Image address"
              id="image-address">
              <button class="btn btn-outline-success" type="button">Upload link</button>
            </div>
            <label for="image-file" class="form-label">Image file</label>
            <div class="input-group mb-3">
              <input type="file" class="form-control" placeholder="Image file" id="image-file">
              <button class="btn btn-outline-success" type="button">Upload link</button>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary text-secondary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      currentTab: 'Info',
      tabs: ['Info', 'Content', 'Nutrition', 'Images'],
      modal: '',
    };
  },
  props: ['product', 'isNew'],
  mixins: [modalMixin],
};
</script>
