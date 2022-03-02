<template>
  <template v-if="cacheProduct.imagesUrl.length > 0 || cacheProduct.imageUrl">
    <div class="d-flex my-3 justify-content-between">
      <div class="w-30 detailImg" v-if="cacheProduct.imageUrl">
        <img :src="img"
        alt="" class="w-100 rounded">
        <a href="#" @click.prevent="delImg" class="link-danger">
          <font-awesome-icon icon="times" class="detailImg__icon"/>
        </a>
        <div class="detailImg__text detailImg__text-active">Main image</div>
      </div>
      <template v-for="(img,key) in cacheProduct.imagesUrl" :key="key">
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
<script>
import productTab from '@/mixins/productTab';

export default {
  mixins: [productTab],
};
</script>
