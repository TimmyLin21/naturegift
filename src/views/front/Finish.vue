<template>
  <main class="container py-5 mt-150px">
    <div class="steps mb-7">
      <div class="steps__circle steps__circle-done">
        <BIconCart
          width="2rem"
          height="2rem"
        />
        <div class="steps__text">
          <p>Checkout</p>
        </div>
      </div>
      <div class="steps__circle steps__circle-done">
        <BIconCreditCard
          width="2rem"
          height="2rem"
        />
        <div class="steps__text">
          <p>Payment</p>
        </div>
      </div>
      <div class="steps__circle steps__circle-active">
        <BIconStar
          width="2rem"
          height="2rem"
        />
        <div class="steps__text">
          <p>Finish</p>
        </div>
      </div>
    </div>
    <div class="row g-md-5">
      <div class="col-md-5 pt-md-7 mb-5">
        <div class="bg-primary shadow-lg p-3 mx-auto">
          <h2 class="mb-4">
            Thank you <br> for your purchase!
          </h2>
          <router-link
            to="/"
            class="btn btn-outline-success me-sm-3 me-2"
          >
            Go to Home
          </router-link>
          <router-link
            to="/products"
            class="btn btn-secondary"
          >
            Keep shopping
          </router-link>
        </div>
      </div>
      <section class="col-12 col-md-7 mb-4">
        <div class="c-table">
          <h2 class="text-white py-3">
            Order Info
          </h2>
          <div class="c-table__body">
            <p>
              <span class="fw-bold">Date:</span>
              <span>{{ $filters.date(order.create_at) }}</span>
            </p>
            <p class="d-none d-sm-flex">
              <span class="fw-bold text-start">Track Number:</span>
              <span class="text-wrap">{{ order.id }}</span>
            </p>
            <p class="d-sm-none border-bottom-0 mb-0">
              <span class="fw-bold text-start">Track Number:</span>
              <span />
            </p>
            <p class="d-sm-none">
              <span />
              <span class="text-end">{{ order.id }}</span>
            </p>
            <p><span class="fw-bold">Customer Name:</span><span>{{ order.user.name }}</span></p>
            <p><span class="fw-bold">Contact Number:</span><span>{{ order.user.tel }}</span></p>
            <p><span class="fw-bold">Email:</span><span>{{ order.user.email }}</span></p>
            <p><span class="fw-bold">Address:</span><span>{{ order.user.address }}</span></p>
            <p class="mb-0">
              <span class="fw-bold">Subtotal:</span>
              <span>{{ order.total }}</span>
            </p>
            <p class="fw-bold mb-0 border-bottom-0">
              <span class="fw-bold mt-3">Order Items</span>
              <span>
                <BIconCaretDownFill
                  class="fs-3 mt-3 mt-md-2 link-secondary cursor-pointer"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  :class="{'rotate-180': isRotate, 'mb-md-1': isRotate}"
                  @click="isRotate = !isRotate"
                />
              </span>
            </p>
            <div
              id="collapseOne"
              class="accordion-collapse collapse mt-3"
            >
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        colspan="2"
                      >
                        Product
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
                      v-for="item in order.products"
                      :key="item.id"
                      class="align-middle"
                    >
                      <td width="100px">
                        <img
                          :src="item.product.imageUrl"
                          :alt="item.product.title"
                          class="w-100px object-cover object-position-center h-100px"
                        >
                      </td>
                      <td>
                        {{ item.product.title }}
                      </td>
                      <td>
                        {{ item.qty }}
                      </td>
                      <td
                        class="text-nowrap"
                        v-if="item.total === item.final_total"
                      >
                        NT$ {{ item.total }}
                      </td>
                      <td
                        v-else
                      >
                        <span class="text-decoration-line-through text-danger text-nowrap">
                          NT$ {{ item.total }}
                        </span>
                        NT$ {{ item.final_total }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { getOrder, postPay } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';

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
