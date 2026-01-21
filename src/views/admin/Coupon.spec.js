import { mount, flushPromises } from '@vue/test-utils';
import Coupon from '@/views/admin/Coupon.vue';
import { apiGetCoupons } from '@/scripts/api.js';

jest.mock('@/scripts/api.js');

const CouponModal = {
  template: '<div class="coupon-modal-stub"></div>',
  methods: {
    openModal: jest.fn(),
  },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: {
    openModal: jest.fn(),
  },
};

const Pagination = { template: '<div></div>', props: ['pages'] };
const Loading = { template: '<div></div>' };

const alertMixin = {
  data() { return { alert: { msg: '', state: false } }; },
  methods: { sendMsg: jest.fn() },
};

const loadingMixin = {
  methods: { sendLoadingState: jest.fn() },
};

const filters = {
  date: (val) => `Formatted: ${val}`,
};

describe('Coupon.vue', () => {
  let wrapper;
  const mockCoupons = [
    {
      id: 'c1',
      title: 'Summer Sale',
      percent: 80,
      due_date: 1678888888,
      is_enabled: 1,
      code: 'SUMMER23',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    apiGetCoupons.mockResolvedValue({
      data: {
        coupons: mockCoupons,
        pagination: { total_pages: 1, current_page: 1 },
      },
    });

    wrapper = mount(Coupon, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: { CouponModal, DelModal, Pagination, Loading },
        stubs: {
          BIconPen: true,
          BIconTrash: true,
          BIconEyeFill: true,
          BIconXCircle: true,
          BIconCheckCircle: true,
        },
        config: {
          globalProperties: {
            $filters: filters,
          }
        }
      },
    });
  });

  it('renders coupon list', async () => {
    await flushPromises();
    expect(wrapper.text()).toContain('Summer Sale');
    expect(wrapper.text()).toContain('SUMMER23');
    expect(wrapper.text()).toContain('80%');
  });

  it('opens new coupon modal', async () => {
    await wrapper.find('button.bg-primary').trigger('click');
    const modal = wrapper.findComponent(CouponModal);
    expect(modal.vm.openModal).toHaveBeenCalled();
    expect(wrapper.vm.isNew).toBe(true);
  });

  it('opens edit modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const editBtn = wrapper.find('button[title="Edit"]');
    await editBtn.trigger('click');
    
    expect(wrapper.vm.isNew).toBe(false);
    expect(wrapper.vm.cacheCoupon.id).toBe('c1');
    expect(wrapper.findComponent(CouponModal).vm.openModal).toHaveBeenCalled();
  });

  it('opens view modal in demo mode', async () => {
    await flushPromises();
    wrapper.vm.isDemo = true;
    await wrapper.vm.$nextTick();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    await viewBtn.trigger('click');

    expect(wrapper.findComponent(CouponModal).vm.openModal).toHaveBeenCalled();
  });
});
