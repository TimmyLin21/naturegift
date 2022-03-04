<template>
  <div class="modal fade" tabindex="-1"
  aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-secondary">Edit Order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-lg-4">
              <h3>Customer Info</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">Name</th>
                    <td>{{ cacheOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ cacheOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{{ cacheOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{{ cacheOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12 col-lg-8">
              <h3>Order Detail</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">Tracking number</th>
                    <td>{{ cacheOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>Ordered time</th>
                    <td>{{ $filters.date(cacheOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>Paid time</th>
                    <td>
                      <span v-if="cacheOrder.paid_date">
                        {{ $filters.date(cacheOrder.paid_date) }}
                      </span>
                      <span v-else> - </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Paid statement</th>
                    <td>
                      <strong v-if="cacheOrder.is_paid" class="text-success"
                        >Paid</strong
                      >
                      <span v-else class="text-muted">Unpaid</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>
                      {{ $filters.currency(cacheOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12">
              <h3>Order items</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="product in cacheOrder.products" :key="product.id">
                    <th>
                      {{ product.product.title }}
                    </th>
                    <td>{{ product.product.unit }} x {{ product.qty }} </td>
                    <td class="text-end">
                      {{ $filters.currency(product.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch"
                  id="isPaidSwitch" v-model="cacheOrder.is_paid" :checked="cacheOrder.is_paid"/>
                  <label class="form-check-label" for="isPaidSwitch">
                    <span v-if="cacheOrder.is_paid">Paid</span>
                    <span v-else>Unpaid</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary text-secondary" @click="saveChange">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
import alertMixin from '@/mixins/alertMixin';
import productTab from '@/mixins/productTab';
import { editOrder } from '@/scripts/api';

export default {
  data() {
    return {
      cacheOrder: {
        imagesUrl: [],
        user: {},
      },
    };
  },
  props: ['order'],
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
          this.closeModal();
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
  mixins: [modalMixin, alertMixin, productTab],
};
</script>
