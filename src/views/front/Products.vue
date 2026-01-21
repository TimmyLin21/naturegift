<template>
  <main class="container mx-auto px-4 py-6 mt-[100px] md:mt-[150px]">
    <div class="flex justify-between items-center mb-12 flex-wrap">
      <div class="w-full md:w-1/2 mb-4 md:mb-0">
        <p class="text-left font-bold mb-2">
          FILTER BY
        </p>
        <ul class="flex flex-wrap">
          <li class="mr-3 mb-3 lg:mb-0">
            <a
              href="#"
              class="inline-block bg-secondary text-white px-5 py-2 rounded-full hover:bg-primary hover:text-secondary transition-colors duration-300"
              @click.prevent="chooseCategory('All')"
            >
              <span>All</span>
            </a>
          </li>
          <li
            class="mr-3"
            v-for="item in category.categories"
            :key="item"
          >
            <a
              href="#"
              class="inline-block bg-secondary text-white px-5 py-2 rounded-full hover:bg-primary hover:text-secondary transition-colors duration-300"
              @click.prevent="chooseCategory(item)"
            >
              <span>{{ item }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <label
          name="sort"
          class="text-left md:text-right block mb-2 font-bold"
        >SORT BY</label>
        <div class="relative w-[200px] cursor-pointer group">
          <div
            class="bg-white py-2 px-8 mt-2 rounded shadow text-center relative select-none"
            @click="sort.isShow = !sort.isShow"
            aria-haspopup="listbox"
            aria-labelledby="sort"
          >
            {{ sort.selected }}
            <span 
              class="absolute right-4 top-[0.9rem] w-2 h-2 border-r-2 border-b-2 border-secondary transform rotate-45 transition-transform duration-300"
              :class="{ '-rotate-[135deg] top-[1.1rem]': sort.isShow }"
            ></span>
          </div>
          <div
            class="absolute rounded-lg w-[200px] z-20 bg-white mt-1 shadow-lg overflow-hidden"
            v-show="sort.isShow"
            role="listbox"
            tabindex="-1"
          >
            <div
              v-for="sortOption in sort.sorts"
              :key="sortOption"
              @click="chooseSort(sortOption)"
              class="py-2 px-6 hover:bg-primary cursor-pointer transition-colors"
            >
              {{ sortOption }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <ul 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0"
      v-if="isLoading"
    >
      <li v-for="n in 6" :key="n">
        <SkeletonProduct />
      </li>
    </ul>

    <ul 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0"
      v-else
    >
      <li
        class="mb-7"
        v-for="product in products"
        :key="product.id"
      >
        <div
          class="mb-3 relative overflow-hidden group rounded-lg"
        >
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="w-full h-[200px] object-cover object-center rounded-lg"
          >
          <div
            class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 cursor-pointer"
            role="button"
            @click.self="getDetail(product.id)"
          />
          <div
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[150%] bg-gray-200 px-6 py-2 text-secondary rounded transition-transform duration-300 group-hover:-translate-y-[10%] cursor-pointer"
            role="button"
            @click.self="getDetail(product.id)"
          >
            Check Details
          </div>
          <div
            class="absolute top-4 right-4 z-10 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
            @click="toggleFav(product.id)"
          >
            <BIconSuitHeartFill class="w-6 h-6" :class="{ 'text-red-500': checkFav(product.id) }" />
          </div>
          <div
            class="absolute top-2 left-2 z-0 bg-light text-red-500 px-2 py-1 rounded shadow text-sm"
            v-if="product.price !== product.origin_price"
          >
            On Sale
          </div>
        </div>
        <p
          class="mb-1 cursor-pointer font-bold text-lg hover:text-secondary transition-colors"
          @click="getDetail(product.id)"
        >
          {{ product.title }}
        </p>
        <p
          class="text-gray-500 mb-4"
          v-if="product.price !== product.origin_price"
        >
          <span class="line-through text-red-500 mr-2">
            ${{ product.origin_price }}
          </span>
          ${{ product.price }} NTD / {{ product.unit }}
        </p>
        <p
          class="text-gray-500 mb-4"
          v-else
        >
          ${{ product.origin_price }} NTD / {{ product.unit }}
        </p>
        <a
          href=""
          class="inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold"
          @click.prevent="addToCart(product.id)"
        >
          <span>Add to cart</span>
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
import { getAllProducts, addToCart } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';
import Pagination from '@/components/Pagination.vue';
import SkeletonProduct from '@/components/front/SkeletonProduct.vue';

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
      isLoading: false,
    };
  },
  components: { Pagination, SkeletonProduct },
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
      this.isLoading = true;
      getAllProducts()
        .then((res) => {
          this.isLoading = false;
          this.allProducts = res.data.products;
          if (Object.keys(this.$route.query).length !== 0) {
            this.chooseCategory(this.$route.query.category);
          } else {
            this.getProducts();
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.alert.msg = 'Fail to get the products';
          this.alert.state = false;
          this.sendMsg();
        });
    },
    getProducts(page = 1, category = 'All', sort) {
      this.isLoading = true;
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
        this.isLoading = false;
      }, 500);
    },
    getDetail(id) {
      this.$router.push(`/product/${id}`);
    },
    addToCart(id) {
      this.sendLoadingState(true);
      this.data.product_id = id;
      addToCart(this.data)
        .then(() => {
          this.sendLoadingState(false);
          this.alert.msg = 'Product added to cart successfully!';
          this.alert.state = true;
          this.sendMsg();
          this.$emitter.emit('renewCart');
        }).catch((err) => {
          this.sendLoadingState(false);
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
