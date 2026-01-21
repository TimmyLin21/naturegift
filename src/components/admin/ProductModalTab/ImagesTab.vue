<template>
  <template v-if="cacheProduct.imagesUrl?.length > 0 || cacheProduct.imageUrl">
    <div class="flex flex-wrap gap-4 my-3 justify-between">
      <div
        class="w-[30%] relative group"
        v-if="cacheProduct.imageUrl"
      >
        <img
          :src="cacheProduct.imageUrl"
          alt=""
          class="w-full rounded shadow-md object-cover aspectRatio-1"
        >
        <a
          href="#"
          @click.prevent="delImg('main')"
          class="absolute top-2 right-2 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <font-awesome-icon
            icon="times"
          />
        </a>
        <div class="absolute bottom-0 left-0 right-0 bg-secondary text-white text-center py-1 bg-opacity-90 rounded-b">
          Main image
        </div>
      </div>
      <template
        v-for="(img, key) in cacheProduct.imagesUrl"
        :key="key"
      >
        <div class="w-[30%] relative group">
          <img
            :src="img"
            alt=""
            class="w-full rounded shadow-md object-cover aspectRatio-1"
          >
          <a
            href="#"
            @click.prevent="delImg('other', key)"
            class="absolute top-2 right-2 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <font-awesome-icon
              icon="times"
            />
          </a>
          <a
            href="#"
            class="absolute bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-1 bg-opacity-70 hover:bg-opacity-90 transition-all rounded-b no-underline"
            @click.prevent="setMainImg(key)"
          >Set main image</a>
        </div>
      </template>
    </div>
  </template>
  <template v-else>
    <div class="flex my-3 justify-between gap-4">
      <img
        src="https://img.icons8.com/ios/200/000000/image.png"
        class="w-[30%] rounded opacity-25 border border-dashed border-gray-300"
        alt="no image"
      >
      <img
        src="https://img.icons8.com/ios/200/000000/image.png"
        class="w-[30%] rounded opacity-25 border border-dashed border-gray-300"
        alt="no image"
      >
      <img
        src="https://img.icons8.com/ios/200/000000/image.png"
        class="w-[30%] rounded opacity-25 border border-dashed border-gray-300"
        alt="no image"
      >
    </div>
  </template>
  
  <label
    for="image-address"
    class="block text-gray-700 font-bold mb-2 mt-4"
  >Image address</label>
  <div class="flex mb-4 gap-2">
    <input
      type="text"
      class="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      placeholder="Image address"
      id="image-address"
      v-model="imgUrl"
    >
    <button
      class="px-4 py-2 border border-green-500 text-green-500 font-bold rounded-r-lg hover:bg-green-500 hover:text-white transition-colors"
      type="button"
      @click="addImg"
    >
      Upload link
    </button>
  </div>
  
  <label
    for="image-file"
    class="block text-gray-700 font-bold mb-2"
  >Image file</label>
  <div class="flex mb-4 gap-2">
    <input
      type="file"
      class="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
      placeholder="Image file"
      id="image-file"
      @change="update"
      ref="fileInput"
    >
    <button
      class="px-4 py-2 border border-green-500 text-green-500 font-bold rounded-r-lg hover:bg-green-500 hover:text-white transition-colors"
      type="button"
      @click="upload"
    >
      Upload File
    </button>
  </div>
</template>

<script>
import productTab from '@/mixins/productTab.js';
import alertMixin from '@/mixins/alertMixin.js';
import { uploadImg } from '@/scripts/api.js';

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
