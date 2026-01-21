<template>
  <main class="bg-white w-full min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-end mb-6">
        <button
          type="button"
          class="inline-block bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-bold shadow-sm"
          @click.prevent="modalToggle('new')"
        >
          Add new coupon
        </button>
      </div>
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full table-auto text-center">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th scope="col" class="py-3 px-6">
                Title
              </th>
              <th scope="col" class="py-3 px-6">
                Discount
              </th>
              <th scope="col" class="py-3 px-6">
                Expired date
              </th>
              <th scope="col" class="py-3 px-6">
                Enable
              </th>
              <th scope="col" class="py-3 px-6">
                Edit coupon
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="coupon in coupons.coupons"
              :key="coupon.id"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap font-medium">{{ coupon.title }}</td>
              <td class="py-3 px-6">{{ coupon.percent }}% off</td>
              <td class="py-3 px-6">{{ $filters.date(coupon.due_date) }}</td>
              <td class="py-3 px-6" v-if="coupon.is_enabled">
                <span class="text-green-500 font-bold">
                  <BIconCheckCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6" v-else>
                <span class="text-gray-400">
                  <BIconXCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6">
                <div class="flex item-center justify-center gap-4">
                  <a
                    href="#"
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('edit', coupon)"
                    title="Edit"
                  >
                    <BIconPen class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="transform hover:text-red-500 hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('del', coupon)"
                    title="Delete"
                  >
                    <BIconTrash class="w-5 h-5" />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 flex justify-center">
        <Pagination
          :pagination="coupons.pagination"
          @send-request="getCoupons"
        />
      </div>
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
import { getCoupons, delCoupon } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';
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
