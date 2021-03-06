<template>
  <main class="container py-6 mt-100px mt-md-150px">
    <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
      <div class="w-100 w-md-50 mb-4 mb-md-0">
        <p class="text-start">
          FILTER BY
        </p>
        <ul class="nav">
          <li class="me-3 mb-3 mb-lg-0">
            <a
              href="#"
              class="c-btn"
              @click.prevent="chooseCategory('All')"
            >
              <span class="c-btn__text">All</span>
            </a>
          </li>
          <li
            class="me-3"
            v-for="item in category.categories"
            :key="item"
          >
            <a
              href="#"
              class="c-btn"
              @click.prevent="chooseCategory(item)"
            >
              <span class="c-btn__text">{{ item }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <label
          name="sort"
          class="text-start text-md-end d-block mb-2"
        >SORT BY</label>
        <div class="c-select">
          <div
            class="c-select__selected"
            @click="sort.isShow = !sort.isShow"
            :class="{'select__arrow-active':sort.isShow}"
            aria-haspopup="listbox"
            aria-labelledby="sort"
          >
            {{ sort.selected }}
          </div>
        </div>
        <div
          class="c-select__items z-2"
          v-show="sort.isShow"
          role="listbox"
          tabindex="-1"
        >
          <div
            v-for="sortOption in sort.sorts"
            :key="sortOption"
            @click="chooseSort(sortOption)"
          >
            {{ sortOption }}
          </div>
        </div>
      </div>
    </div>
    <ul class="row row-cols-1 row-cols-md-2 row-cols-lg-3 list-style-none ps-0">
      <li
        class="col mb-7"
        v-for="product in products"
        :key="product.id"
      >
        <div
          class="mb-3 product__img"
        >
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="img-fluid rounded"
          >
          <div
            class="bg-dark product__img__lightbox"
            role="button"
            @click.self="getDetail(product.id)"
          />
          <div
            class="product__img__text mb-3"
            role="button"
            @click.self="getDetail(product.id)"
          >
            Check Details
          </div>
          <div
            class="product__img__like"
            @click="toggleFav(product.id)"
          >
            <BIconSuitHeartFill :class="{like: checkFav(product.id)}" />
          </div>
          <div
            class="product__img__sale"
            v-if="product.price !== product.origin_price"
          >
            On Sale
          </div>
        </div>
        <p
          class="mb-1 cursor-pointer fw-bold"
          @click="getDetail(product.id)"
        >
          {{ product.title }}
        </p>
        <p
          class="text-muted"
          v-if="product.price !== product.origin_price"
        >
          <span class="text-decoration-line-through text-danger">
            ${{ product.origin_price }}
          </span>
          ${{ product.price }} NTD / {{ product.unit }}
        </p>
        <p
          class="text-muted"
          v-else
        >
          ${{ product.origin_price }} NTD / {{ product.unit }}
        </p>
        <a
          href=""
          class="c-btn"
          @click.prevent="addToCart(product.id)"
        >
          <span class="c-btn__text">Add to cart</span>
        </a>
      </li>
    </ul>
    <Pagination
      :pagination="pagination"
      @send-request="getProducts"
    />
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
      favProducts: [],
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
      this.$router.push(`/product/${id}`);
    },
    addToCart(id) {
      this.data.product_id = id;
      addToCart(this.data)
        .then(() => {
          this.alert.msg = 'Product added to cart successfully!';
          this.alert.state = true;
          this.sendMsg();
          this.$emitter.emit('renewCart');
        }).catch((err) => {
          [this.alert.msg] = err.response.data.message;
          this.alert.state = false;
          this.sendMsg();
        });
    },
    toggleFav(id) {
      const filterResult = this.favProducts.findIndex((i) => i === id);
      if (filterResult === -1) {
        this.favProducts.push(id);
      } else {
        this.favProducts.splice(filterResult, 1);
      }
      const favListStr = JSON.stringify(this.favProducts);
      localStorage.setItem('favList', favListStr);
    },
    checkFav(id) {
      return this.favProducts.includes(id);
    },
  },
  created() {
    this.getAllProducts();
    this.$emitter.on('send-request', (page) => {
      this.getProducts(page);
    });
    this.favProducts = JSON.parse(localStorage.getItem('favList')) || [];
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
