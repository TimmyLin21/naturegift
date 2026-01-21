import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Article from '@/views/admin/Article.vue';
import { getArticles, getArticle, delArticle } from '@/scripts/api.js';

// Mock API
vi.mock('@/scripts/api.js', () => ({
  getArticles: vi.fn(),
  getArticle: vi.fn(),
  delArticle: vi.fn(),
}));

// Mock Child Components
const ArticleModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
    closeModal: vi.fn(),
  },
  props: ['article', 'state'],
};
const DelModalStub = {
  template: '<div></div>',
  methods: {
    openModal: vi.fn(),
    closeModal: vi.fn(),
  },
  props: ['item'],
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
  config: {
    globalProperties: {
      $filters: {
        date: (val) => new Date(val * 1000).toLocaleDateString(),
      },
    }
  }
};

describe('Admin Article.vue', () => {
  let wrapper;
  const mockArticles = {
    articles: [
      {
        id: 'a1',
        title: 'Article 1',
        author: 'John Doe',
        create_at: 1678888888,
        isPublic: true,
        tag: ['News'],
      },
      {
        id: 'a2',
        title: 'Article 2',
        author: 'Jane Doe',
        create_at: 1679999999,
        isPublic: false,
        tag: ['Updates'],
      },
    ],
    pagination: {
      total_pages: 1,
      current_page: 1,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getArticles.mockResolvedValue({ data: mockArticles });
    getArticle.mockResolvedValue({ data: { article: mockArticles.articles[0] } });

    wrapper = mount(Article, {
      global: {
        stubs: {
          ArticleModal: ArticleModalStub,
          DelModal: DelModalStub,
          Pagination: PaginationStub,
          ...globalMocks.components,
        },
        mixins: [globalMocks.mixins[0]],
        provide: globalMocks.provide,
        mocks: {
          $filters: globalMocks.config.globalProperties.$filters,
        },
      },
    });
  });

  it('renders article list correctly', async () => {
    await flushPromises();
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].text()).toContain('Article 1');
    expect(rows[0].text()).toContain('John Doe');
    expect(rows[0].find('.check-icon').exists()).toBe(true);
    
    expect(rows[1].text()).toContain('Article 2');
    expect(rows[1].find('.x-icon').exists()).toBe(true);
  });

  it('opens add new modal', async () => {
    await flushPromises();
    const addButton = wrapper.find('button.bg-secondary');
    const articleModal = wrapper.findComponent(ArticleModalStub);
    
    await addButton.trigger('click');
    expect(wrapper.vm.isNew).toBe(true);
    expect(articleModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens edit modal after fetching data', async () => {
    await flushPromises();
    const editButtons = wrapper.findAll('a[title="Edit"]');
    const articleModal = wrapper.findComponent(ArticleModalStub);

    await editButtons[0].trigger('click');
    // It calls getArticle first
    expect(getArticle).toHaveBeenCalledWith('a1');
    await flushPromises(); // Wait for promise chain
    
    expect(articleModal.vm.openModal).toHaveBeenCalled();
  });

  it('opens delete modal after fetching data', async () => {
    await flushPromises();
    const delButtons = wrapper.findAll('a[title="Delete"]');
    const delModal = wrapper.findComponent(DelModalStub);

    await delButtons[0].trigger('click');
    expect(getArticle).toHaveBeenCalledWith('a1');
    await flushPromises();
    
    expect(delModal.vm.openModal).toHaveBeenCalled();
  });

  it('calls delArticle API when confirmed', async () => {
    await flushPromises();
    delArticle.mockResolvedValue({ data: { message: 'Deleted' } });
    
    wrapper.vm.cacheArticle = { id: 'a1' };
    
    await wrapper.vm.delArticle();
    expect(delArticle).toHaveBeenCalledWith('a1');
    expect(getArticles).toHaveBeenCalledTimes(2);
  });
});
