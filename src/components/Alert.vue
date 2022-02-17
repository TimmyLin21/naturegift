<template>
  <div class="alert alert-success position-absolute top-50 start-50
  translate-middle trans-ease" role="alert"
  :class="{fade:isClose, 'alert-success':isSuccess, 'alert-danger': !isSuccess}">
    <slot></slot>
    <button type="button" class="btn-close ms-2"
    @click="close" aria-label="Close"></button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isClose: true,
    };
  },
  props: ['isSuccess'],
  methods: {
    close() {
      this.isClose = true;
    },
    open() {
      this.isClose = false;
    },
  },
  watch: {
    isSuccess() {

    },
  },
};
</script>
