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
          BIconArrowRight: true,
          BIconChevronDown: true,
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
});
