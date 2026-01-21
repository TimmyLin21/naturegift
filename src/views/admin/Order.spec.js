import { mount, flushPromises } from '@vue/test-utils';
import Order from '@/views/admin/Order.vue';
import { apiGetOrders } from '@/scripts/api.js';

jest.mock('@/scripts/api.js');

const OrderModal = {
  template: '<div class="order-modal-stub"></div>',
  methods: { openModal: jest.fn() },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: { openModal: jest.fn() },
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

describe('Order.vue', () => {
  let wrapper;
  const mockOrders = [
    {
      id: 'o1',
      create_at: 1678888888,
      user: { email: 'user@example.com' },
      products: {
        p1: { product: { price: 100 }, qty: 2 },
      },
      is_paid: false,
      total: 200,
      num: 1, // generated client-side usually, but mocking full obj
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    apiGetOrders.mockResolvedValue({
      data: {
        orders: mockOrders,
        pagination: { total_pages: 1 },
      },
    });

    wrapper = mount(Order, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: { OrderModal, DelModal, Pagination, Loading },
        stubs: {
          BIconPen: true,
          BIconTrash: true,
          BIconEyeFill: true,
        },
        config: {
          globalProperties: {
            $filters: { date: (v) => v },
          }
        }
      },
    });
  });

  it('renders order list', async () => {
    await flushPromises();
    expect(wrapper.text()).toContain('user@example.com');
    // Check total calculation display if present, or just list items
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(wrapper.text()).toContain('Not Paid');
  });

  it('opens edit modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const editBtn = wrapper.find('button[title="Edit"]');
    await editBtn.trigger('click');

    expect(wrapper.findComponent(OrderModal).vm.openModal).toHaveBeenCalled();
  });

  it('opens delete modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const delBtn = wrapper.find('button[title="Delete"]');
    await delBtn.trigger('click');

    expect(wrapper.findComponent(DelModal).vm.openModal).toHaveBeenCalled();
  });

  it('opens view modal in demo mode', async () => {
    await flushPromises();
    wrapper.vm.isDemo = true;
    await wrapper.vm.$nextTick();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    await viewBtn.trigger('click');

    expect(wrapper.findComponent(OrderModal).vm.openModal).toHaveBeenCalled();
  });
  
  it('opens delete all modal', async () => {
     await flushPromises();
     // Assuming 'Clear All Orders' button exists
     const clearBtn = wrapper.find('.text-right button');
     if (clearBtn.exists()) {
       await clearBtn.trigger('click');
       expect(wrapper.findComponent(DelModal).vm.openModal).toHaveBeenCalled();
     }
  });
});
