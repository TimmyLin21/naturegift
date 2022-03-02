export default {
  data() {
    return {
      cacheProduct: {
        imagesUrl: [],
      },
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
