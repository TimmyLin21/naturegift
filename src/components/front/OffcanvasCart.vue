<template>
  <div
    class="offcanvas offcanvas-end bg-light"
    tabindex="-1"
    id="offcanvasCart"
    ref="offcanvas"
  >
    <div class="offcanvas-header mx-3 mt-2 border-bottom-3px border-primary">
      <h5 class="mb-0">
        My cart
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div class="offcanvas-body mx-3">
      <template v-if="carts.length < 1">
        <p class="fw-bold h3 mt-7 mb-1">
          Your cart is empty
        </p>
        <p class="d-block mb-5 text-muted">
          Looks like you haven't made a choice
        </p>
        <button
          class="btn btn-secondary w-50"
          @click="goShop"
          data-bs-dismiss="offcanvas"
        >
          Shop now
        </button>
      </template>
      <template v-else>
        <ul class="ps-0">
          <li
            class="mb-4 pb-4 border-bottom list-style-none"
            v-for="item in carts"
            :key="item.id"
          >
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-2 fw-bold">
                {{ item.product.title }}
              </p>
              <a
                href="#"
                class="link-danger"
                @click.prevent="delCartItem(item.id)"
              >
                <BIconTrash /></a>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <img
                :src="item.product.imageUrl"
                :alt="item.product.title"
                class="w-25 h-50px object-cover object-position-center"
              >
              <div class="qty">
                <span><BIconDashCircle
                  @click="editCart(item, '-')"
                  class="fs-4 link-secondary"
                /></span>
                <input
                  class="text-center"
                  type="number"
                  v-model.number="item.qty"
                  @change="editCart(item)"
                >
                <span><BIconPlusCircle
                  @click="editCart(item, '+')"
                  class="fs-4 link-secondary"
                /></span>
              </div>
              <p
                class="mb-0 fw-bold"
                v-if="item.total === item.product.origin_price * item.qty"
              >
                $ {{ item.total }}
              </p>
              <template v-else>
                <div class="">
                  <p class="text-decoration-line-through text-danger mb-0 fw-bold">
                    $ {{ item.product.origin_price * item.qty }}
                  </p>
                  <p
                    class="mb-0 fw-bold"
                  >
                    $ {{ item.total }}
                  </p>
                </div>
              </template>
            </div>
          </li>
        </ul>
        <p class="d-flex justify-content-center">
          Total
          <span class="ms-auto fw-bold">$ {{ total }}</span>
        </p>
        <a
          href="#"
          @click.prevent="goCheckout"
          class="btn btn-secondary w-100"
          data-bs-dismiss="offcanvas"
        >Checkout now</a>
      </template>
    </div>
  </div>
</template>

<script>
import cartMixin from '@/mixins/cartMixin';

export default {
  methods: {
    goCheckout() {
      this.$router.push('/checkout');
    },
    emit() {
      this.$emit('getQuantity', this.carts.length);
    },
    goShop() {
      this.$router.push('/products');
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
