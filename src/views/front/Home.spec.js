import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Home from '@/views/front/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Mock the components used in Home.vue to isolate testing
// We only need to check if Home renders, not its children deeply
// However, since we want to check for "Nature Gift" text which might be in Hero, 
// we'll try shallowMount or standard mount with stubs.

// Create a mock router to avoid "missing router" errors
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: Home }],
});

describe('Home.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          // Stub out child components to focus on Home's own layout/content
          CategoryList: true,
          OurStory: true,
          Reviews: true,
          Article: true,
          Sub: true,
          // If "Nature Gift" and "Shop Now" are in Home.vue itself, this is fine.
          // If they are in child components like a "Hero" component, we might need to mount that or check stubs.
        }
      }
    });

    // Check if the component exists
    expect(wrapper.exists()).toBe(true);

    // Check for "Shop Now" button text (based on previous knowledge of Home.vue)
    // Note: If the text is inside a child component that is stubbed, this might fail unless we un-stub it.
    // Let's verify standard elements.
    
    // Expectation: The Home page should typically have a main container or a hero section.
    // Based on previous edits, Home.vue usually contains the hero section directly or imports it.
    
    // Let's check for the presence of the main text "Nature Gift" usually found in the Hero section
    // or the "Shop Now" link/button.
    const html = wrapper.html();
    expect(html).toContain('Fresh and Delicious'); 
    expect(html).toContain('SHOP NOW');
  });

  it('renders child components', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          CategoryList: { template: '<div class="stub-category-list"></div>' },
          OurStory: { template: '<div class="stub-our-story"></div>' },
          Reviews: { template: '<div class="stub-reviews"></div>' },
        }
      }
    });

    expect(wrapper.find('.stub-category-list').exists()).toBe(true);
    expect(wrapper.find('.stub-our-story').exists()).toBe(true);
    expect(wrapper.find('.stub-reviews').exists()).toBe(true);
  });

  it('renders background video', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    });
    const video = wrapper.find('video');
    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBeDefined();
  });

  it('navigates to products on SHOP NOW click', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    });

    // Find desktop button (hidden md:flex)
    // Since jsdom/happy-dom doesn't process CSS visibility, both might be found.
    // We target the click handler which is common or specific button.
    const buttons = wrapper.findAll('button');
    const shopNowBtn = buttons.find(b => b.text().includes('SHOP NOW'));
    
    await shopNowBtn.trigger('click');
    expect(pushSpy).toHaveBeenCalledWith('/products');
  });

  it('scrolls down on arrow click', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    });

    // Find the scroll down container by class or action
    // It has @click="scrollDown"
    const scrollIcon = wrapper.find('.absolute.bottom-10');
    
    await scrollIcon.trigger('click');
    expect(pushSpy).toHaveBeenCalledWith({ path: '/', hash: '#CategoryList' });
  });

  it('video has correct background attributes', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    });
    const video = wrapper.find('video');
    expect(video.attributes('autoplay')).toBeDefined();
    expect(video.attributes('loop')).toBeDefined();
    expect(video.attributes('muted')).toBeDefined();
    expect(video.attributes('playsinline')).toBeDefined();
  });

  it('navigates to products on MOBILE SHOP NOW click', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    });

    // Find mobile button specifically by its unique class 'md:hidden'
    const mobileBtn = wrapper.find('button.md\\:hidden');
    expect(mobileBtn.exists()).toBe(true);
    
    await mobileBtn.trigger('click');
    expect(pushSpy).toHaveBeenCalledWith('/products');
  });

  it('matches snapshot', () => {
    // Shallow mount to avoid large snapshots of child components
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          CategoryList: true,
          OurStory: true,
          Reviews: true,
          BIconArrowRight: true,
          BIconChevronDown: true
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has correct responsive text classes', () => {
    const wrapper = mount(Home, { global: { plugins: [router] } });
    const h1 = wrapper.find('h1');
    expect(h1.classes()).toContain('text-4xl');
    expect(h1.classes()).toContain('md:text-5xl');
  });

  it('buttons have hover effects', () => {
    const wrapper = mount(Home, { global: { plugins: [router] } });
    const buttons = wrapper.findAll('button');
    buttons.forEach(btn => {
      const classes = btn.classes();
      expect(classes).toContain('hover:bg-white');
      expect(classes).toContain('hover:text-black');
      expect(classes).toContain('transition-all');
    });
  });

  it('checks video source path', () => {
    const wrapper = mount(Home, { global: { plugins: [router] } });
    const source = wrapper.find('video source');
    // In typical Vite setup, @/ assets resolve to a path path.
    // Exact match might vary depending on build, but we can check it contains the filename.
    expect(source.attributes('src')).toContain('fresh-and-delicious.mp4');
  });
});
