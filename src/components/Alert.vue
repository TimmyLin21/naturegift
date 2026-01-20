<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 px-6 py-4 rounded shadow-lg border flex items-center min-w-[300px]"
    role="alert"
    :class="{ 
      'opacity-0 invisible': isClose, 
      'opacity-100 visible': !isClose,
      'bg-green-100 text-green-800 border-green-200': isSuccess, 
      'bg-red-100 text-red-800 border-red-200': !isSuccess 
    }"
  >
    <span class="flex-grow font-bold">{{ msg }}</span>
    <button
      type="button"
      class="ml-4 text-gray-500 hover:text-gray-800 focus:outline-none"
      @click="close"
      aria-label="Close"
    >
      <span class="text-2xl">&times;</span>
    </button>
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
