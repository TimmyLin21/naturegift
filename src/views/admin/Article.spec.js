import { mount, flushPromises } from '@vue/test-utils';
import Article from '@/views/admin/Article.vue';
import { apiGetArticles, apiGetArticle } from '@/scripts/api.js';

jest.mock('@/scripts/api.js');

const ArticleModal = {
  template: '<div class="article-modal-stub"></div>',
  methods: { openModal: jest.fn() },
};

const DelModal = {
  template: '<div class="del-modal-stub"></div>',
  methods: { openModal: jest.fn() },
};

const Pagination = { template: '<div></div>', props: ['pages'] };
const Loading = { template: '<div></div>' };

const alertMixin = {
  data() { return { alert: { msg: '', state: false } }; },
  methods: { sendMsg: jest.fn() },
};

const loadingMixin = {
  methods: { sendLoadingState: jest.fn() },
};

describe('Article.vue', () => {
  let wrapper;
  const mockArticles = [
    {
      id: 'a1',
      title: 'News Article 1',
      author: 'Admin',
      create_at: 1678888888,
      isPublic: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    apiGetArticles.mockResolvedValue({
      data: {
        articles: mockArticles,
        pagination: { total_pages: 1 },
      },
    });
    apiGetArticle.mockResolvedValue({
      data: { article: mockArticles[0] }
    });

    wrapper = mount(Article, {
      global: {
        mixins: [alertMixin, loadingMixin],
        components: { ArticleModal, DelModal, Pagination, Loading },
        stubs: {
          BIconPen: true,
          BIconTrash: true,
          BIconEyeFill: true,
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
    expect(wrapper.text()).toContain('Public');
  });

  it('opens new article modal', async () => {
    await wrapper.find('button.bg-primary').trigger('click');
    const modal = wrapper.findComponent(ArticleModal);
    expect(modal.vm.openModal).toHaveBeenCalled();
    expect(wrapper.vm.isNew).toBe(true);
  });

  it('opens edit modal', async () => {
    await flushPromises();
    wrapper.vm.isDemo = false;
    await wrapper.vm.$nextTick();

    const editBtn = wrapper.find('button[title="Edit"]');
    await editBtn.trigger('click');
    
    // In actual code, it fetches article details first
    await flushPromises();
    
    expect(wrapper.vm.isNew).toBe(false);
    expect(wrapper.findComponent(ArticleModal).vm.openModal).toHaveBeenCalled();
    expect(apiGetArticle).toHaveBeenCalledWith('a1');
  });

  it('opens view modal in demo mode', async () => {
    await flushPromises();
    wrapper.vm.isDemo = true;
    await wrapper.vm.$nextTick();

    const viewBtn = wrapper.find('button[title="View Details"]');
    expect(viewBtn.exists()).toBe(true);
    await viewBtn.trigger('click');

    // Demo mode might pass cache directly instead of fetching
    expect(wrapper.findComponent(ArticleModal).vm.openModal).toHaveBeenCalled();
  });
});
