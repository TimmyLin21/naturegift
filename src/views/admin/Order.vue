<template>
  <main class="bg-light w-100">
    <div class="container py-4">
      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-danger text-white" @click.prevent="modalToggle('delAll')">
          Delete all orders
        </button>
      </div>
      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr class="table-secondary text-secondary align-middle">
              <th scope="col">Date</th>
              <th scope="col">Tracking Number</th>
              <th scope="col">Items</th>
              <th scope="col">Price</th>
              <th scope="col">Payment status</th>
              <th scope="col">Edit order</th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr v-for="order in orders.orders" :key="order.id">
              <td>{{ $filters.date(order.create_at) }}</td>
              <td class="text-nowrap">{{ order.id }}</td>
              <td>
                <p class="text-nowrap" v-for="product in order.products" :key="product.id">
                  {{ product.product.title }} {{ product.product.unit }} x {{ product.qty }}
                </p>
              </td>
              <td>{{ order.total }}</td>
              <td v-if="order.is_paid"><BIconCheckCircle /></td>
              <td v-else><BIconXCircle /></td>
              <td class="text-nowrap">
                <a href="#" class="link-success me-3" @click.prevent="modalToggle('edit', order)">
                  <BIconPen />
                </a>
                <a href="#" class="link-danger" @click.prevent="modalToggle('del', order)">
                  <BIconTrash />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination :pagination="orders.pagination" @send-request="getOrders" />
    </div>
  </main>
  <!-- Modal -->
  <DelModal ref="delModal" @del-item="delOrder" @del-all="delAllOrders"
  :item="cacheOrder">Order</DelModal>
  <OrderModal ref="orderModal" @send-request="getOrders" :order="cacheOrder" />
</template>
<script>
import { getAdminOrders, delAllOrders, delOrder } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';
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
