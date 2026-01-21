<template>
  <main class="bg-white w-full min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-end mb-6">
        <button
          type="button"
          class="inline-block bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-bold shadow-sm"
          @click.prevent="modalToggle('new')"
          v-if="!isDemo"
        >
          Add new article
        </button>
      </div>
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full table-auto text-center">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th scope="col" class="py-3 px-6">
                Release date
              </th>
              <th scope="col" class="py-3 px-6">
                Title
              </th>
              <th scope="col" class="py-3 px-6">
                Tag
              </th>
              <th scope="col" class="py-3 px-6">
                Author
              </th>
              <th scope="col" class="py-3 px-6">
                Enable
              </th>
              <th scope="col" class="py-3 px-6">
                Edit article
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="article in articles.articles"
              :key="article.id"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-6">{{ $filters.date(article.create_at) }}</td>
              <td class="py-3 px-6 text-left whitespace-nowrap font-medium">{{ article.title }}</td>
              <td class="py-3 px-6">
                <div class="flex flex-wrap justify-center gap-1">
                  <span
                    class="bg-secondary text-white rounded-full px-3 py-1 text-xs font-bold"
                    v-for="tag in article.tag"
                    :key="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </td>
              <td class="py-3 px-6">{{ article.author }}</td>
              <td class="py-3 px-6" v-if="article.isPublic">
                <span class="text-green-500 font-bold">
                  <BIconCheckCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6" v-else>
                <span class="text-gray-400">
                  <BIconXCircle class="w-5 h-5 inline" />
                </span>
              </td>
              <td class="py-3 px-6">
                <div class="flex item-center justify-center gap-4">
                  <button
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('edit', article)"
                    title="Edit"
                    v-if="!isDemo"
                  >
                    <BIconPen class="w-5 h-5" />
                  </button>
                  <button
                    class="transform hover:text-red-500 hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('del', article)"
                    title="Delete"
                    v-if="!isDemo"
                  >
                    <BIconTrash class="w-5 h-5" />
                  </button>
                  <button
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('view', article)"
                    title="View Details"
                    v-if="isDemo"
                  >
                    <BIconEyeFill class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 flex justify-center">
        <Pagination
          :pagination="articles.pagination"
          @send-request="getArticles"
        />
      </div>
    </div>
  </main>
  <!-- Modal -->
  <DelModal
    ref="delModal"
    @del-item="delArticle"
    :item="cacheArticle"
  >
    article
  </DelModal>
  <ArticleModal
    ref="articleModal"
    @send-request="getArticles"
    :article="cacheArticle"
    :state="isNew"
    :is-read-only="isDemo"
  />
</template>

<script>
import { getArticle, getArticles, delArticle } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/admin/DelModal.vue';
import ArticleModal from '@/components/admin/ArticleModal.vue';

export default {
  data() {
    return {
      articles: [],
      cacheArticle: [],
      isNew: true,
      isDemo: false,
    };
  },
  components: { Pagination, DelModal, ArticleModal },
  methods: {
    getArticles(page) {
      if (this.isDemo) {
        this.articles = {
          articles: [
            {
              id: 'demo-art-1',
              title: 'Demo Article 1',
              create_at: Math.floor(new Date().getTime() / 1000),
              author: 'Demo Author',
              isPublic: true,
              tag: ['News']
            },
            {
              id: 'demo-art-2',
              title: 'Demo Article 2',
              create_at: Math.floor(new Date().getTime() / 1000) - 100000,
              author: 'Demo Author',
              isPublic: false,
              tag: ['Event']
            }
          ],
          pagination: {
            total_pages: 1,
            current_page: 1,
            has_pre: false,
            has_next: false,
          }
        };
        return;
      }
      this.sendLoadingState(true);
      getArticles(page)
        .then((res) => {
          this.sendLoadingState(false);
          this.articles = res.data;
        })
        .catch(() => {
          this.sendLoadingState(false);
          this.alert.msg = 'Fail to get the articles';
          this.alert.state = false;
          this.sendMsg();
        });
    },
    delArticle() {
      delArticle(this.cacheArticle.id)
        .then((res) => {
          this.alert.msg = res.data.message;
          this.alert.state = true;
          this.$refs.delModal.closeModal();
          this.sendMsg();
          this.getArticles();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.$refs.delModal.closeModal();
          this.sendMsg();
        });
    },
    modalToggle(modal, item) {
      if (modal === 'new') {
        this.cacheArticle = {
          isPublic: false,
          tag: [],
          create_at: this.currentTime,
        };
        this.isNew = true;
        this.$refs.articleModal.openModal();
      } else if (modal === 'edit') {
        this.getArticle(item.id).then(() => {
          this.$refs.articleModal.openModal();
        });
        this.isNew = false;
      } else if (modal === 'view') {
        if (this.isDemo) {
          this.cacheArticle = JSON.parse(JSON.stringify(item));
          this.isNew = false;
          this.$refs.articleModal.openModal();
        } else {
          this.getArticle(item.id).then(() => {
            this.$refs.articleModal.openModal();
          });
        }
        this.isNew = false;
      } else if (modal === 'del') {
        this.getArticle(item.id).then(() => {
          this.$refs.delModal.openModal();
        });
      }
    },
    getArticle(id) {
      this.sendLoadingState(true);
      return getArticle(id)
        .then((res) => {
          this.cacheArticle = res.data.article;
          this.sendLoadingState(false);
          return res;
        }).catch((err) => {
          this.sendLoadingState(false);
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
  },
  created() {
    this.isDemo = localStorage.getItem('isDemo') === 'true';
    this.getArticles();
    this.$emitter.on('send-request', (page) => {
      this.getArticles(page);
    });
  },
  computed: {
    currentTime() {
      return Math.floor(new Date().getTime() / 1000);
    },
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
