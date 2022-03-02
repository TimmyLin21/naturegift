export default {
  methods: {
    sendLoadingState(state) {
      this.$emitter.emit('loading-state', state);
    },
  },
};
