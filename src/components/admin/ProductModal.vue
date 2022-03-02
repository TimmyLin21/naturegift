<template>
  <div class="modal fade" tabindex="-1"
  aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-secondary" v-if="isNew">Add New Product</h5>
          <h5 class="modal-title text-secondary" v-else>Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <ul class="nav nav-pills bg-success p-2 mb-3">
            <li class="nav-item" v-for="tab in tabs" :key="tab">
              <a class="nav-link" :class="{active: currentTab === `${tab}Tab`}"
              @click="currentTab = `${tab}Tab`">
                {{ tab }}
              </a>
            </li>
          </ul>
          <keep-alive>
            <component :is="currentTab"></component>
          </keep-alive>
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
import loadingMixin from '@/mixins/loadingMixin';
import { addNewProduct } from '@/scripts/api';
import InfoTab from '@/components/admin/ProductModalTab/InfoTab.vue';
import ContentTab from '@/components/admin/ProductModalTab/ContentTab.vue';
import NutritionTab from '@/components/admin/ProductModalTab/NutritionTab.vue';
import ImagesTab from '@/components/admin/ProductModalTab/ImagesTab.vue';

export default {
  data() {
    return {
      currentTab: 'InfoTab',
      tabs: ['Info', 'Content', 'Nutrition', 'Images'],
      cacheProduct: '',
      isNew: true,
    };
  },
  components: {
    InfoTab, ContentTab, NutritionTab, ImagesTab,
  },
  methods: {
    saveChange() {
      if (this.isNew) {
        this.sendLoadingState(true);
        addNewProduct({ data: this.cacheProduct })
          .then((res) => {
            this.sendLoadingState(false);
            this.alert.msg = res.data.message;
            this.alert.state = true;
            this.sendMsg();
            this.closeModal();
            this.sendRequest();
          }).catch((err) => {
            this.sendLoadingState(false);
            this.alert.msg = err.data.message;
            this.alert.state = false;
            this.sendMsg();
            this.closeModal();
          });
      }
    },
    sendRequest() {
      this.$emit('send-request');
    },
  },
  mixins: [modalMixin, alertMixin, loadingMixin],
  inject: ['state'],
  watch: {
    state() {
      this.isNew = this.state;
    },
  },
};
</script>
