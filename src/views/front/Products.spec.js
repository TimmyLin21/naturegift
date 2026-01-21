import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Products from './Products.vue';
import { getAllProducts, addToCart } from '@/scripts/api.js';

// Mock dependencies
vi.mock('@/scripts/api.js', () => ({
  getAllProducts: vi.fn(),
  addToCart: vi.fn(),
}));

describe('Products.vue', () => {
  let wrapper;
  const mockProducts = [
    { id: '1', title: 'Almonds', price: 100, origin_price: 150, category: 'Nuts', imageUrl: 'img1.jpg', unit: 'bag' },
    { id: '2', title: 'Cashews', price: 200, origin_price: 200, category: 'Nuts', imageUrl: 'img2.jpg', unit: 'bag' },
    { id: '3', title: 'Black Beans', price: 50, origin_price: 50, category: 'Beans', imageUrl: 'img3.jpg', unit: 'kg' },
    { id: '4', title: 'Sale Item', price: 80, origin_price: 100, category: 'Nuts', imageUrl: 'img4.jpg', unit: 'bag' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    getAllProducts.mockResolvedValue({
      data: { products: mockProducts },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createWrapper = () => {
    return mount(Products, {
      global: {
        stubs: {
          SkeletonProduct: true,
          Pagination: true,
          BIconSuitHeartFill: true,
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
          $route: {
            query: {},
          },
        },
      },
    });
  };

  it('renders products correctly', async () => {
    wrapper = createWrapper();
    await wrapper.vm.$nextTick(); // Trigger created hook
    
    // Fast-forward rendering timeout
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    const productItems = wrapper.findAll('li.mb-7');
    expect(productItems.length).toBe(4);
    expect(wrapper.text()).toContain('Almonds');
    expect(wrapper.text()).toContain('Cashews');
  });

  it('filters products by category', async () => {
    wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    // Click 'Beans' category
    const categoryLinks = wrapper.findAll('ul.flex-wrap a');
    const beansLink = categoryLinks.find(link => link.text() === 'Beans');
    await beansLink.trigger('click');

    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    const productItems = wrapper.findAll('li.mb-7');
    expect(productItems.length).toBe(1);
    expect(wrapper.text()).toContain('Black Beans');
    expect(wrapper.text()).not.toContain('Almonds');
  });

  it('filters products by "On Sale"', async () => {
    wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    // Click 'On Sale' category
    const categoryLinks = wrapper.findAll('ul.flex-wrap a');
    const saleLink = categoryLinks.find(link => link.text() === 'On Sale');
    await saleLink.trigger('click');

    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    const productItems = wrapper.findAll('li.mb-7');
    expect(productItems.length).toBe(2); // Almonds and Sale Item have distinct price vs origin_price
    expect(wrapper.text()).toContain('Almonds');
    expect(wrapper.text()).toContain('Sale Item');
  });

  it('sorts products by price (low to high)', async () => {
    wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    // Open sort dropdown logic is internal, we can test the method directly or click interaction
    // Let's call the method directly to simplify dropdown UI state testing
    wrapper.vm.chooseSort('Price: low to high');
    
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    const productItems = wrapper.findAll('li.mb-7');
    // Expected order: Black Beans (50), Sale Item (80), Almonds (100), Cashews (200)
    expect(productItems[0].text()).toContain('Black Beans');
    expect(productItems[1].text()).toContain('Sale Item');
    expect(productItems[3].text()).toContain('Cashews');
  });

  it('adds product to cart', async () => {
    addToCart.mockResolvedValue({ data: { message: 'Success' } });
    wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    // Find "Add to cart" button for first product
    const addToCartBtns = wrapper.findAll('a.inline-block.bg-secondary');
    await addToCartBtns[0].trigger('click');

    expect(addToCart).toHaveBeenCalledWith({
      product_id: '1',
      qty: 1,
    });
    
    // Should emit renewCart
    await wrapper.vm.$nextTick(); // Promise resolution
    expect(wrapper.vm.$emitter.emit).toHaveBeenCalledWith('renewCart');
  });

  it('toggles favorites requires login', async () => {
    // Mock document.cookie to be empty
    Object.defineProperty(document, 'cookie', {
      value: '',
      writable: true,
    });

    wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    // Click heart icon
    const heartIcon = wrapper.find('.text-gray-300'); // top-4 right-4 container
    await heartIcon.trigger('click');

    // Should NOT modify favList in localStorage
    expect(localStorage.getItem('favList')).toBeNull();
    // Should show alert
    expect(wrapper.vm.alert.msg).toBe('You have to login first');
  });
});
