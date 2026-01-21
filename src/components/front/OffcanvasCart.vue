<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[100] bg-black bg-opacity-50 transition-opacity"
    @click.self="closeCart"
  >
    <div class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-[101] overflow-y-auto transform transition-transform duration-300 ease-in-out">
      <div class="flex items-center justify-between p-4 border-b border-primary">
        <h5 class="text-xl font-bold mb-0">
          My cart
        </h5>
        <button
          type="button"
          class="text-2xl leading-none hover:text-gray-500"
          @click="closeCart"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div class="p-4">
        <template v-if="carts.length < 1">
          <p class="text-2xl font-bold mt-8 mb-2">
            Your cart is empty
          </p>
          <p class="block mb-8 text-gray-500">
            Looks like you haven't made a choice
          </p>
          <button
            class="btn btn-secondary w-1/2"
            @click="goShop"
          >
            Shop now
          </button>
        </template>
        <template v-else>
          <ul class="pl-0 mb-4">
            <li
              class="mb-4 pb-4 border-b list-none"
              v-for="item in carts"
              :key="item.id"
            >
              <div class="flex justify-between items-center mb-2">
                <p class="mb-0 font-bold">
                  {{ item.product.title }}
                </p>
                <a
                  href="#"
                  class="text-red-500 hover:text-red-700"
                  @click.prevent="delCartItem(item.id)"
                >
                  <BIconTrash />
                </a>
              </div>
              <div class="flex items-center">
                <div class="w-24 flex-shrink-0 overflow-hidden">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    class="w-[80px] h-[80px] object-cover object-center rounded"
                  >
                </div>
                <div class="flex-grow flex justify-center px-2">
                  <div class="flex items-center gap-2 relative">
                    <div v-if="loadingItem === item.id" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 font-bold text-xs">
                      <font-awesome-icon icon="spinner" spin />
                    </div>
                    <button 
                      @click="updateCart(item, '-')" 
                      :disabled="item.qty <= 1 || loadingItem === item.id"
                      class="text-secondary text-2xl leading-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-6 h-6"
                    >
                      <BIconDashCircle />
                    </button>
                    <input
                      class="w-12 text-center border-0 p-0 focus:ring-0 font-bold bg-gray-100 rounded border border-gray-200 h-6 leading-none text-lg"
                      type="number"
                      v-model.number="item.qty"
                      @change="updateCart(item)"
                      :disabled="loadingItem === item.id"
                    >
                    <button @click="updateCart(item, '+')" 
                      :disabled="loadingItem === item.id"
                      class="text-secondary text-2xl leading-none focus:outline-none flex items-center justify-center w-6 h-6 disabled:opacity-50 disabled:cursor-not-allowed">
                      <BIconPlusCircle />
                    </button>
                  </div>
                </div>
                <div class="w-24 text-right flex-shrink-0">
                  <p
                    class="mb-0 font-bold text-lg"
                    v-if="item.total === item.product.origin_price * item.qty"
                  >
                    $ {{ item.total }}
                  </p>
                  <template v-else>
                    <p class="text-xs line-through text-red-500 mb-0 font-bold">
                      $ {{ item.product.origin_price * item.qty }}
                    </p>
                    <p class="mb-0 font-bold text-lg">
                      $ {{ item.total }}
                    </p>
                  </template>
                </div>
              </div>
            </li>
          </ul>
          <div class="flex justify-between items-center mb-4 text-xl">
            <span>Total</span>
            <span class="font-bold text-2xl">$ {{ total }}</span>
          </div>
          <a
            href="#"
            @click.prevent="goCheckout"
            class="inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold w-full block text-center uppercase"
          >Checkout now</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import cartMixin from '@/mixins/cartMixin';

export default {
  data() {
    return {
      isOpen: false,
      loadingItem: '',
    };
  },
  methods: {
    openCart() {
      this.isOpen = true;
    },
    closeCart() {
      this.isOpen = false;
    },
    goCheckout() {
      this.closeCart();
      this.$router.push('/checkout');
    },
    emit() {
      this.$emit('getQuantity', this.carts.length);
    },
    goShop() {
      this.closeCart();
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
  },
  watch: {
    carts() {
      this.emit();
    },
  },
  mixins: [cartMixin],
  emits: ['getQuantity'],
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
