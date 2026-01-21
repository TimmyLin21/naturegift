import { mount, flushPromises } from '@vue/test-utils';
import Product from '@/views/admin/Product.vue';
import { getAdminProducts } from '@/scripts/api.js';

// Mock API
vi.mock('@/scripts/api.js', () => ({
  getAdminProducts: vi.fn(),
}));

// Mock child components
const productModalOpenSpy = vi.fn();
const delModalOpenSpy = vi.fn();

const Pagination = {
  template: '<div class="pagination-stub" @click="$emit(\'get-products\', 2)"></div>',
  props: ['pages'],
};

const ProductModal = {
  template: '<div class="product-modal-stub"></div>',
  methods: {
    openModal: productModalOpenSpy,
  },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: {
    openModal: delModalOpenSpy,
  },
};

const Loading = {
  template: '<div class="loading-stub"></div>',
};

// Mock alert/loading mixins
const alertMixin = {
  data() {
    return {
      alert: { msg: '', state: false },
    };
  },
  methods: {
    sendMsg: vi.fn(),
  },
};

const loadingMixin = {
  methods: {
    sendLoadingState: vi.fn(),
  },
};

describe('Product.vue', () => {
  let wrapper;
  const mockProducts = [
    {
      id: 'p1',
      title: 'Test Product 1',
      category: 'Category A',
      origin_price: 100,
      price: 80,
      is_enabled: 1,
    },
    {
      id: 'p2',
      title: 'Test Product 2',
      category: 'Category B',
      origin_price: 200,
      price: 150,
      is_enabled: 0,
    },
  ];

  const mockPagination = {
    total_pages: 5,
    current_page: 1,
    has_pre: false,
    has_next: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    productModalOpenSpy.mockClear();
    delModalOpenSpy.mockClear();
    getAdminProducts.mockResolvedValue({
      data: {
        products: mockProducts,
        pagination: mockPagination,
      },
    });

    wrapper = mount(Product, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: {
          Pagination,
          ProductModal,
          DelModal,
          Loading,
        },
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
      },
    });
  });

  it('renders product list correctly', async () => {
    await flushPromises();
    expect(wrapper.findAll('tbody tr').length).toBe(2);
    expect(wrapper.text()).toContain('Test Product 1');
    expect(wrapper.text()).toContain('Category A');
    expect(wrapper.text()).toContain('Enable');
  });

  it('fetches products on mount', () => {
    expect(getAdminProducts).toHaveBeenCalledWith(undefined, undefined);
  });

  it('handles pagination', async () => {
    await flushPromises();
    wrapper.vm.getProducts(2, 'Category A');
    expect(getAdminProducts).toHaveBeenCalledWith(2, 'Category A');
  });

  it('opens edit modal', async () => {
    await flushPromises();
    // Simulate non-demo mode
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const editBtn = wrapper.find('button[title="Edit"]');
    await editBtn.trigger('click');

    expect(productModalOpenSpy).toHaveBeenCalled();
    expect(wrapper.vm.isNew).toBe(false);
  });

  it('opens delete modal', async () => {
    await flushPromises();
    // Simulate non-demo mode
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const delBtn = wrapper.find('button[title="Delete"]');
    await delBtn.trigger('click');

    expect(delModalOpenSpy).toHaveBeenCalled();
  });

  it('opens view modal in demo mode', async () => {
    // Enable demo mode
    wrapper.vm.isDemo = true;
    await wrapper.vm.$forceUpdate(); 
    await wrapper.vm.$nextTick();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    
    // Edit/Delete should be hidden
    expect(wrapper.find('button[title="Edit"]').exists()).toBe(false);

    await viewBtn.trigger('click');
    expect(productModalOpenSpy).toHaveBeenCalled();
  });
});
