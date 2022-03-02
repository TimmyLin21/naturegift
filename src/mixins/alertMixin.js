export default {
  data() {
    return {
      alert: {
        msg: '',
        state: false,
      },
    };
  },
  methods: {
    sendMsg() {
      this.$emitter.emit('sendMsg', this.alert);
    },
  },
};
