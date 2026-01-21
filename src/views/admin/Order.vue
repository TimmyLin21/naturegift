<template>
  <main class="bg-white w-full min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-end mb-6">
        <button
          type="button"
          class="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          @click.prevent="modalToggle('delAll')"
          :disabled="orders.orders?.length === 0"
        >
          Delete all orders
        </button>
      </div>
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full table-auto text-center">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th scope="col" class="py-3 px-6">
                Date
              </th>
              <th scope="col" class="py-3 px-6">
                Tracking Number
              </th>
              <th scope="col" class="py-3 px-6">
                Items
              </th>
              <th scope="col" class="py-3 px-6">
                Price
              </th>
              <th scope="col" class="py-3 px-6">
                Payment status
              </th>
              <th scope="col" class="py-3 px-6">
                Edit order
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="order in orders.orders"
              :key="order.id"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-6">{{ $filters.date(order.create_at) }}</td>
              <td class="py-3 px-6 whitespace-nowrap">
                {{ order.id }}
              </td>
              <td class="py-3 px-6 text-left">
                <ul class="list-disc list-inside">
                  <li
                    class="whitespace-nowrap"
                    v-for="product in order.products"
                    :key="product.id"
                  >
                    {{ product.product.title }} {{ product.product.unit }} x {{ product.qty }}
                  </li>
                </ul>
              </td>
              <td class="py-3 px-6 font-bold text-secondary">{{ order.total }}</td>
              <td class="py-3 px-6" v-if="order.is_paid">
                <span class="text-green-500 font-bold">
                  <BIconCheckCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6" v-else>
                <span class="text-gray-400">
                  <BIconXCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6">
                <div class="flex item-center justify-center gap-4">
                  <a
                    href="#"
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('edit', order)"
                    title="Edit"
                  >
                    <BIconPen class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="transform hover:text-red-500 hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('del', order)"
                    title="Delete"
                  >
                    <BIconTrash class="w-5 h-5" />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 flex justify-center">
        <Pagination
          :pagination="orders.pagination"
          @send-request="getOrders"
        />
      </div>
    </div>
  </main>
  <!-- Modal -->
  <DelModal
    ref="delModal"
    @del-item="delOrder"
    @del-all="delAllOrders"
    :item="cacheOrder"
  >
    Order
  </DelModal>
  <OrderModal
    ref="orderModal"
    @send-request="getOrders"
    :order="cacheOrder"
  />
</template>

<script>
import { getAdminOrders, delAllOrders, delOrder } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/admin/DelModal.vue';
import OrderModal from '@/components/admin/OrderModal.vue';

export default {
  data() {
    return {
      orders: '',
      cacheOrder: {
        imagesUrl: [],
      },
    };
  },
  components: { Pagination, DelModal, OrderModal },
  methods: {
    getOrders(page) {
      this.sendLoadingState(true);
      getAdminOrders(page)
        .then((res) => {
          this.sendLoadingState(false);
          this.orders = res.data;
        })
        .catch(() => {
          this.sendLoadingState(false);
          this.alert.msg = 'Fail to get the orders';
          this.alert.state = false;
          this.sendMsg();
        });
    },
    delAllOrders() {
      this.sendLoadingState(true);
      delAllOrders()
        .then((res) => {
          this.alert.msg = res.data.message;
          this.alert.state = true;
          this.$refs.delModal.closeModal();
          this.sendMsg();
          this.getOrders();
        })
        .catch((err) => {
          this.sendLoadingState(false);
          this.alert.msg = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
    delOrder() {
      delOrder(this.cacheOrder.id)
        .then((res) => {
          this.alert.msg = res.data.message;
          this.alert.state = true;
          this.$refs.delModal.closeModal();
          this.sendMsg();
          this.getOrders();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.$refs.delModal.closeModal();
          this.sendMsg();
        });
    },
    modalToggle(modal, item) {
      if (modal === 'edit') {
        this.cacheOrder = JSON.parse(JSON.stringify(item));
        this.$refs.orderModal.openModal();
      } else if (modal === 'del') {
        this.cacheOrder = JSON.parse(JSON.stringify(item));
        this.$refs.delModal.openModal();
      } else if (modal === 'delAll') {
        this.cacheOrder = {};
        this.$refs.delModal.openModal();
      }
    },
  },
  created() {
    this.getOrders();
    this.$emitter.on('send-request', (page) => {
      this.getOrders(page);
    });
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
