import { mount, flushPromises } from '@vue/test-utils';
import Login from '@/views/front/Login.vue';
import { apiUserLogin, apiUserCheck } from '@/scripts/api.js';

// Mock dependencies
jest.mock('@/scripts/api.js');
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
};

// Mock alert/loading mixins since they're global
const alertMixin = {
  data() {
    return {
      alert: { msg: '', state: false },
    };
  },
  methods: {
    sendMsg: jest.fn(),
  },
};

const loadingMixin = {
  methods: {
    sendLoadingState: jest.fn(),
  },
};

describe('Login.vue', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    // Default apiUserCheck failure (not logged in)
    apiUserCheck.mockRejectedValue(new Error('Not logged in'));
    
    wrapper = mount(Login, {
      global: {
        mixins: [alertMixin, loadingMixin],
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          BIconInfoCircleFill: true
        }
      },
    });
  });

  it('renders login form correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Welcome Back!');
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Login to continue');
  });

  it('shows error if inputs are empty', async () => {
    await wrapper.find('a').trigger('click');
    expect(wrapper.vm.alert.msg).toBe('Please enter email and password.');
  });

  it('performs demo login correctly', async () => {
    // Set demo credentials
    await wrapper.find('input[type="email"]').setValue('demo@tech.cc');
    await wrapper.find('input[type="password"]').setValue('demo');
    
    await wrapper.find('a').trigger('click');
    
    // Check loading state
    expect(wrapper.vm.sendLoadingState).toHaveBeenCalledWith(true);
    
    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    expect(localStorage.getItem('isDemo')).toBe('true');
    expect(mockPush).toHaveBeenCalledWith('/admin');
  });

  it('performs standard login correctly', async () => {
    // Mock success login
    apiUserLogin.mockResolvedValue({
      data: {
        token: 'fake-token',
        expired: new Date().getTime() + 10000,
      },
    });

    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('password');
    
    await wrapper.find('a').trigger('click');
    
    await flushPromises();
    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(apiUserLogin).toHaveBeenCalled();
    expect(wrapper.vm.alert.msg).toBe('Login success');
    expect(mockPush).toHaveBeenCalledWith('/admin');
    expect(localStorage.getItem('isDemo')).toBeNull(); // Should be removed
  });

  it('shows error on login failure', async () => {
    apiUserLogin.mockRejectedValue(new Error('Login failed'));

    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('wrong');
    
    await wrapper.find('a').trigger('click');
    
    await flushPromises();

    expect(wrapper.vm.alert.msg).toBe('Please check your email and password');
  });

  it('toggles demo info tooltip', async () => {
    const toggleBtn = wrapper.find('button.flex.items-center');
    expect(toggleBtn.exists()).toBe(true);
    
    // Initially hidden
    expect(wrapper.find('.absolute.bottom-full').exists()).toBe(false);
    
    // Click toggle
    await toggleBtn.trigger('click');
    expect(wrapper.find('.absolute.bottom-full').exists()).toBe(true);
    expect(wrapper.text()).toContain('demo@tech.cc');
  });
});
