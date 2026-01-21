<template>
  <main class="container mx-auto px-4 py-5 mt-[100px] md:mt-[150px]">
    <div class="flex justify-center items-center mb-10 gap-8 lg:gap-20">
      <div class="flex flex-col items-center relative z-10">
        <div class="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-2 shadow-lg">
          <BIconCart width="1.5rem" height="1.5rem" />
        </div>
        <p class="font-bold text-gray-800">Checkout</p>
      </div>
      <div class="h-[2px] w-16 bg-gray-300 -mt-8 hidden md:block"></div>
      <div class="flex flex-col items-center relative z-10 text-gray-400">
        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
          <BIconCreditCard width="1.5rem" height="1.5rem" />
        </div>
        <p>Payment</p>
      </div>
      <div class="h-[2px] w-16 bg-gray-300 -mt-8 hidden md:block"></div>
      <div class="flex flex-col items-center relative z-10 text-gray-400">
        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
          <BIconStar width="1.5rem" height="1.5rem" />
        </div>
        <p>Finish</p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-8">
      <section class="w-full md:w-7/12 mb-4">
        <h2
          class="text-2xl font-bold mb-4"
          :class="{ 'hidden': carts.length === 0 }"
        >
          Your cart
        </h2>
        <template v-if="carts.length > 0">
          <div class="overflow-x-auto mb-5 rounded-lg shadow-sm border border-gray-100">
            <table class="w-full text-left border-collapse">
              <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th scope="col" colspan="3" class="py-3 px-4">Product</th>
                  <th scope="col" class="py-3 px-4">Price</th>
                  <th scope="col" class="py-3 px-4">Quantity</th>
                  <th scope="col" class="py-3 px-4">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="item in carts"
                  :key="item.id"
                  class="bg-white hover:bg-gray-50 transition-colors"
                >
                  <td class="py-3 px-4 w-10">
                    <a
                      href="#"
                      class="text-red-400 hover:text-red-600 transition-colors"
                      :class="{ 'opacity-50 cursor-not-allowed': loadingItem === item.id }"
                      @click.prevent="removeCartItem(item.id)"
                    >
                      <font-awesome-icon icon="spinner" spin v-if="loadingItem === item.id" />
                      <BIconTrash v-else />
                    </a>
                  </td>
                  <td class="py-3 px-4" width="100px">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="w-20 h-14 object-cover rounded shadow-sm"
                    >
                  </td>
                  <td class="py-3 px-4">
                    <p class="font-medium text-gray-800 mb-0">
                      {{ item.product.title }}
                    </p>
                    <small class="text-gray-500">Size: {{ item.product.unit }}</small>
                  </td>
                  <td class="py-3 px-4">
                    <template v-if="item.product.price !== item.product.origin_price">
                      <p class="mb-0 text-sm line-through text-gray-400">
                        NT$ {{ item.product.origin_price }}
                      </p>
                      <p class="mb-0 font-bold text-gray-800">
                        NT$ {{ item.product.price }}
                      </p>
                    </template>
                    <template v-else>
                      <p class="mb-0 font-bold text-gray-800">
                        NT$ {{ item.product.origin_price }}
                      </p>
                    </template>
                  </td>
                  <td class="py-3 px-4" width="15%">
                    <div class="flex items-center gap-2 relative">
                      <div v-if="loadingItem === item.id" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 font-bold text-xs">
                        <font-awesome-icon icon="spinner" spin />
                      </div>
                      <button 
                        class="text-gray-500 hover:text-secondary disabled:opacity-50 w-6 h-6 flex items-center justify-center"
                        @click="updateCart(item, '-')"
                        :disabled="item.qty <= 1 || loadingItem === item.id"
                      >
                        <BIconDashCircle class="w-5 h-5" />
                      </button>
                      <input
                        class="w-12 text-center border-0 p-0 focus:ring-0 font-bold bg-gray-100 rounded border border-gray-200 h-6 leading-none text-sm"
                        type="number"
                        min="1"
                        v-model.number="item.qty"
                        @change="updateCart(item)"
                        :disabled="loadingItem === item.id"
                      >
                      <button 
                        class="text-gray-500 hover:text-secondary disabled:opacity-50 w-6 h-6 flex items-center justify-center"
                        @click="updateCart(item, '+')"
                        :disabled="loadingItem === item.id"
                      >
                        <BIconPlusCircle class="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                  <td class="py-3 px-4 font-bold text-secondary whitespace-nowrap">
                    NT$ {{ item.total }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50 border-t border-gray-100">
                <tr>
                  <td colspan="3" class="py-3 px-4 font-bold text-right text-gray-600">
                    Subtotal
                  </td>
                  <td
                    colspan="3"
                    class="py-3 px-4 text-right"
                  >
                    <div v-if="total !== final_total" class="flex flex-col items-end">
                      <span class="text-gray-400 line-through text-sm">NTD$ {{ total }}</span>
                      <span class="text-red-500 font-bold text-lg">NTD$ {{ final_total }}</span>
                    </div>
                    <div v-else class="text-lg font-bold text-gray-800">
                      NTD$ {{ final_total }}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="flex gap-2 mb-6">
            <input
              type="text"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Coupon Code"
              v-model="couponCode"
            >
            <button
              class="px-6 py-2 border border-secondary text-secondary font-bold rounded-lg hover:bg-secondary hover:text-white transition-colors"
              type="button"
              @click="applyCoupon"
            >
              Apply
            </button>
          </div>
        </template>
        <template v-else>
          <div class="text-center py-10">
            <p class="font-bold text-2xl text-gray-800 mb-2">
              Your cart is empty
            </p>
            <p class="text-gray-500 mb-8">
              Looks like you haven't made a choice yet.
            </p>
            <button
              class="px-8 py-3 bg-secondary text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transform hover:scale-105 transition-all"
              @click="goShop"
            >
              Shop now
            </button>
          </div>
        </template>
      </section>
      <ContactInfo class="w-full md:w-5/12" />
    </div>
  </main>
</template>

<script>
import cartMixin from '@/mixins/cartMixin.js';
import { applyCoupon } from '@/scripts/api.js';
import ContactInfo from '@/components/front/ContactInfo.vue';

export default {
  data() {
    return {
      couponCode: '',
      loadingItem: '',
    };
  },
  components: { ContactInfo },
  methods: {
    applyCoupon() {
      applyCoupon(this.couponCode)
        .then((res) => {
          this.final_total = res.data.data.final_total;
          this.alert.msg = 'Coupon applied successfully!';
          this.alert.state = true;
          this.sendMsg();
        }).catch(() => {
          this.alert.msg = 'Failed to apply coupon!';
          this.alert.state = false;
          this.sendMsg();
          this.couponCode = '';
        });
    },
    goShop() {
      this.$router.push('/products');
    },
    updateCart(item, action) {
      if (this.loadingItem === item.id) return;
      this.loadingItem = item.id;
      this.editCart(item, action)
        .finally(() => {
          this.loadingItem = '';
        });
    },
    removeCartItem(id) {
      if (this.loadingItem === id) return;
      this.loadingItem = id;
      this.delCartItem(id)
        .finally(() => {
          this.loadingItem = '';
        });
    },
  },
  mixins: [cartMixin],
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
