import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Coupon from '@/views/admin/Coupon.vue';
import { getCoupons, delCoupon } from '@/scripts/api.js';

// Mock API
vi.mock('@/scripts/api.js', () => ({
  getCoupons: vi.fn(),
  delCoupon: vi.fn(),
}));

// Mock Child Components
const CouponModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
    closeModal: vi.fn(),
  },
  props: ['coupon', 'state'],
};
const DelModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
    closeModal: vi.fn(),
  },
  props: ['item'],
};
const PaginationStub = {
  template: '<div></div>',
  props: ['pagination'],
};

// Global Mocks
const mockSendMsg = vi.fn();
const mockSendLoadingState = vi.fn();
const globalMocks = {
  mixins: [
    {
      methods: {
        sendMsg: mockSendMsg,
        sendLoadingState: mockSendLoadingState,
      },
      data() {
        return {
          alert: { msg: '', state: false },
        };
      },
    },
  ],
  provide: {
    emitter: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  },
  components: {
    BIconCheckCircle: { template: '<span class="check-icon"></span>' },
    BIconXCircle: { template: '<span class="x-icon"></span>' },
    BIconPen: { template: '<span class="pen-icon"></span>' },
    BIconTrash: { template: '<span class="trash-icon"></span>' },
  },
  config: {
    globalProperties: {
      $filters: {
        date: (val) => new Date(val * 1000).toLocaleDateString(),
      },
    }
  }
};

describe('Admin Coupon.vue', () => {
  let wrapper;
  const mockCoupons = {
    coupons: [
      {
        id: 'c1',
        title: 'Coupon 1',
        percent: 80,
        due_date: 1678888888,
        is_enabled: 1,
      },
      {
        id: 'c2',
        title: 'Coupon 2',
        percent: 50,
        due_date: 1679999999,
        is_enabled: 0,
      },
    ],
    pagination: {
      total_pages: 1,
      current_page: 1,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getCoupons.mockResolvedValue({ data: mockCoupons });

    wrapper = mount(Coupon, {
      global: {
        stubs: {
          CouponModal: CouponModalStub,
          DelModal: DelModalStub,
          Pagination: PaginationStub,
          ...globalMocks.components,
        },
        mixins: [globalMocks.mixins[0]],
        provide: globalMocks.provide,
        mocks: {
          $filters: globalMocks.config.globalProperties.$filters,
        },
      },
    });
  });

  it('renders coupon list correctly', async () => {
    await flushPromises();
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].text()).toContain('Coupon 1');
    expect(rows[1].text()).toContain('Coupon 2');
    expect(rows[0].find('.check-icon').exists()).toBe(true);
    expect(rows[1].find('.x-icon').exists()).toBe(true);
  });

  it('opens add new modal', async () => {
    await flushPromises();
    const addButton = wrapper.find('button.bg-secondary');
    const couponModal = wrapper.findComponent(CouponModalStub);
    
    await addButton.trigger('click');
    expect(wrapper.vm.isNew).toBe(true);
    expect(couponModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens edit modal', async () => {
    await flushPromises();
    const editButtons = wrapper.findAll('a[title="Edit"]');
    const couponModal = wrapper.findComponent(CouponModalStub);

    await editButtons[0].trigger('click');
    expect(wrapper.vm.isNew).toBe(false);
    expect(wrapper.vm.cacheCoupon.id).toBe('c1');
    expect(couponModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens delete modal', async () => {
    await flushPromises();
    const delButtons = wrapper.findAll('a[title="Delete"]');
    const delModal = wrapper.findComponent(DelModalStub);

    await delButtons[0].trigger('click');
    expect(wrapper.vm.cacheCoupon.id).toBe('c1');
    expect(delModal.vm.openModal).toHaveBeenCalled();
  });

  it('calls delCoupon API when confirmed', async () => {
    await flushPromises();
    delCoupon.mockResolvedValue({ data: { message: 'Deleted' } });
    
    wrapper.vm.cacheCoupon = { id: 'c1' };
    
    await wrapper.vm.delCoupon();
    expect(delCoupon).toHaveBeenCalledWith('c1');
    expect(getCoupons).toHaveBeenCalledTimes(2); // Initial mount + refresh
  });
});
