import { mount, flushPromises } from '@vue/test-utils';
import Article from '@/views/admin/Article.vue';
import { getArticles, getArticle } from '@/scripts/api.js';

vi.mock('@/scripts/api.js', () => ({
  getArticles: vi.fn(),
  getArticle: vi.fn(),
}));

// Create spy references outside stubs
const articleModalOpenSpy = vi.fn();
const delModalOpenSpy = vi.fn();

const ArticleModal = {
  template: '<div class="article-modal-stub"></div>',
  methods: {
    openModal: articleModalOpenSpy,
  },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: {
    openModal: delModalOpenSpy,
  },
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

describe('Article.vue', () => {
  let wrapper;
 const mockArticles = [
    {
      id: 'a1',
      title: 'News Article 1',
      tag: ['Tech', 'News'],
      author: 'Admin',
      isPublic: true,
      create_at: 1678888888,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    articleModalOpenSpy.mockClear();
    delModalOpenSpy.mockClear();
    getArticles.mockResolvedValue({
      data: {
        articles: mockArticles,
        pagination: { total_pages: 1 },
      },
    });
    getArticle.mockResolvedValue({
      data: { article: mockArticles[0] }
    });

    wrapper = mount(Article, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: { ArticleModal, DelModal, Pagination, Loading },
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

  it('renders article list', async () => {
    await flushPromises();
    expect(wrapper.text()).toContain('News Article 1');
    expect(wrapper.text()).toContain('Admin');
    expect(wrapper.text()).toContain('Tech');
  });

  it('opens new article modal', async () => {
    await flushPromises();
    const button = wrapper.find('.bg-secondary');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(articleModalOpenSpy).toHaveBeenCalled();
    expect(wrapper.vm.isNew).toBe(true);
  });

  it('opens edit modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const editBtn = wrapper.find('button[title="Edit"]');
    await editBtn.trigger('click');
    
    expect(wrapper.vm.isNew).toBe(false);
    expect(articleModalOpenSpy).toHaveBeenCalled();
    expect(getArticle).toHaveBeenCalledWith('a1');
  });

  it('opens view modal in demo mode', async () => {
    wrapper.vm.isDemo = true;
    await wrapper.vm.$nextTick();
    await flushPromises();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    await viewBtn.trigger('click');

    expect(articleModalOpenSpy).toHaveBeenCalled();
  });
});
