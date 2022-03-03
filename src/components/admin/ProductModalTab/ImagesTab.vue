<template>
  <template v-if="cacheProduct.imagesUrl.length > 0 || cacheProduct.imageUrl">
    <div class="d-flex my-3 justify-content-between">
      <div class="w-30 detailImg" v-if="cacheProduct.imageUrl">
        <img :src="cacheProduct.imageUrl"
        alt="" class="w-100 rounded">
        <a href="#" @click.prevent="delImg('main')" class="link-danger">
          <font-awesome-icon icon="times" class="detailImg__icon"/>
        </a>
        <div class="detailImg__text detailImg__text-active">Main image</div>
      </div>
      <template v-for="(img,key) in cacheProduct.imagesUrl" :key="key">
        <div class="w-30 detailImg">
          <img :src="img"
          alt="" class="w-100 rounded">
          <a href="#" @click.prevent="delImg('other', key)" class="link-danger">
            <font-awesome-icon icon="times" class="detailImg__icon"/>
          </a>
          <a href="#" class="detailImg__text"
          @click.prevent="setMainImg(key)">Set main image</a>
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
    id="image-address" v-model="imgUrl">
    <button class="btn btn-outline-success" type="button" @click="addImg">Upload link</button>
  </div>
  <label for="image-file" class="form-label">Image file</label>
  <div class="input-group mb-3">
    <input type="file" class="form-control" placeholder="Image file" id="image-file"
    @change="update" ref="fileInput">
    <button class="btn btn-outline-success" type="button" @click="upload">Upload File</button>
  </div>
</template>
<script>
import productTab from '@/mixins/productTab';
import alertMixin from '@/mixins/alertMixin';
import { uploadImg } from '@/scripts/api';

export default {
  data() {
    return {
      imgUrl: '',
      formData: '',
    };
  },
  mixins: [productTab, alertMixin],
  methods: {
    addImg() {
      if (!this.cacheProduct.imageUrl) {
        this.cacheProduct.imageUrl = this.imgUrl;
      } else {
        this.cacheProduct.imagesUrl.push(this.imgUrl);
      }
      this.imgUrl = '';
    },
    delImg(state, key) {
      if (state === 'main') {
        this.cacheProduct.imageUrl = '';
      } else {
        this.cacheProduct.imagesUrl.splice(key, 1);
      }
    },
    setMainImg(key) {
      this.cacheProduct.imagesUrl.push(this.cacheProduct.imageUrl);
      this.cacheProduct.imageUrl = this.cacheProduct.imagesUrl[key];
      this.cacheProduct.imagesUrl.splice(key, 1);
    },
    update() {
      // get the update file
      const file = this.$refs.fileInput.files[0];
      // add header name and file to formData
      this.formData.append('file-to-upload', file);
    },
    upload() {
      uploadImg(this.formData)
        .then((res) => {
          this.imgUrl = res.data.imageUrl;
          this.addImg();
          // alert
          this.alert.msg = 'Upload success!';
          this.alert.state = true;
          this.sendMsg();
        }).catch((err) => {
          // alert
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
  },
  mounted() {
    this.formData = new FormData();
  },
};
</script>
