<template>
  <main class="container py-5 mt-100px mt-md-150px">
    <div class="steps mb-7">
      <div class="steps__circle steps__circle-active">
        <BIconCart
          width="2rem"
          height="2rem"
        />
        <div class="steps__text">
          <p>Checkout</p>
        </div>
      </div>
      <div class="steps__circle">
        <BIconCreditCard
          width="2rem"
          height="2rem"
        />
        <div class="steps__text">
          <p>Payment</p>
        </div>
      </div>
      <div class="steps__circle">
        <BIconStar
          width="2rem"
          height="2rem"
        />
        <div class="steps__text">
          <p>Finish</p>
        </div>
      </div>
    </div>
    <div class="row gx-md-5">
      <section class="col-12 col-md-7 mb-4">
        <h2
          class="mb-4"
          :class="{'visually-hidden': carts.length === 0}"
        >
          Your cart
        </h2>
        <template v-if="carts.length > 0">
          <div class="table-responsive mb-5">
            <table
              class="table mb-5"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    colspan="3"
                  >
                    Product
                  </th>
                  <th scope="col">
                    Price
                  </th>
                  <th scope="col">
                    Quantity
                  </th>
                  <th scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in carts"
                  :key="item.id"
                  class="align-middle"
                >
                  <td>
                    <a
                      href="#"
                      class="link-danger"
                      @click.prevent="delCartItem(item.id)"
                    >
                      <BIconTrash />
                    </a>
                  </td>
                  <td width="100px">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="w-100px h-50px object-cover object-position-center"
                    >
                  </td>
                  <td>
                    <p class="mb-0">
                      {{ item.product.title }}
                    </p>
                    <small class="text-start">Size: {{ item.product.unit }}</small>
                  </td>
                  <td>
                    <template v-if="item.product.price !== item.product.origin_price">
                      <p class="mb-0 text-nowrap">
                        <del class="text-danger">NT$ {{ item.product.origin_price }}</del>
                      </p>
                      <p class="mb-0">
                        NT$ {{ item.product.price }}
                      </p>
                    </template>
                    <template v-else>
                      <p class="mb-0">
                        NT$ {{ item.product.origin_price }}
                      </p>
                    </template>
                  </td>
                  <td width="10%">
                    <div class="qty">
                      <span><BIconDashCircle @click="editCart(item, '-')" /></span>
                      <input
                        class="text-center"
                        type="number"
                        v-model.number="item.qty"
                        @change="editCart(item)"
                      >
                      <span><BIconPlusCircle @click="editCart(item, '+')" /></span>
                    </div>
                  </td>
                  <td class="text-nowrap">
                    NT$ {{ item.total }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3">
                    Subtotal
                  </td>
                  <td
                    colspan="3"
                    class="text-end text-danger"
                    v-if="total !== final_total"
                  >
                    <del>NTD$ {{ total }}</del>
                  </td>
                  <td
                    colspan="3"
                    class="text-end"
                    v-else
                  >
                    NTD$ {{ final_total }}
                  </td>
                </tr>
                <tr v-if="total !== final_total">
                  <td
                    colspan="6"
                    class="text-end border-bottom-0"
                  >
                    NTD$ {{ final_total }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Coupon"
              aria-label="Coupon"
              aria-describedby="coupon-apply"
              v-model="couponCode"
            >
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="coupon-apply"
              @click="applyCoupon"
            >
              Apply
            </button>
          </div>
        </template>
        <template v-else>
          <p class="fw-bold h3 mt-7 mb-1">
            Your cart is empty
          </p>
          <p class="d-block mb-5 text-muted mt-5">
            Looks like you haven't made a choice
          </p>
          <button
            class="btn btn-secondary w-25 mb-7"
            @click="goShop"
          >
            Shop now
          </button>
        </template>
      </section>
      <ContactInfo />
    </div>
  </main>
</template>

<script>
import cartMixin from '@/mixins/cartMixin';
import { applyCoupon } from '@/scripts/api';
import ContactInfo from '@/components/front/ContactInfo.vue';

export default {
  data() {
    return {
      couponCode: '',
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
  },
  mixins: [cartMixin],
};
</script>
