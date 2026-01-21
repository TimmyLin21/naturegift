<template>
  <main class="bg-white w-full min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-end mb-6">
        <button
          type="button"
          class="inline-block bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-bold shadow-sm"
          @click.prevent="modalToggle('new')"
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
                  <a
                    href="#"
                    class="transform hover:text-secondary hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('edit', article)"
                    title="Edit"
                  >
                    <BIconPen class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="transform hover:text-red-500 hover:scale-110 transition-transform duration-300"
                    @click.prevent="modalToggle('del', article)"
                    title="Delete"
                  >
                    <BIconTrash class="w-5 h-5" />
                  </a>
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
    };
  },
  components: { Pagination, DelModal, ArticleModal },
  methods: {
    getArticles(page) {
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
