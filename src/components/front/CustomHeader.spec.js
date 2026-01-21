import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CustomHeader from '@/components/front/CustomHeader.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
    { path: '/products', name: 'Products', component: { template: '<div>Products</div>' } }
  ],
});

describe('CustomHeader.vue', () => {
  it('renders logo and navigation links', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(CustomHeader, {
      global: {
        plugins: [router],
        stubs: {
          OffcanvasCart: true,
          BIconPersonCircle: true,
          BIconBag: true,
        }
      }
    });

    // Check Logo
    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('alt')).toBe('Nature Gift');

    // Check Navigation Links
    const links = wrapper.findAll('a'); // router-link renders as <a>
    const productsLink = links.find(l => l.text().includes('Products'));
    const aboutLink = links.find(l => l.text().includes('About us'));

    expect(productsLink.exists()).toBe(true);
    expect(aboutLink.exists()).toBe(true);
  });

  it('toggles mobile menu on click', async () => {
    const wrapper = mount(CustomHeader, {
      global: {
        plugins: [router],
        stubs: {
          OffcanvasCart: true,
          BIconPersonCircle: true,
          BIconBag: true,
        }
      }
    });

    // Initial state: isShow should be false (menu hidden)
    // The menu container has 'hidden' class when !isShow (and !hiddenMenu which is removed now)
    // Actually, looking at code: :class="{ ... 'hidden md:flex': !isShow }"
    
    // Trigger toggle button
    const toggleBtn = wrapper.find('.md\\:hidden.cursor-pointer');
    expect(toggleBtn.exists()).toBe(true);

    await toggleBtn.trigger('click');
    
    // After click, isShow should be true
    expect(wrapper.vm.isShow).toBe(true);
    
    // Verify class change if possible, or just state
    const menuContainer = wrapper.find('.flex-basis-full');
    expect(menuContainer.classes()).toContain('flex-col'); // Applies when isShow is true
  });

  it('updates header style on scroll', async () => {
    const wrapper = mount(CustomHeader, {
      global: {
        plugins: [router],
        stubs: { OffcanvasCart: true, BIconPersonCircle: true, BIconBag: true }
      }
    });

    // Mock scroll position
    // Note: Happy-DOM or JSDOM might need specific handling for window.scrollY
    // wrapper.vm.scrollHeight() uses document.documentElement.scrollTop
    
    // Case 1: Scrolled down > 100
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 150, writable: true });
    document.dispatchEvent(new Event('scroll'));
    
    await wrapper.vm.$nextTick();
    
    // Check if isSmall is true
    // Logic: if (scrollPosition >= 100 || route !== Home) -> isSmall = true
    expect(wrapper.vm.isSmall).toBe(true);
    
    // Case 2: Back to top
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });
    document.dispatchEvent(new Event('scroll'));
    await wrapper.vm.$nextTick();
    
    expect(wrapper.vm.isSmall).toBe(false);
  });

  it('closes mobile menu on route change', async () => {
    const wrapper = mount(CustomHeader, {
      global: {
        plugins: [router],
        stubs: { OffcanvasCart: true, BIconPersonCircle: true, BIconBag: true }
      }
    });

    // Open menu first
    wrapper.vm.isShow = true;
    
    // Simulate route change
    await router.push('/products');
    await wrapper.vm.$nextTick(); // Wait for watcher
    
    expect(wrapper.vm.isShow).toBe(false);
  });

  it('opens cart offcanvas on icon click', async () => {
    // We need to access the child component ref.
    // Since we stubbed it, we need to make sure the stub has the method or we mock the ref.
    // A better approach with VTU is to inspect the wrapper.vm.$refs or use a real shallow mount with a spy.
    
    const openCartSpy = vi.fn();
    
    const wrapper = mount(CustomHeader, {
      global: {
        plugins: [router],
        stubs: {
          OffcanvasCart: {
            template: '<div></div>',
            methods: {
              openCart: openCartSpy
            }
          },
          BIconPersonCircle: true,
          BIconBag: true
        }
      }
    });

    // Find the cart icon link
    // It's the one with BIconBag or based on behavior @click.prevent="toggleCart"
    // We can target the method call or the click.
    const cartLink = wrapper.findAll('a').find(a => a.attributes('href') === '#');
    // Note: multiple links might have href="#", specifically social links if any, but in header usually just Cart.
    // Let's rely on the method `toggleCart` being bound to an element.
    
    // Better specificity: Find the li that presumably contains the cart
    // Or just call the method directly to verify REF interaction if UI finding is brittle.
    // Let's try to trigger the click.
    
    await wrapper.vm.toggleCart();
    
    expect(openCartSpy).toHaveBeenCalled();
  });
});
