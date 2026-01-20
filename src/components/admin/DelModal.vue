<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col relative overflow-hidden">
      <div class="flex items-center justify-between p-4 border-b bg-red-500 rounded-t-lg">
        <h5 class="text-xl font-bold text-white">
          Delete <slot />
        </h5>
        <button
          type="button"
          class="text-white hover:text-gray-200 text-2xl leading-none"
          @click="closeModal"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div class="p-6">
        Are you sure you want to delete <span class="font-bold">{{ item.title }}</span>?
      </div>
      <div class="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
        <button
          type="button"
          class="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors"
          @click="closeModal"
        >
          Close
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          @click="del()"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin.js';
import alertMixin from '@/mixins/alertMixin.js';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['del-item', 'del-all'],
  methods: {
    del() {
      if (!this.item.id) {
        this.$emit('del-all');
      } else {
        this.$emit('del-item');
      }
    },
  },
  mixins: [modalMixin, alertMixin],
};
</script>
