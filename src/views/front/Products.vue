<template>
  <main class="container py-6">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <div>
        <p class="text-start">FILTER BY</p>
        <ul class="nav">
          <li class="me-3">
            <a href="#" class="c-btn" @click.prevent="chooseCategory('All')">
              <span class="c-btn__text">All</span>
            </a>
          </li>
          <li class="me-3" v-for="category in category.categories" :key="category">
            <a href="#" class="c-btn" @click.prevent="chooseCategory(category)">
              <span class="c-btn__text">{{ category }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <label name="sort" class="text-end d-block mb-2">SORT BY</label>
        <div class="c-select">
          <div class="c-select__selected" @click="sort.isShow = !sort.isShow"
          :class="{'select__arrow-active':sort.isShow}" aria-haspopup="listbox"
          aria-labelledby="sort">
            {{ sort.selected }}
          </div>
        </div>
        <div class="c-select__items z-2" v-show="sort.isShow" role="listbox" tabindex="-1">
          <div v-for="sort in sort.sorts" :key="sort" @click="chooseSort(sort)">{{ sort }}</div>
        </div>
      </div>
    </div>
    <ul class="row row-cols-1 row-cols-md-2 row-cols-lg-3 list-style-none">
      <li class="col mb-4" v-for="product in products" :key="product.id">
        <div class="mb-3 product__img" role="button" @click="getDetail(product.id)">
          <img :src="product.imageUrl" :alt="product.title" class="img-fluid rounded">
          <div class="bg-dark product__img__lightbox"></div>
          <div class="product__img__text mb-3">
            Check Details
          </div>
        </div>
        <p class="mb-1">{{ product.title }}</p>
        <p class="text-muted">${{product.price}} NTD / {{product.unit}}</p>
        <a href="" class="c-btn" @click.prevent="addToCart(product.id)">
          <span class="c-btn__text">Add to cart</span>
        </a>
      </li>
    </ul>
    <Pagination :pagination="pagination" @send-request="getProducts" />
  </main>
</template>
<script>
import { getAllProducts, addToCart } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      category: {
        categories: ['Nuts', 'Beans', 'Spices'],
        selected: 'All',
      },
      sort: {
        sorts: [
          'Name', 'Price: low to high', 'Price: high to low',
        ],
        selected: 'Please select',
        isShow: false,
      },
      products: [],
      pagination: [],
      allProducts: [],
      cacheProducts: [],
      data: {
        product_id: '',
        qty: 1,
      },
    };
  },
  components: { Pagination },
  methods: {
    chooseSort(sort) {
      this.sort.selected = sort;
      this.sort.isShow = !this.sort.isShow;
      this.getProducts(1, this.category.selected, sort);
    },
    chooseCategory(category) {
      this.category.selected = category;
      this.getProducts(1, category);
    },
    getAllProducts() {
      this.sendLoadingState(true);
      getAllProducts()
        .then((res) => {
          this.sendLoadingState(false);
          this.allProducts = res.data.products;
          if (Object.keys(this.$route.query).length !== 0) {
            this.chooseCategory(this.$route.query.category);
          } else {
            this.getProducts();
          }
        })
        .catch(() => {
          this.sendLoadingState(false);
          this.alert.msg = 'Fail to get the products';
          this.alert.state = false;
          this.sendMsg();
        });
    },
    getProducts(page = 1, category = 'All', sort) {
      this.sendLoadingState(true);
      setTimeout(() => {
        if (sort === 'Name') {
          this.allProducts.sort((x, y) => (x.title).localeCompare(y.title));
        } else if (sort === 'Price: low to high') {
          this.allProducts.sort((x, y) => x.price - y.price);
        } else if (sort === 'Price: high to low') {
          this.allProducts.sort((x, y) => y.price - x.price);
        }
        if (category !== 'All') {
          this.cacheProducts = this.allProducts.filter((product) => product.category === category);
          this.products = this.cacheProducts.slice((page * 9 - 9), (page * 9));
        } else {
          this.products = this.allProducts.slice((page * 9 - 9), (page * 9));
        }
        const hasPre = (page !== 1);
        const hasNext = (page !== this.total_pages);
        this.pagination = {
          total_pages: this.total_pages,
          current_page: page,
          has_pre: hasPre,
          has_next: hasNext,
          category,
        };
        this.sendLoadingState(false);
      }, 1000);
    },
    getDetail(id) {
      this.$router.replace(`/product/${id}`);
    },
    addToCart(id) {
      this.data.product_id = id;
      addToCart(this.data)
        .then(() => {
          this.alert.msg = 'Product added to cart successfully!';
          this.alert.state = true;
          this.sendMsg();
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
  },
  created() {
    this.getAllProducts();
    this.$emitter.on('send-request', (page) => {
      this.getProducts(page);
    });
  },
  mixins: [alertMixin, loadingMixin],
  computed: {
    total_pages() {
      if (this.category.selected !== 'All') {
        return Math.floor(this.cacheProducts.length / 9) + 1;
      }
      return Math.floor(this.allProducts.length / 9) + 1;
    },
  },
};
</script>
<style lang="scss">
</style>
