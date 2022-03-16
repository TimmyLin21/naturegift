<template>
  <div class="modal fade" tabindex="-1"
  aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-secondary" v-if="state">Add New Article</h5>
          <h5 class="modal-title text-secondary" v-else>Edit Article</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-12 col-lg-6">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title"
              placeholder="Article title" v-model="cacheArticle.title"/>
            </div>
            <div class="col-12 col-lg-6">
              <label for="author" class="form-label">Author</label>
              <input type="text" class="form-control" id="author"
              placeholder="Article author" v-model="cacheArticle.author" />
            </div>
            <div class="col-12 col-lg-6">
              <label for="tag" class="form-label">Tag</label>
              <label for="tag" class="form-control tagsContainer">
                <div class="d-flex align-items-center" :class="{'me-2':cacheArticle.tag.length>0 }">
                  <span class="badge rounded-pill bg-secondary me-1 d-block"
                  v-for="(tag, i) in cacheArticle.tag" :key="tag">
                    {{ tag }}
                    <a href="#" class="ms-1 btn-close btn-close-white"
                    @click.prevent="delTag(i)" />
                  </span>
                </div>
                <input type="text" class="col py-0" id="tag"
                :placeholder="
                cacheArticle.tag.length > 0 ? '' : 'Article tag, press enter to create tags'
                "
                v-model.trim="tagInput" @keyup.enter="addTag" />
              </label>
            </div>
            <div class="col-12 col-lg-6">
              <label for="release_date" class="form-label">Release date</label>
              <input type="date" class="form-control" id="release_date" v-model="release_date" />
            </div>
            <div class="col-12">
              <h3 class="h5">Content</h3>
              <ckeditor :editor="editor.editor" v-model="cacheArticle.content"
              :config="editor.editorConfig" />
            </div>
            <hr class="mb-0">
            <div class="col">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" v-model="cacheArticle.isPublic"
                id="articleEnabledSwitch" :checked="cacheArticle.isPublic" />
                <label class="form-check-label" for="articleEnabledSwitch">
                  Enable article
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary text-secondary" @click="saveChange">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
import alertMixin from '@/mixins/alertMixin';
import { addNewArticle, editArticle } from '@/scripts/api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      cacheArticle: {
        tag: [''],
      },
      release_date: '',
      tagInput: '',
      editor: {
        editor: ClassicEditor,
        editorConfig: {
          toolbar: ['heading', 'bold', 'italic', '|', 'link', 'numberedList', 'bulletedList', 'uploadImage', 'blockQuote', 'undo', 'redo'],
        },
      },
    };
  },
  props: ['article', 'state'],
  methods: {
    saveChange() {
      if (this.state) {
        addNewArticle(this.cacheArticle)
          .then((res) => {
            this.alert.msg = res.data.message;
            this.alert.state = true;
            this.closeModal();
            this.sendMsg();
            this.sendRequest();
          }).catch((err) => {
            [this.alert.msg] = err.response.data.message;
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
            [this.alert.msg] = err.response.data.message;
            this.alert.state = false;
            this.sendMsg();
          });
      }
    },
    sendRequest() {
      this.$emit('send-request');
    },
    addTag() {
      if (this.tagInput.trim()) {
        this.cacheArticle.tag.push(this.tagInput.trim());
        this.tagInput = '';
      }
    },
    delTag(i) {
      this.cacheArticle.tag.splice(i, 1);
    },
  },
  watch: {
    article() {
      this.cacheArticle = this.article;
      this.tags = this.article.tag;
      const date = new Date(this.cacheArticle.create_at * 1000).toISOString().split('T');
      [this.release_date] = date;
    },
    release_date() {
      this.cacheArticle.create_at = Math.floor(new Date(this.release_date) / 1000);
    },
  },
  mixins: [modalMixin, alertMixin],
};
</script>
<style lang="scss">
  .tagsContainer {
    display: flex;
    align-items: center;
    flex-flow: wrap;
    & input {
      border: 0;
      &:focus {
        outline: none;
      }
    }
  }
</style>
