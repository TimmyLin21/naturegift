<template>
  <main class="bg-light w-100">
    <div class="container py-4">
      <div class="d-flex justify-content-end mb-4">
        <button
          type="button"
          class="btn btn-secondary text-white"
          @click.prevent="modalToggle('new')"
        >
          Add new article
        </button>
      </div>
      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr class="table-secondary text-secondary align-middle">
              <th scope="col">
                Release date
              </th>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Tag
              </th>
              <th scope="col">
                Author
              </th>
              <th scope="col">
                Enable
              </th>
              <th scope="col">
                Edit article
              </th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr
              v-for="article in articles.articles"
              :key="article.id"
            >
              <td>{{ $filters.date(article.create_at) }}</td>
              <td>{{ article.title }}</td>
              <td>
                <span
                  class="badge rounded-pill bg-secondary me-1"
                  v-for="tag in article.tag"
                  :key="tag"
                >
                  {{ tag }}
                </span>
              </td>
              <td>{{ article.author }}</td>
              <td v-if="article.isPublic">
                <BIconCheckCircle />
              </td>
              <td v-else>
                <BIconXCircle />
              </td>
              <td>
                <a
                  href="#"
                  class="link-success me-3"
                  @click.prevent="modalToggle('edit', article)"
                >
                  <BIconPen />
                </a>
                <a
                  href="#"
                  class="link-danger"
                  @click.prevent="modalToggle('del', article)"
                >
                  <BIconTrash />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :pagination="articles.pagination"
        @send-request="getArticles"
      />
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
import { getArticle, getArticles, delArticle } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';
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
          tag: [],
          create_at: this.currentTime,
        };
        this.isNew = true;
        this.$refs.articleModal.openModal();
      } else if (modal === 'edit') {
        this.getArticle(item.id);
        this.isNew = false;
        setTimeout(() => {
          this.$refs.articleModal.openModal();
        }, 1000);
      } else if (modal === 'del') {
        this.getArticle(item.id);
        setTimeout(() => {
          this.$refs.delModal.openModal();
        }, 1000);
      }
    },
    getArticle(id) {
      this.sendLoadingState(true);
      getArticle(id)
        .then((res) => {
          this.cacheArticle = res.data.article;
          this.sendLoadingState(false);
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
