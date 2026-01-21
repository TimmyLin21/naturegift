import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Product from '@/views/admin/Product.vue';
import { getAdminProducts, delProduct } from '@/scripts/api.js';

// Mock API
vi.mock '@/scripts/api.js', () => ({
  getAdminProducts: vi.fn(),
  delProduct: vi.fn(),
}));

// Mock Child Components
const ProductModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
    closeModal: vi.fn(),
  },
};
const DelModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
    closeModal: vi.fn(),
  },
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
};

describe('Admin Product.vue', () => {
  let wrapper;
  const mockProducts = {
    products: [
      {
        id: 'p1',
        title: 'Product 1',
        category: 'Spices',
        origin_price: 100,
        price: 90,
        unit: 'box',
        is_enabled: 1,
        imageUrl: 'http://example.com/img1.jpg',
      },
      {
        id: 'p2',
        title: 'Product 2',
        category: 'Apples',
        origin_price: 200,
        price: 150,
        unit: 'kg',
        is_enabled: 0,
        imageUrl: 'http://example.com/img2.jpg',
      },
    ],
    pagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getAdminProducts.mockResolvedValue({ data: mockProducts });

    wrapper = mount(Product, {
      global: {
        stubs: {
          ProductModal: ProductModalStub,
          DelModal: DelModalStub,
          Pagination: PaginationStub,
          ...globalMocks.components,
        },
        mixins: [globalMocks.mixins[0]],
        provide: globalMocks.provide,
      },
    });
  });

  it('renders product list correctly', async () => {
    await flushPromises();
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].text()).toContain('Product 1');
    expect(rows[0].text()).toContain('Spices');
    expect(rows[1].text()).toContain('Product 2');
    expect(rows[1].find('.x-icon').exists()).toBe(true);
  });

  it('opens add new modal', async () => {
    await flushPromises();
    const addButton = wrapper.find('button.bg-secondary'); // "Add new product" button
    const productModal = wrapper.findComponent(ProductModalStub);
    
    await addButton.trigger('click');
    expect(wrapper.vm.isNew).toBe(true);
    expect(wrapper.vm.cacheProduct.imagesUrl).toEqual([]);
    expect(productModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens edit modal', async () => {
    await flushPromises();
    const editButtons = wrapper.findAll('button[title="Edit"]');
    const productModal = wrapper.findComponent(ProductModalStub);

    await editButtons[0].trigger('click');
    expect(wrapper.vm.isNew).toBe(false);
    expect(wrapper.vm.cacheProduct.id).toBe('p1');
    expect(productModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens delete modal', async () => {
    await flushPromises();
    const delButtons = wrapper.findAll('button[title="Delete"]');
    const delModal = wrapper.findComponent(DelModalStub);

    await delButtons[0].trigger('click');
    expect(wrapper.vm.cacheProduct.id).toBe('p1');
    expect(delModal.vm.openModal).toHaveBeenCalled();
  });

  it('calls delProduct API when confirmed', async () => {
    await flushPromises();
    delProduct.mockResolvedValue({ data: { message: 'Deleted' } });
    
    // Setup state for delete
    wrapper.vm.cacheProduct = { id: 'p1' };
    
    await wrapper.vm.delProduct();
    expect(delProduct).toHaveBeenCalledWith('p1');
    expect(getAdminProducts).toHaveBeenCalledTimes(2); // Once on mount, once after delete
  });

  it('filters by category', async () => {
    await flushPromises();
    const select = wrapper.find('select');
    await select.setValue('Spices');
    
    expect(getAdminProducts).toHaveBeenCalledWith(1, 'Spices');
  });
});
