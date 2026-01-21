<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative">
      <div class="flex items-center justify-between p-4 border-b bg-primary rounded-t-lg">
        <h5 class="text-xl font-bold text-secondary">
          {{ state ? 'Add New Article' : 'Edit Article' }}
        </h5>
        <button
          type="button"
          class="text-secondary hover:text-white text-2xl leading-none"
          @click="closeModal"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div class="p-6 overflow-y-auto">
        <form class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="col-span-1">
            <label
              for="title"
              class="block mb-2 font-bold"
            >Title</label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="title"
              placeholder="Article title"
              v-model="cacheArticle.title"
            >
          </div>
          <div class="col-span-1">
            <label
              for="author"
              class="block mb-2 font-bold"
            >Author</label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="author"
              placeholder="Article author"
              v-model="cacheArticle.author"
            >
          </div>
          <div class="col-span-1">
            <label
              for="tag"
              class="block mb-2 font-bold"
            >Tag</label>
            <label
              for="tag"
              class="block w-full px-3 py-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-primary cursor-text min-h-[42px]"
            >
              <div
                class="flex flex-wrap items-center gap-2"
              >
                <span
                  class="bg-secondary text-white rounded-full px-3 py-1 flex items-center text-sm"
                  v-for="(tag, i) in cacheArticle.tag"
                  :key="tag"
                >
                  {{ tag }}
                  <a
                    href="#"
                    class="ml-2 text-white hover:text-red-300 font-bold"
                    @click.prevent="delTag(i)"
                  >&times;</a>
                </span>
                <input
                  type="text"
                  class="flex-grow border-none focus:ring-0 p-0 text-sm"
                  id="tag"
                  :placeholder="
                    cacheArticle.tag?.length > 0 ? '' : 'Article tag, press enter to create tags'
                  "
                  v-model.trim="tagInput"
                  @keyup.enter="addTag"
                >
              </div>
            </label>
          </div>
          <div class="col-span-1">
            <label
              for="release_date"
              class="block mb-2 font-bold"
            >Release date</label>
            <input
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              id="release_date"
              v-model="release_date"
            >
          </div>
          <div class="col-span-1 lg:col-span-2">
            <h3 class="mb-2 font-bold text-lg">
              Content
            </h3>
            <ckeditor
              :editor="editor.editor"
              v-model="cacheArticle.content"
              :config="editor.editorConfig"
            />
          </div>
          <div class="col-span-1 lg:col-span-2 pt-4 border-t">
            <div class="flex items-center">
              <input
                class="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                type="checkbox"
                v-model="cacheArticle.isPublic"
                id="articleEnabledSwitch"
                :checked="cacheArticle.isPublic"
              >
              <label
                class="font-bold cursor-pointer"
                for="articleEnabledSwitch"
              >
                Enable article
              </label>
            </div>
          </div>
        </form>
      </div>
      <div class="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
        <button
          type="button"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          @click="closeModal(); clearTag()"
        >
          Close
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-primary text-secondary font-bold rounded hover:bg-opacity-90 transition-colors"
          @click="saveChange"
        >
          Save changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import modalMixin from '@/mixins/modalMixin.js';
import alertMixin from '@/mixins/alertMixin.js';
import { addNewArticle, editArticle } from '@/scripts/api.js';

export default {
  data() {
    return {
      cacheArticle: {},
      release_date: '',
      tagInput: '',
      editor: {
        editor: ClassicEditor,
        editorConfig: {
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
        },
      },
    };
  },
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    state: {
      type: Boolean,
    },
  },
  methods: {
    saveChange() {
      // Ensure specific fields are numbers if driven by the backend, or leave as is.
      // Typically articles don't have numeric logic beyond date.
      if (this.state) {
        addNewArticle(this.cacheArticle)
          .then((res) => {
            this.alert.msg = res.data.message;
            this.alert.state = true;
            this.closeModal();
            this.sendMsg();
            this.sendRequest();
          }).catch((err) => {
            if (err.response && err.response.data) {
              [this.alert.msg] = err.response.data.message;
            } else {
              this.alert.msg = 'An error occurred';
            }
            this.alert.state = false;
            this.sendMsg();
          });
      } else {
        editArticle(this.cacheArticle.id, this.cacheArticle)
          .then((res) => {
            this.alert.msg = res.data.message;
            this.alert.state = true;
            this.closeModal();
            this.sendMsg();
            this.sendRequest();
          }).catch((err) => {
            if (err.response && err.response.data) {
              [this.alert.msg] = err.response.data.message;
            } else {
              this.alert.msg = 'An error occurred';
            }
            this.alert.state = false;
            this.sendMsg();
          });
      }
    },
    sendRequest() {
      this.$emit('send-request');
    },
    addTag() {
      if (this.tagInput) {
        if (!this.cacheArticle.tag) {
          this.cacheArticle.tag = [];
        }
        if (!this.cacheArticle.tag.includes(this.tagInput)) {
          this.cacheArticle.tag.push(this.tagInput);
          this.tagInput = '';
        }
      }
    },
    delTag(index) {
      this.cacheArticle.tag.splice(index, 1);
    },
    clearTag() {
      this.tagInput = '';
    },
  },
  watch: {
    article() {
      this.cacheArticle = this.article;
      if (this.cacheArticle.create_at) {
        const date = new Date(this.cacheArticle.create_at * 1000).toISOString().split('T');
        [this.release_date] = date;
      }
    },
    release_date() {
      this.cacheArticle.create_at = Math.floor(new Date(this.release_date) / 1000);
    },
  },
  mixins: [modalMixin, alertMixin],
  emits: ['send-request'],
};
</script>
