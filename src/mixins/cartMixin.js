import { getCart, editCart, delCartItem } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';

export default {
  data() {
    return {
      carts: [],
      total: '',
      final_total: '',
    };
  },
  methods: {
    getCart() {
      getCart()
        .then((res) => {
          this.carts = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
        });
    },
    editCart(item, action) {
      let { qty } = item;
      if (action === '+') {
        qty += 1;
      } else if (action === '-') {
        qty -= (qty > 1 ? 1 : 0);
      }
      return editCart(item.id, qty)
        .then(() => {
          this.alert.msg = 'Product edited successfully!';
          this.alert.state = true;
          this.sendMsg();
          this.getCart();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
    delCartItem(id) {
      return delCartItem(id)
        .then(() => {
          this.alert.msg = 'Product deleted successfully!';
          this.alert.state = true;
          this.sendMsg();
          this.getCart();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.$emitter.on('renewCart', () => {
      this.getCart();
    });
  },
  watch: {
    carts(n, o) {
      const last = JSON.stringify(n);
      const pre = JSON.stringify(o);
      if (last !== pre) {
        this.$emitter.emit('renewCart');
      }
    },
  },
  mixins: [alertMixin],
};
