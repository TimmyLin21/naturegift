<template>
  <div class="modal fade" tabindex="-1"
  aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-secondary" v-if="state">Add New Coupon</h5>
          <h5 class="modal-title text-secondary" v-else>Edit Coupon</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-6">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title"
              placeholder="Coupon title" v-model="cacheCoupon.title"/>
            </div>
            <div class="col-6">
              <label for="code" class="form-label">Code</label>
              <input type="text" class="form-control" id="code"
              placeholder="Coupon code" v-model="cacheCoupon.code" />
            </div>
            <div class="col-6">
              <label for="due_date" class="form-label">Expired date</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <div class="col-6">
              <label for="discount" class="form-label">Discount</label>
              <input type="number" class="form-control" id="discount" min="0"
              placeholder="Coupon discount" v-model.number="cacheCoupon.percent" />
            </div>
            <hr class="mb-0">
            <div class="col">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" v-model="cacheCoupon.is_enabled"
                id="couponEnabledSwitch" :checked="cacheCoupon.is_enabled === 1"
                :true-value="1" :false-value="0" />
                <label class="form-check-label" for="couponEnabledSwitch">
                  Enable coupon
                </label>
              </div>
            </div>
          </form>
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
import { addNewCoupon, editCoupon } from '@/scripts/api';

export default {
  data() {
    return {
      cacheCoupon: {},
      due_date: 0,
    };
  },
  props: ['coupon', 'state'],
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
};
</script>
