<template>
  <div class="modal fade" tabindex="-1"
  aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white">Delete <slot></slot></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          Are you sure you want to delete {{ item.title }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-danger text-white" @click="del()">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
import alertMixin from '@/mixins/alertMixin';

export default {
  props: ['item'],
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
