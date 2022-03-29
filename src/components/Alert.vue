<template>
  <div
    class="alert alert-success position-absolute top-50 start-50
  translate-middle trans-ease z-4"
    role="alert"
    :class="{fade:isClose, 'alert-success':isSuccess, 'alert-danger': !isSuccess}"
  >
    {{ msg }}
    <button
      type="button"
      class="btn-close ms-2"
      @click="close"
      aria-label="Close"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isClose: true,
      msg: '',
      isSuccess: false,
    };
  },
  methods: {
    close() {
      this.isClose = true;
    },
    open() {
      this.isClose = false;
    },
  },
  mounted() {
    this.$emitter.on('sendMsg', (alert) => {
      this.msg = alert.msg;
      this.isSuccess = alert.state;
      this.open();
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.close();
      }, 1000);
    });
  },
};
</script>
