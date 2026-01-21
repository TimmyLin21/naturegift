import { mount, flushPromises } from '@vue/test-utils';
import Coupon from '@/views/admin/Coupon.vue';
import { getCoupons } from '@/scripts/api.js';

vi.mock('@/scripts/api.js', () => ({
  getCoupons: vi.fn(),
}));

// Create spy references
const couponModalOpenSpy = vi.fn();
const delModalOpenSpy = vi.fn();

const CouponModal = {
  template: '<div class="coupon-modal-stub"></div>',
  methods: {
    openModal: couponModalOpenSpy,
  },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: {
    openModal: delModalOpenSpy,
  },
};

const Pagination = { template: '<div></div>', props: ['pagination'] };
const Loading = { template: '<div></div>' };

const alertMixin = {
  data() { return { alert: { msg: '', state: false } }; },
  methods: { sendMsg: vi.fn() },
};

const loadingMixin = {
  methods: { sendLoadingState: vi.fn() },
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
    vi.clearAllMocks();
    couponModalOpenSpy.mockClear();
    delModalOpenSpy.mockClear();
    getCoupons.mockResolvedValue({
      data: {
        coupons: mockCoupons,
        pagination: { total_pages: 1, current_page: 1 },
      },
    });

    wrapper = mount(Coupon, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: { CouponModal, DelModal, Pagination, Loading },
        mocks: {
          $emitter: { emit: vi.fn(), on: vi.fn() },
        },
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
    expect(wrapper.text()).toContain('80% off');
  });

  it('opens new coupon modal', async () => {
    await flushPromises();
    const button = wrapper.find('.bg-secondary');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(couponModalOpenSpy).toHaveBeenCalled();
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
    expect(couponModalOpenSpy).toHaveBeenCalled();
  });

  it('opens view modal in demo mode', async () => {
    await flushPromises();
    wrapper.vm.isDemo = true;
    await wrapper.vm.$nextTick();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    await viewBtn.trigger('click');

    expect(couponModalOpenSpy).toHaveBeenCalled();
  });
});
