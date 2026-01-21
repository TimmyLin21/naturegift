import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Order from '@/views/admin/Order.vue';
import { getAdminOrders, delOrder, delAllOrders } from '@/scripts/api.js';

// Mock API
vi.mock('@/scripts/api.js', () => ({
  getAdminOrders: vi.fn(),
  delOrder: vi.fn(),
  delAllOrders: vi.fn(),
}));

// Mock Child Components
const OrderModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
  },
  props: ['order'],
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

describe('Admin Order.vue', () => {
  let wrapper;
  const mockOrders = {
    orders: [
      {
        id: 'o1',
        create_at: 1678888888,
        total: 100,
        is_paid: true,
        products: [
          { id: 'p1', qty: 2, product: { title: 'Apple', unit: 'kg' } }
        ]
      },
      {
        id: 'o2',
        create_at: 1679999999,
        total: 50,
        is_paid: false,
        products: []
      },
    ],
    pagination: {
      total_pages: 1,
      current_page: 1,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getAdminOrders.mockResolvedValue({ data: mockOrders });

    wrapper = mount(Order, {
      global: {
        stubs: {
          OrderModal: OrderModalStub,
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

  it('renders order list correctly', async () => {
    await flushPromises();
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].text()).toContain('o1');
    expect(rows[0].text()).toContain('Apple');
    expect(rows[0].find('.check-icon').exists()).toBe(true);
    
    expect(rows[1].text()).toContain('o2');
    expect(rows[1].find('.x-icon').exists()).toBe(true);
  });

  it('opens edit modal', async () => {
    await flushPromises();
    const editButtons = wrapper.findAll('a[title="Edit"]');
    const orderModal = wrapper.findComponent(OrderModalStub);

    await editButtons[0].trigger('click');
    expect(wrapper.vm.cacheOrder.id).toBe('o1');
    expect(orderModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens delete modal', async () => {
    await flushPromises();
    const delButtons = wrapper.findAll('a[title="Delete"]');
    const delModal = wrapper.findComponent(DelModalStub);

    await delButtons[0].trigger('click');
    expect(wrapper.vm.cacheOrder.id).toBe('o1');
    expect(delModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens delete all modal', async () => {
    await flushPromises();
    const delAllBtn = wrapper.find('button.bg-red-500');
    const delModal = wrapper.findComponent(DelModalStub);
    
    await delAllBtn.trigger('click');
    expect(wrapper.vm.cacheOrder).toEqual({});
    expect(delModal.vm.openModal).toHaveBeenCalled();
  });

  it('calls delOrder API when confirmed', async () => {
    await flushPromises();
    delOrder.mockResolvedValue({ data: { message: 'Deleted' } });
    
    wrapper.vm.cacheOrder = { id: 'o1' };
    
    await wrapper.vm.delOrder();
    expect(delOrder).toHaveBeenCalledWith('o1');
    expect(getAdminOrders).toHaveBeenCalledTimes(2);
  });
  
  it('calls delAllOrders API when confirmed', async () => {
    await flushPromises();
    delAllOrders.mockResolvedValue({ data: { message: 'All Deleted' } });
    
    await wrapper.vm.delAllOrders();
    expect(delAllOrders).toHaveBeenCalled();
    expect(getAdminOrders).toHaveBeenCalledTimes(2);
  });
});
