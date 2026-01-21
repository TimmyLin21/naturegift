import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import OffcanvasCart from './OffcanvasCart.vue';
import { getCart, editCart, delCartItem } from '@/scripts/api.js';

// Mock API
vi.mock('@/scripts/api.js', () => ({
  getCart: vi.fn(),
  editCart: vi.fn(),
  delCartItem: vi.fn(),
}));

describe('OffcanvasCart.vue', () => {
  let wrapper;
  const mockCarts = [
    {
      id: 'c1',
      product_id: 'p1',
      qty: 1,
      total: 100,
      product: {
        id: 'p1',
        title: 'Product 1',
        imageUrl: 'img1.jpg',
        origin_price: 100,
        price: 100,
      },
      final_total: 100,
    },
    {
      id: 'c2',
      product_id: 'p2',
      qty: 2,
      total: 100, // 50 * 2
      product: {
        id: 'p2',
        title: 'Product 2',
        imageUrl: 'img2.jpg',
        origin_price: 60,
        price: 50,
      },
      final_total: 100,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    getCart.mockResolvedValue({
      data: {
        data: {
          carts: mockCarts,
          total: 200,
          final_total: 200,
        },
      },
    });
    // Default edit/delete success
    editCart.mockResolvedValue({ data: { message: 'Updated' }});
    delCartItem.mockResolvedValue({ data: { message: 'Deleted' }});
  });

  const createWrapper = () => {
    return mount(OffcanvasCart, {
      global: {
        stubs: {
          BIconTrash: true,
          BIconDashCircle: true,
          BIconPlusCircle: true,
          FontAwesomeIcon: true,
          RouterLink: true,
        },
        mocks: {
          $emitter: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
          },
          $router: {
            push: vi.fn(),
          },
        },
      },
    });
  };

  it('renders cart items when opened', async () => {
    wrapper = createWrapper();
    // It calls getCart on created (from mixin)
    await wrapper.vm.$nextTick(); 
    
    // Open the cart
    wrapper.vm.openCart();
    await wrapper.vm.$nextTick();

    const items = wrapper.findAll('li.list-none');
    expect(items.length).toBe(2);
    expect(wrapper.text()).toContain('Product 1');
    expect(wrapper.text()).toContain('$ 200'); // Total
  });

  it('displays empty state when cart is empty', async () => {
    getCart.mockResolvedValueOnce({
      data: {
        data: {
          carts: [],
          total: 0,
          final_total: 0,
        },
      },
    });
    wrapper = createWrapper();
    wrapper.vm.openCart();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // wait for getCart resolution

    expect(wrapper.text()).toContain('Your cart is empty');
    expect(wrapper.findAll('li').length).toBe(0);
  });

  it('updates quantity and shows loading state', async () => {
    wrapper = createWrapper();
    wrapper.vm.openCart();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const inputs = wrapper.findAll('input[type="number"]');
    const firstInput = inputs[0]; // qty 1
    
    // Change value
    await firstInput.setValue(2);
    
    // updateCart is triggered by @change or buttons
    // The test setValue triggers v-model update, but @change might need manual trigger if not native implementation
    // Let's stick to using the + button which calls updateCart directly
    const plusButtons = wrapper.findAll('button.text-secondary.flex.items-center.justify-center');
    // First item + button (index 1, since index 0 is minus)
    // Wait, findAll order depends on DOM. 
    // Item 1: Minus (0), Plus (1)
    // Item 2: Minus (2), Plus (3)
    await plusButtons[1].trigger('click');

    // Loading state should be active for item id 'c1'
    expect(wrapper.vm.loadingItem).toBe('c1');
    expect(wrapper.find('font-awesome-icon-stub[icon="spinner"]').exists()).toBe(true);

    // After promise resolves (editCart mock)
    await wrapper.vm.$nextTick(); // tick for promise resolution inside component
    await wrapper.vm.$nextTick(); // tick for finally block

    expect(editCart).toHaveBeenCalledWith('c1', 2);
    expect(wrapper.vm.loadingItem).toBe('');
  });

  it('deletes an item', async () => {
    wrapper = createWrapper();
    wrapper.vm.openCart();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const deleteLinks = wrapper.findAll('a.text-red-500');
    await deleteLinks[0].trigger('click');

    expect(delCartItem).toHaveBeenCalledWith('c1');
    // Should re-fetch cart
    await wrapper.vm.$nextTick();
    expect(getCart).toHaveBeenCalledTimes(2); // Initial created + after delete
  });
});
