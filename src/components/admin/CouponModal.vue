<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative">
      <div class="flex items-center justify-between p-4 border-b bg-primary rounded-t-lg">
        <h5 class="text-xl font-bold text-secondary">
          {{ state ? 'Add New Coupon' : 'Edit Coupon' }}
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
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-1">
            <label
              for="title"
              class="block mb-2 font-bold"
            >Title</label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="title"
              placeholder="Coupon title"
              v-model="cacheCoupon.title"
            >
          </div>
          <div class="col-span-1">
            <label
              for="code"
              class="block mb-2 font-bold"
            >Code</label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="code"
              placeholder="Coupon code"
              v-model="cacheCoupon.code"
            >
          </div>
          <div class="col-span-1">
            <label
              for="due_date"
              class="block mb-2 font-bold"
            >Expired date</label>
            <input
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="due_date"
              v-model="due_date"
            >
          </div>
          <div class="col-span-1">
            <label
              for="discount"
              class="block mb-2 font-bold"
            >Discount</label>
            <input
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="discount"
              min="0"
              placeholder="Coupon discount"
              v-model.number="cacheCoupon.percent"
            >
          </div>
          <div class="col-span-1 md:col-span-2 pt-4 border-t">
            <div class="flex items-center">
              <input
                class="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                type="checkbox"
                v-model="cacheCoupon.is_enabled"
                id="couponEnabledSwitch"
                :checked="cacheCoupon.is_enabled === 1"
                :true-value="1"
                :false-value="0"
              >
              <label
                class="font-bold cursor-pointer"
                for="couponEnabledSwitch"
              >
                Enable coupon
              </label>
            </div>
          </div>
        </form>
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
          v-if="!isReadOnly"
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
import { addNewCoupon, editCoupon } from '@/scripts/api.js';

export default {
  data() {
    return {
      cacheCoupon: {},
      due_date: 0,
    };
  },
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    state: {
      type: Boolean,
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    saveChange() {
      if (this.state) {
        addNewCoupon(this.cacheCoupon)
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
      } else {
        editCoupon(this.cacheCoupon.id, this.cacheCoupon)
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
      }
    },
    sendRequest() {
      this.$emit('send-request');
    },
  },
  watch: {
    coupon() {
      this.cacheCoupon = this.coupon;
      const date = new Date(this.cacheCoupon.due_date * 1000).toISOString().split('T');
      [this.due_date] = date;
    },
    due_date() {
      this.cacheCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mixins: [modalMixin, alertMixin],
  emits: ['send-request'],
};
</script>
