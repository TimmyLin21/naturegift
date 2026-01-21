<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative">
      <div class="flex items-center justify-between p-4 border-b bg-primary rounded-t-lg">
        <h5 class="text-xl font-bold text-secondary">
          {{ isNew ? 'Add New Product' : 'Edit Product' }}
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
        <ul class="flex space-x-2 bg-green-100 p-2 mb-4 rounded">
          <li
            v-for="tab in tabs"
            :key="tab"
            class="flex-1"
          >
            <a
              class="block text-center py-2 px-4 rounded cursor-pointer transition-colors"
              :class="{ 
                'bg-secondary text-white font-bold shadow': currentTab === `${tab}Tab`,
                'hover:bg-green-200 text-gray-600 hover:text-black': currentTab !== `${tab}Tab`
              }"
              @click="currentTab = `${tab}Tab`"
            >
              {{ tab }}
            </a>
          </li>
        </ul>
        <keep-alive>
          <component :is="currentTab" />
        </keep-alive>
      </div>
      <div class="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
        <button
          type="button"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          @click="closeModal"
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
import modalMixin from '@/mixins/modalMixin.js';
import alertMixin from '@/mixins/alertMixin.js';
import productTab from '@/mixins/productTab.js';
import { addNewProduct, editProduct } from '@/scripts/api.js';
import InfoTab from '@/components/admin/ProductModalTab/InfoTab.vue';
import ContentTab from '@/components/admin/ProductModalTab/ContentTab.vue';
import NutritionTab from '@/components/admin/ProductModalTab/NutritionTab.vue';
import ImagesTab from '@/components/admin/ProductModalTab/ImagesTab.vue';

export default {
  data() {
    return {
      currentTab: 'InfoTab',
      tabs: ['Info', 'Content', 'Nutrition', 'Images'],
    };
  },
  components: {
    InfoTab, ContentTab, NutritionTab, ImagesTab,
  },
  methods: {
    saveChange() {
      if (this.isNew) {
        addNewProduct(this.cacheProduct)
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
        editProduct(this.cacheProduct.id, this.cacheProduct)
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
  },
  mixins: [modalMixin, alertMixin, productTab],
  emits: ['send-request'],
};
</script>
