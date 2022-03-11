<template>
  <main class="container py-5">
    <div class="steps mb-7">
      <div class="steps__circle steps__circle-done">
        <BIconCart width="2rem" height="2rem"></BIconCart>
        <div class="steps__text">
          <p>Checkout</p>
        </div>
      </div>
      <div class="steps__circle steps__circle-active">
        <BIconCreditCard width="2rem" height="2rem"></BIconCreditCard>
        <div class="steps__text">
          <p>Payment</p>
        </div>
      </div>
      <div class="steps__circle">
        <BIconStar width="2rem" height="2rem"></BIconStar>
        <div class="steps__text">
          <p>Finish</p>
        </div>
      </div>
    </div>
    <div class="row gx-5">
      <section class="col-12 col-md-7 mb-4">
        <h2 class="mb-4">Your cart</h2>
        <table class="table mb-5">
          <thead>
            <tr>
              <th scope="col" colspan="3">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts" :key="item.id" class="align-middle">
              <td>
                <a href="#" class="link-danger" @click.prevent="delCartItem(item.id)">
                  <BIconTrash />
                </a>
              </td>
              <td width="20%">
                <img :src="item.product.imageUrl" :alt="item.product.title" class="img-fluid">
              </td>
              <td>
                <p class="mb-0">{{ item.product.title }}</p>
                <small class="text-start">Size: {{ item.product.unit }}</small>
              </td>
              <td>
                <template v-if="item.product.price">
                  <p class="mb-0">
                    <del class="text-danger">NT$ {{ item.product.origin_price }}</del>
                  </p>
                  <p class="mb-0">NT$ {{ item.product.price }}</p>
                </template>
                <template v-else>
                  <p class="mb-0">NT$ {{ item.product.origin_price }}</p>
                </template>
              </td>
              <td width="10%">
                <div class="qty">
                  <span><BIconDashCircle @click="editCart(item, '-')" /></span>
                  <input class="text-center" type="number" v-model.number="item.qty"
                  @change="editCart(item)">
                  <span><BIconPlusCircle @click="editCart(item, '+')"/></span>
                </div>
              </td>
              <td>
                NT$ {{ item.total }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Subtotal</td>
              <td colspan="3" class="text-end text-danger" v-if="total !== final_total">
                <del>NTD$ {{total}}</del>
              </td>
              <td colspan="3" class="text-end" v-else>
                NTD$ {{final_total}}
              </td>
            </tr>
            <tr v-if="total !== final_total">
              <td colspan="6" class="text-end border-bottom-0">NTD$ {{final_total}}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Coupon"
          aria-label="Coupon" aria-describedby="coupon-apply" v-model="couponCode">
          <button class="btn btn-outline-secondary" type="button" id="coupon-apply"
          @click="applyCoupon">Apply</button>
        </div>
      </section>
      <section class="col-12 col-md-5">
        <h2 class="mb-4">Contact Info</h2>
        <form class="row g-3 text-start mb-4">
          <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control">
          </div>
          <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name">
          </div>
          <div class="col-md-6">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="phone">
          </div>
          <div class="col-12">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address">
          </div>
          <div class="col-12">
            <label for="notes" class="form-label">Notes</label>
            <textarea class="form-control" id="notes" />
          </div>
        </form>
        <a href="#" class="c-btn">
          <span class="c-btn__text">Checkout</span>
        </a>
      </section>
    </div>
  </main>
</template>
<script>
import cartMixin from '@/mixins/cartMixin';
import { applyCoupon } from '@/scripts/api';

export default {
  data() {
    return {
      couponCode: '',
    };
  },
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
  },
  mixins: [cartMixin],
};
</script>
