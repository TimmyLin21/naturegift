<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative">
      <div class="flex items-center justify-between p-4 border-b bg-primary rounded-t-lg">
        <h5 class="text-xl font-bold text-secondary">
          Edit Order
        </h5>
        <button
          type="button"
          class="text-secondary hover:text-white text-2xl leading-none"
          @click="closeModal"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div class="p-6 overflow-y-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-5 col-span-12">
            <h3 class="text-lg font-bold mb-4">Customer Info</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-12 gap-2 items-center">
                <label for="name" class="col-span-3 font-bold">Name</label>
                <div class="col-span-9">
                  <input
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    id="name"
                    v-model="cacheOrder.user.name"
                  >
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 items-center">
                <label for="email" class="col-span-3 font-bold">Email</label>
                <div class="col-span-9">
                  <input
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    id="email"
                    v-model="cacheOrder.user.email"
                  >
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 items-center">
                <label for="tel" class="col-span-3 font-bold">Phone</label>
                <div class="col-span-9">
                  <input
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    id="tel"
                    v-model="cacheOrder.user.tel"
                  >
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 items-center">
                <label for="address" class="col-span-3 font-bold">Address</label>
                <div class="col-span-9">
                  <input
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    id="address"
                    v-model="cacheOrder.user.address"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-7 col-span-12">
            <h3 class="text-lg font-bold mb-4">Order Detail</h3>
            <table class="w-full mb-6">
              <tbody>
                <tr class="border-b">
                  <th class="py-2 w-[120px] whitespace-nowrap align-top">Tracking number</th>
                  <td class="py-2">{{ cacheOrder.id }}</td>
                </tr>
                <tr class="border-b">
                  <th class="py-2 align-top">Ordered time</th>
                  <td class="py-2">{{ $filters.date(cacheOrder.create_at) }}</td>
                </tr>
                <tr class="border-b">
                  <th class="py-2 align-top">Paid time</th>
                  <td class="py-2">
                    <span v-if="cacheOrder.paid_date">
                      {{ $filters.date(cacheOrder.paid_date) }}
                    </span>
                    <span v-else> - </span>
                  </td>
                </tr>
                <tr class="border-b">
                  <th class="py-2 align-top">Paid statement</th>
                  <td class="py-2">
                    <strong
                      v-if="cacheOrder.is_paid"
                      class="text-green-500"
                    >Paid</strong>
                    <span
                      v-else
                      class="text-gray-500"
                    >Unpaid</span>
                  </td>
                </tr>
                <tr class="border-b">
                  <th class="py-2 align-top">Total</th>
                  <td class="py-2">
                    {{ $filters.currency(cacheOrder.total) }}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <h3 class="text-lg font-bold mb-4">Order items</h3>
            <table class="w-full mb-4">
              <tbody>
                <tr
                  v-for="product in cacheOrder.products"
                  :key="product.id"
                  class="border-b last:border-0"
                >
                  <th class="py-2 font-normal text-left">
                    {{ product.product.title }}
                  </th>
                  <td class="py-2 text-center">{{ product.product.unit }} x {{ product.qty }} </td>
                  <td class="py-2 text-right">
                    {{ $filters.currency(product.final_total) }}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div class="flex items-center pt-4 border-t">
              <input
                class="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                type="checkbox"
                v-model="cacheOrder.is_paid"
                :true-value="true"
                :false-value="false"
                id="isPaidSwitch"
                :checked="cacheOrder.is_paid"
              >
              <label
                class="font-bold cursor-pointer"
                for="isPaidSwitch"
              >
                <span v-if="cacheOrder.is_paid" class="text-green-500">Paid</span>
                <span v-else class="text-gray-500">Unpaid</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
        <button
          type="button"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          @click="closeModal"
        >
          Close
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-primary text-secondary font-bold rounded hover:bg-opacity-90 transition-colors"
          @click="saveChange"
        >
          Save changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin.js';
import alertMixin from '@/mixins/alertMixin.js';
import { editOrder } from '@/scripts/api.js';

export default {
  data() {
    return {
      cacheOrder: {
        imagesUrl: [],
        user: {},
      },
    };
  },
  props: {
    order: {
      type: Object,
      default() {
        return {
          imagesUrl: [],
          user: {},
        };
      },
    },
  },
  methods: {
    saveChange() {
      editOrder(this.cacheOrder.id, this.cacheOrder)
        .then((res) => {
          this.alert.msg = res.data.message;
          this.alert.state = true;
          this.closeModal();
          this.sendMsg();
          this.sendRequest();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
    sendRequest() {
      this.$emit('send-request');
    },
  },
  watch: {
    order() {
      this.cacheOrder = this.order;
    },
  },
  mixins: [modalMixin, alertMixin],
  emits: ['send-request'],
};
</script>
