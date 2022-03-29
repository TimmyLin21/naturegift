<template>
  <main class="bg-light w-100">
    <div class="container py-4">
      <div class="d-flex justify-content-end mb-4">
        <button
          class="btn btn-secondary text-white"
          @click.prevent="modalToggle('new')"
        >
          Add new coupon
        </button>
      </div>
      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr class="table-secondary text-secondary align-middle">
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Discount
              </th>
              <th scope="col">
                Expired date
              </th>
              <th scope="col">
                Enable
              </th>
              <th scope="col">
                Edit coupon
              </th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr
              v-for="coupon in coupons.coupons"
              :key="coupon.id"
            >
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.percent }}% off</td>
              <td>{{ $filters.date(coupon.due_date) }}</td>
              <td v-if="coupon.is_enabled">
                <BIconCheckCircle />
              </td>
              <td v-else>
                <BIconXCircle />
              </td>
              <td>
                <a
                  href="#"
                  class="link-success me-3"
                  @click.prevent="modalToggle('edit', coupon)"
                >
                  <BIconPen />
                </a>
                <a
                  href="#"
                  class="link-danger"
                  @click.prevent="modalToggle('del', coupon)"
                >
                  <BIconTrash />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :pagination="coupons.pagination"
        @send-request="getCoupons"
      />
    </div>
  </main>
  <!-- Modal -->
  <DelModal
    ref="delModal"
    @del-item="delCoupon"
    :item="cacheCoupon"
  >
    Coupon
  </DelModal>
  <CouponModal
    ref="couponModal"
    @send-request="getCoupons"
    :coupon="cacheCoupon"
    :state="isNew"
  />
</template>

<script>
import { getCoupons, delCoupon } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/admin/DelModal.vue';
import CouponModal from '@/components/admin/CouponModal.vue';

export default {
  data() {
    return {
      coupons: '',
      cacheCoupon: '',
      isNew: true,
    };
  },
  components: { Pagination, DelModal, CouponModal },
  methods: {
    getCoupons(page) {
      this.sendLoadingState(true);
      getCoupons(page)
        .then((res) => {
          this.sendLoadingState(false);
          this.coupons = res.data;
        })
        .catch(() => {
          this.sendLoadingState(false);
          this.alert.msg = 'Fail to get the coupons';
          this.alert.state = false;
          this.sendMsg();
        });
    },
    delCoupon() {
      delCoupon(this.cacheCoupon.id)
        .then((res) => {
          this.alert.msg = res.data.message;
          this.alert.state = true;
          this.$refs.delModal.closeModal();
          this.sendMsg();
          this.getCoupons();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.$refs.delModal.closeModal();
          this.sendMsg();
        });
    },
    modalToggle(modal, item) {
      if (modal === 'edit') {
        this.cacheCoupon = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        this.$refs.couponModal.openModal();
      } else if (modal === 'del') {
        this.cacheCoupon = JSON.parse(JSON.stringify(item));
        this.$refs.delModal.openModal();
      } else if (modal === 'new') {
        this.cacheCoupon = {
          is_enabled: 1,
          due_date: this.currentTime,
        };
        this.isNew = true;
        this.$refs.couponModal.openModal();
      }
    },
  },
  created() {
    this.getCoupons();
    this.$emitter.on('send-request', (page) => {
      this.getCoupons(page);
    });
  },
  computed: {
    currentTime() {
      return Math.floor(new Date().getTime() / 1000);
    },
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
