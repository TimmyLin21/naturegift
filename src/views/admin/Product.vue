<template>
  <main class="bg-light w-100">
    <div class="container py-4">
      <div class="d-flex justify-content-between mb-4">
        <select class="form-select w-10" v-model="selected" @change="getProducts(1,selected)">
          <option selected>All</option>
          <option :value="category" v-for="category in categorys" :key="category">
            {{ category }}
          </option>
        </select>
        <button class="btn btn-secondary text-white" @click="modalToggle('new')">
          Add new product
        </button>
      </div>
      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr class="table-secondary text-secondary">
              <th scope="col">Category</th>
              <th scope="col" colspan="2">Title</th>
              <th scope="col" class="text-nowrap">Origin Price</th>
              <th scope="col">Price</th>
              <th scope="col">Unit</th>
              <th scope="col">Enabled</th>
              <th scope="col" colspan="2">Edit</th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr v-for="product in products.products" :key="product.id">
              <td>{{ product.category }}</td>
              <td><img :src="product.imageUrl" :alt="product.title" class="w-50"></td>
              <td class="w-25">{{ product.title }}</td>
              <td>{{ product.origin_price }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.unit }}</td>
              <td v-if="product.is_enabled"><BIconCheckCircle /></td>
              <td v-else><BIconXCircle /></td>
              <td><a href="#" class="link-success" @click.prevent="modalToggle('edit', product)">
                <BIconPen />
              </a></td>
              <td><a href="#" class="link-danger" @click.prevent="modalToggle('del', product)">
                <BIconTrash />
              </a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination :pagination="products.pagination" @send-request="getProducts" />
    </div>
  </main>
  <!-- Modal -->
  <ProductModal ref="productModal" @send-request="getProducts(products.pagination.current_page)" />
  <DelModal ref="delModal" @send-request="getProducts" :item="cacheProduct">Product</DelModal>
</template>
<script>
import { getAdminProducts } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/admin/ProductModal.vue';
import DelModal from '@/components/admin/DelModal.vue';
import { computed } from 'vue';

export default {
  data() {
    return {
      products: '',
      cacheProduct: {
        imagesUrl: [],
      },
      isNew: true,
      categorys: ['Spices', 'Beans', 'Nuts'],
      selected: 'All',
    };
  },
  components: { Pagination, ProductModal, DelModal },
  methods: {
    getProducts(page, category) {
      this.sendLoadingState(true);
      getAdminProducts(page, category)
        .then((res) => {
          this.sendLoadingState(false);
          this.products = res.data;
        })
        .catch(() => {
          this.sendLoadingState(false);
          this.alert.msg = 'Fail to get the products';
          this.state = false;
          this.sendMsg();
        });
    },
    modalToggle(modal, item) {
      if (modal === 'new') {
        this.cacheProduct = { imagesUrl: [] };
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (modal === 'edit') {
        this.isNew = false;
        this.cacheProduct = JSON.parse(JSON.stringify(item));
        this.$refs.productModal.openModal();
      } else if (modal === 'del') {
        this.isNew = false;
        this.cacheProduct = JSON.parse(JSON.stringify(item));
        this.$refs.delModal.openModal();
      }
    },
  },
  provide() {
    return {
      product: computed(() => this.cacheProduct),
      state: computed(() => this.isNew),
    };
  },
  created() {
    this.getProducts();
    this.$emitter.on('send-request', (page) => {
      this.getProducts(page);
    });
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
