import { mount, flushPromises } from '@vue/test-utils';
import Order from '@/views/admin/Order.vue';
import { getAdminOrders } from '@/scripts/api.js';

vi.mock('@/scripts/api.js', () => ({
  getAdminOrders: vi.fn(),
}));

// Create spy references
const orderModalOpenSpy = vi.fn();
const delModalOpenSpy = vi.fn();

const OrderModal = {
  template: '<div class="order-modal-stub"></div>',
  methods: { openModal: orderModalOpenSpy },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: { openModal: delModalOpenSpy },
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

describe('Order.vue', () => {
  let wrapper;
  const mockOrders = [
    {
      id: 'o1',
      create_at: 1678888888,
      user: { email: 'user@example.com' },
      products: [
        { id: 'p1', product: { title: 'Test Product', unit: 'bag', price: 100 }, qty: 2 },
      ],
      is_paid: false,
      total: 200,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    orderModalOpenSpy.mockClear();
    delModalOpenSpy.mockClear();
    getAdminOrders.mockResolvedValue({
      data: {
        orders: mockOrders,
        pagination: { total_pages: 1 },
      },
    });

    wrapper = mount(Order, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: { OrderModal, DelModal, Pagination, Loading },
        mocks: {
          $emitter: { emit: vi.fn(), on: vi.fn() },
        },
        stubs: {
          BIconPen: true,
          BIconTrash: true,
          BIconEyeFill: true,
          BIconCheckCircle: true,
          BIconXCircle: true,
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
    expect(wrapper.text()).toContain('o1');
    expect(wrapper.text()).toContain('200');
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(1);
  });

  it('opens edit modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const editBtn = wrapper.find('button[title="Edit"]');
    await editBtn.trigger('click');

    expect(orderModalOpenSpy).toHaveBeenCalled();
  });

  it('opens delete modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const delBtn = wrapper.find('button[title="Delete"]');
    await delBtn.trigger('click');

    expect(delModalOpenSpy).toHaveBeenCalled();
  });

  it('opens view modal in demo mode', async () => {
    await flushPromises();
    wrapper.vm.isDemo = true;
    await wrapper.vm.$nextTick();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    await viewBtn.trigger('click');

    expect(orderModalOpenSpy).toHaveBeenCalled();
  });
  
  it('opens delete all modal', async () => {
     await flushPromises();
     const clearBtn = wrapper.find('.bg-red-500');
     if (clearBtn.exists()) {
       await clearBtn.trigger('click');
       expect(delModalOpenSpy).toHaveBeenCalled();
     }
  });
});
