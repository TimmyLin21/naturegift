<template>
  <main class="bg-white w-full min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div class="w-full md:w-auto relative">
          <select
            class="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white bg-none cursor-pointer"
            v-model="selected"
            @change="getProducts(1, selected)"
          >
            <option selected>All</option>
            <option
              :value="category"
              v-for="category in categorys"
              :key="category"
            >
              {{ category }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        
        <button
          type="button"
          class="inline-block bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-bold shadow-sm"
          @click="modalToggle('new')"
          v-if="!isDemo"
        >
          Add new product
        </button>
      </div>
      
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full table-auto">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th class="py-3 px-6 text-left">Category</th>
              <th colspan="2" class="py-3 px-6 text-left">Title</th>
              <th class="py-3 px-6 text-center whitespace-nowrap">Origin Price</th>
              <th class="py-3 px-6 text-center">Price</th>
              <th class="py-3 px-6 text-center">Unit</th>
              <th class="py-3 px-6 text-center">Enabled</th>
              <th colspan="2" class="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="product in products.products"
              :key="product.id"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <span class="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs font-bold">{{ product.category }}</span>
              </td>
              <td class="py-3 px-6 text-left w-24">
                <img
                  :src="product.imageUrl"
                  :alt="product.title"
                  class="w-16 h-16 rounded shadow-sm object-cover"
                >
              </td>
              <td class="py-3 px-6 text-left font-medium">
                {{ product.title }}
              </td>
              <td class="py-3 px-6 text-center">{{ product.origin_price }}</td>
              <td class="py-3 px-6 text-center text-secondary font-bold">{{ product.price }}</td>
              <td class="py-3 px-6 text-center">{{ product.unit }}</td>
              <td class="py-3 px-6 text-center">
                <span v-if="product.is_enabled" class="text-green-500 font-bold">
                  <BIconCheckCircle class="w-5 h-5 inline" />
                </span>
                <span v-else class="text-gray-400">
                  <BIconXCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center gap-4">
                  <button
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('edit', product)"
                    title="Edit"
                    v-if="!isDemo"
                  >
                    <BIconPen class="w-5 h-5" />
                  </button>
                  <button
                    class="transform hover:text-red-500 hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('del', product)"
                    title="Delete"
                    v-if="!isDemo"
                  >
                    <BIconTrash class="w-5 h-5" />
                  </button>
                  <button
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('view', product)"
                    title="View Details"
                    v-if="isDemo"
                  >
                    <BIconEyeFill class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-6 flex justify-center">
        <Pagination
          :pagination="products.pagination"
          @send-request="getProducts"
        />
      </div>
    </div>
  </main>
  <!-- Modal -->
  <ProductModal
    ref="productModal"
    @send-request="getProducts(products.pagination.current_page)"
    :is-read-only="isDemo"
  />
  <DelModal
    ref="delModal"
    :item="cacheProduct"
    @del-item="delProduct"
  >
    Product
  </DelModal>
</template>

  <style scoped>
    select {
      background-image: none;
    }
  </style>
  <script>
  import { computed } from 'vue';
import { getAdminProducts, delProduct } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/admin/ProductModal.vue';
import DelModal from '@/components/admin/DelModal.vue';

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
      isDemo: false,
    };
  },
  components: { Pagination, ProductModal, DelModal },
  methods: {
    getProducts(page, category) {
      if (this.isDemo) {
        this.products = {
          products: [
            {
              id: 'demo-1',
              category: 'Spices',
              title: 'Demo Spice',
              origin_price: 100,
              price: 80,
              unit: 'bottle',
              is_enabled: 1,
              imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            },
            {
              id: 'demo-2',
              category: 'Beans',
              title: 'Demo Beans',
              origin_price: 200,
              price: 150,
              unit: 'bag',
              is_enabled: 0,
              imageUrl: '/images/Beans.jpeg',
            }
          ],
          pagination: {
            total_pages: 1,
            current_page: 1,
            has_pre: false,
            has_next: false,
          }
        };
        return;
      }
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
      } else if (modal === 'view') {
        this.isNew = false;
        this.cacheProduct = JSON.parse(JSON.stringify(item));
        this.$refs.productModal.openModal();
      }
    },
    delProduct() {
      delProduct(this.cacheProduct.id)
        .then((res) => {
          this.alert.msg = res.data.message;
          this.alert.state = true;
          this.$refs.delModal.closeModal();
          this.sendMsg();
          this.getProducts();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.$refs.delModal.closeModal();
          this.sendMsg();
        });
    },
  },
  provide() {
    return {
      product: computed(() => this.cacheProduct),
      state: computed(() => this.isNew),
    };
  },
  created() {
    this.isDemo = localStorage.getItem('isDemo') === 'true';
    this.getProducts();
    this.$emitter.on('send-request', (page) => {
      this.getProducts(page);
    });
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
