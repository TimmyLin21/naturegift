<template>
  <section class="container mx-auto px-4 py-12 mt-[100px] md:mt-[150px]">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
      <div class="col">
        <img
          :src="currentImg"
          :alt="product.title"
          class="w-full border h-[250px] md:h-[400px] object-cover object-center rounded-lg mb-4"
        >
        <div class="grid grid-cols-3 gap-4">
          <div class="">
            <img
              :src="product.imageUrl"
              :alt="product.title"
              class="w-full h-[100px] object-cover object-center border rounded cursor-pointer hover:opacity-80 transition-opacity"
              @click="currentImg = product.imageUrl"
            >
          </div>
          <div
            class=""
            v-for="image in product.imagesUrl"
            :key="image"
          >
            <img
              :src="image"
              :alt="product.title"
              class="w-full h-[100px] object-cover object-center border rounded cursor-pointer hover:opacity-80 transition-opacity"
              @click="currentImg = image"
            >
          </div>
        </div>
      </div>
      <div class="text-left">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="flex space-x-2 text-gray-500">
            <li class="flex items-center">
              <router-link
                to="/"
                class="text-primary hover:text-secondary no-underline"
              >
                Home
              </router-link>
              <span class="mx-2">/</span>
            </li>
            <li class="flex items-center">
              <router-link
                to="/products"
                class="text-primary hover:text-secondary no-underline"
              >
                Products
              </router-link>
              <span class="mx-2">/</span>
            </li>
            <li
              class="font-bold text-gray-700"
              aria-current="page"
            >
              {{ product.category }}
            </li>
          </ol>
        </nav>
        <h2 class="text-3xl font-bold mb-4">
          {{ product.title }}
        </h2>
        <p class="text-gray-600 mb-4 leading-relaxed">
          {{ product.description }}
        </p>
        <p class="text-gray-500 mb-8">
          Weight: {{ product.unit }}
        </p>
        <p
          class="text-3xl font-bold mb-8 text-secondary"
          v-if="product.origin_price === product.price"
        >
          $ {{ product.price }}
        </p>
        <p
          class="text-3xl font-bold mb-8 text-secondary"
          v-else
        >
          <span
            class="text-red-500 line-through text-xl mr-4"
          >
            $ {{ product.origin_price }}
          </span>
          $ {{ product.price }}
        </p>
        <div class="flex mb-8 flex-wrap items-center gap-6">
          <div class="flex items-center border border-gray-300 rounded px-4 py-2">
            <BIconDashCircle
              @click="minusQty"
              class="text-xl text-secondary cursor-pointer hover:text-primary"
            />
            <input
              class="text-center w-16 border-0 focus:ring-0 text-xl font-bold mx-2"
              type="number"
              v-model.number="qty"
              min="1"
            >
            <BIconPlusCircle
              @click="qty += 1"
              class="text-xl text-secondary cursor-pointer hover:text-primary"
            />
          </div>
          <a
            href="#"
            class="inline-block bg-secondary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold uppercase tracking-wider"
            @click.prevent="addToCart(product.id, qty)"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
      <div class="text-left pt-5">
        <h3 class="text-2xl font-bold mb-4 border-b-2 border-secondary pb-2 inline-block">
          Description
        </h3>
        <p class="leading-relaxed text-gray-600">{{ product.content }}</p>
      </div>
      <div class="">
        <div class="bg-secondary pb-2 rounded overflow-hidden">
          <h4 class="text-white py-3 text-center text-xl font-bold">
            Nutritional Information
          </h4>
          <div class="mx-2 bg-[#f9faee] p-4 rounded-b">
            <p class="flex justify-between border-b border-dashed border-gray-300 py-2"><span />Per 100g</p>
            <p class="flex justify-between border-b border-dashed border-gray-300 py-2">Energy (kg)<span>{{ product.calories }}</span></p>
            <p class="flex justify-between border-b border-dashed border-gray-300 py-2">Carbohydrate (g)<span>{{ product.carbohydrate }}</span></p>
            <p class="flex justify-between border-b border-dashed border-gray-300 py-2">Protein (g)<span>{{ product.protein }}</span></p>
            <p class="flex justify-between border-b border-dashed border-gray-300 py-2">Fat (g)<span>{{ product.fat }}</span></p>
            <p class="flex justify-between py-2 border-0">
              Fiber (g)<span>{{ product.fiber }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="text-2xl font-bold mb-6 text-left border-l-4 border-secondary pl-4">
      Have you tried?
    </h3>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
      <template
        v-for="(item, index) in products"
        :key="item.id"
      >
        <li
          class="mb-4"
          v-if="index < 3"
        >
          <div
            class="mb-3 relative overflow-hidden group rounded-lg cursor-pointer"
            role="button"
            @click="getDetail(item.id)"
          >
            <img
              :src="item.imageUrl"
              :alt="item.title"
              class="w-full h-[200px] object-cover object-center rounded-lg"
            >
            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300" />
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[150%] bg-gray-200 px-6 py-2 text-secondary rounded transition-transform duration-300 group-hover:-translate-y-[10%] cursor-pointer">
              Check Details
            </div>
          </div>
          <p class="mb-1 font-bold text-lg text-left">
            {{ item.title }}
          </p>
          <p class="text-gray-500 mb-2 text-left">
            ${{ item.price }} NTD / {{ item.unit }}
          </p>
          <a
            href=""
            class="inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold"
            @click.prevent="addToCart(item.id)"
          >
            <span>Add to cart</span>
          </a>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import { getProduct, getProducts, addToCart } from '@/scripts/api.js';
import alertMixin from '@/mixins/alertMixin.js';
import loadingMixin from '@/mixins/loadingMixin.js';

export default {
  data() {
    return {
      product: [],
      products: [],
      currentImg: '',
      qty: 1,
      data: {
        product_id: '',
        qty: 1,
      },
    };
  },
  methods: {
    getProduct() {
      this.sendLoadingState(true);
      getProduct(this.$route.params.id)
        .then((res) => {
          this.product = res.data.product;
          this.currentImg = this.product.imageUrl;
          this.getProducts();
        }).catch(() => {
          this.alert.msg = 'Fail to get the product';
          this.alert.state = false;
          this.sendMsg();
          this.sendLoadingState(false);
        });
    },
    getProducts() {
      getProducts(1, this.product.category)
        .then((res) => {
          this.products = res.data.products.filter((item) => item.id !== this.product.id);
          this.sendLoadingState(false);
        }).catch(() => {
          this.alert.msg = 'Fail to get the products';
          this.alert.state = false;
          this.sendMsg();
          this.sendLoadingState(false);
        });
    },
    getDetail(id) {
      this.$router.replace(`/product/${id}`);
      setTimeout(() => {
        this.getProduct();
      }, 0);
    },
    addToCart(id, qty = 1) {
      this.data.product_id = id;
      this.data.qty = qty;
      if (this.data.qty < 0) {
        this.alert.msg = 'Quantity should more than 0.';
        this.alert.state = false;
        this.sendMsg();
      } else {
        addToCart(this.data)
          .then(() => {
            this.alert.msg = 'Product added to cart successfully!';
            this.alert.state = true;
            this.sendMsg();
            this.qty = 1;
            this.$emitter.emit('renewCart');
          }).catch((err) => {
            [this.alert.msg] = err.response.data.message;
            this.alert.state = false;
            this.sendMsg();
          });
      }
    },
    minusQty() {
      if (this.qty > 1) {
        this.qty -= 1;
      }
    },
  },
  created() {
    this.getProduct();
  },
  mixins: [alertMixin, loadingMixin],
};
</script>
