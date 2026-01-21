<template>
  <main class="container mx-auto px-4 py-5 mt-[100px] md:mt-[150px]">
    <div class="flex justify-center items-center mb-10 gap-8 lg:gap-20">
      <div class="flex flex-col items-center relative z-10 text-secondary">
        <div class="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-2 shadow-lg">
          <BIconCart width="1.5rem" height="1.5rem" />
        </div>
        <p class="font-bold">Checkout</p>
      </div>
      <div class="h-[2px] w-16 bg-secondary -mt-8 hidden md:block"></div>
      <div class="flex flex-col items-center relative z-10 text-secondary">
        <div class="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-2 shadow-lg">
          <BIconCreditCard width="1.5rem" height="1.5rem" />
        </div>
        <p class="font-bold">Payment</p>
      </div>
      <div class="h-[2px] w-16 bg-secondary -mt-8 hidden md:block"></div>
      <div class="flex flex-col items-center relative z-10 text-secondary">
        <div class="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-2 shadow-lg">
          <BIconStar width="1.5rem" height="1.5rem" />
        </div>
        <p class="font-bold">Finish</p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-5/12 pt-0 md:pt-14 mb-5">
        <div class="bg-primary shadow-xl rounded-lg p-8 mx-auto text-center text-white">
          <h2 class="text-3xl font-bold mb-6 leading-tight">
            Thank you <br> for your purchase!
          </h2>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link
              to="/"
              class="px-6 py-2 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-secondary transition-colors"
            >
              Go to Home
            </router-link>
            <router-link
              to="/products"
              class="px-6 py-2 bg-secondary text-white font-bold rounded hover:bg-opacity-90 transition-colors"
            >
              Keep shopping
            </router-link>
          </div>
        </div>
      </div>
      <section class="w-full md:w-7/12 mb-4">
        <div class="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <h2 class="text-xl font-bold px-6 py-4 bg-gray-50 border-b border-gray-200 text-gray-800">
            Order Info
          </h2>
          <div class="p-6 text-sm">
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Date:</span>
              <span>{{ $filters.date(order.create_at) }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Track Number:</span>
              <span class="break-all text-right ml-4">{{ order.id }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Customer Name:</span>
              <span>{{ order.user.name }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Contact Number:</span>
              <span>{{ order.user.tel }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Email:</span>
              <span>{{ order.user.email }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Address:</span>
              <span>{{ order.user.address }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="font-bold text-gray-500">Subtotal:</span>
              <span class="font-bold text-xl text-secondary">NT$ {{ order.total }}</span>
            </div>
            <div class="mt-4">
              <button 
                class="flex items-center justify-between w-full text-left font-bold text-secondary focus:outline-none group"
                @click="isRotate = !isRotate"
              >
                <span>Order Items</span>
                <BIconCaretDownFill
                  class="transform transition-transform duration-300"
                  :class="{ 'rotate-180': isRotate }"
                />
              </button>
              
              <div
                v-show="isRotate"
                class="mt-4 overflow-hidden transition-all duration-300"
              >
                <div class="overflow-x-auto rounded-lg border border-gray-200">
                  <table class="w-full text-left text-gray-600">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th colspan="2" class="px-4 py-2">Product</th>
                        <th class="px-4 py-2 text-center">Qty</th>
                        <th class="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr
                        v-for="item in order.products"
                        :key="item.id"
                        class="bg-white hover:bg-gray-50 transition-colors"
                      >
                        <td class="p-3 w-16">
                          <img
                            :src="item.product.imageUrl"
                            :alt="item.product.title"
                            class="w-12 h-12 object-cover rounded shadow-sm"
                          >
                        </td>
                        <td class="p-3 font-medium text-gray-800">
                          {{ item.product.title }}
                        </td>
                        <td class="p-3 text-center">
                          {{ item.qty }}
                        </td>
                        <td class="p-3 text-right whitespace-nowrap">
                          <template v-if="item.total === item.final_total">
                            <span class="font-bold text-secondary">NT$ {{ item.total }}</span>
                          </template>
                          <template v-else>
                            <span class="block text-xs line-through text-gray-400">
                              NT$ {{ item.total }}
                            </span>
                            <span class="font-bold text-secondary">NT$ {{ item.final_total }}</span>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { getOrder, postPay } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';

export default {
  data() {
    return {
      order: {
        user: {},
        product: {},
      },
      isRotate: false,
      payMethod: '',
    };
  },
  methods: {
    getOrder() {
      getOrder(this.$route.params.id)
        .then((res) => {
          this.order = res.data.order;
        }).catch(() => {
          this.alert.msg = 'Failed to get Order!';
          this.alert.state = false;
          this.sendMsg();
          this.couponCode = '';
        });
    },
    postPay() {
      if (this.payMethod) {
        postPay(this.$route.params.id)
          .then((res) => {
            this.$router.push(`/finish/${res.data.orderId}`);
          }).catch(() => {
            this.alert.msg = 'Failed to finish the payment!';
            this.alert.state = false;
            this.sendMsg();
          });
      } else {
        this.alert.msg = 'Please choose one payment method!';
        this.alert.state = false;
        this.sendMsg();
      }
    },
  },
  created() {
    this.getOrder();
  },
  mixins: [alertMixin],
};
</script>
