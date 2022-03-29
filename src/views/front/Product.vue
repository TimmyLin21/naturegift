<template>
  <section class="container py-5 mt-150px">
    <div class="row row-cols-1 row-cols-lg-2 mb-5">
      <div class="col">
        <img
          :src="currentImg"
          :alt="product.title"
          class="w-100 border h-250px object-cover object-position-center"
        >
        <div class="row row-cols-3 mt-3">
          <div class="col">
            <img
              :src="product.imageUrl"
              :alt="product.title"
              class="w-100 object-cover object-position-center border h-100px cursor-pointer"
              @click="currentImg = product.imageUrl"
            >
          </div>
          <div
            class="col"
            v-for="image in product.imagesUrl"
            :key="image"
          >
            <img
              :src="image"
              :alt="product.title"
              class="mw-100 object-cover object-position-center border h-100px cursor-pointer"
              @click="currentImg = image"
            >
          </div>
        </div>
      </div>
      <div class="col text-start">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link
                to="/"
                class="text-decoration-none link-success"
              >
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link
                to="/products"
                class="text-decoration-none link-success"
              >
                Products
              </router-link>
            </li>
            <li
              class="breadcrumb-item active fw-bold"
              aria-current="page"
            >
              {{ product.category }}
            </li>
          </ol>
        </nav>
        <h2 class="">
          {{ product.title }}
        </h2>
        <p class="text-muted">
          {{ product.description }}
        </p>
        <p class="text-muted mb-4">
          Weight: {{ product.unit }}
        </p>
        <p class="h3 mb-4">
          <span
            v-if="product.origin_price"
            class="text-danger text-decoration-line-through me-2"
          >
            $ {{ product.origin_price }}
          </span>
          $ {{ product.price }}
        </p>
        <div class="d-flex mb-4">
          <div class="qty me-5">
            <span><BIconDashCircle @click="minusQty" /></span>
            <input
              class="text-center"
              type="number"
              v-model.number="qty"
              min="1"
            >
            <span><BIconPlusCircle @click="qty += 1" /></span>
          </div>
          <a
            href="#"
            class="c-btn"
            @click.prevent="addToCart(product.id, qty)"
          >
            <span class="c-btn__text">Add to cart</span>
          </a>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-lg-2 mb-5">
      <div class="col text-start pt-5">
        <h3 class="mb-3">
          Description
        </h3>
        <p>{{ product.content }}</p>
      </div>
      <div class="col">
        <div class="c-table">
          <h4 class="text-white py-3">
            Nutritional Information
          </h4>
          <div class="c-table__body">
            <p><span />Per 100g</p>
            <p>Energy (kg)<span>{{ product.calories }}</span></p>
            <p>Carbohydrate (g)<span>{{ product.carbohydrate }}</span></p>
            <p>Protein (g)<span>{{ product.protein }}</span></p>
            <p>Fat (g)<span>{{ product.fat }}</span></p>
            <p class="mb-0 border-0">
              Fiber (g)<span>{{ product.fiber }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="mb-5">
      Have you tried?
    </h3>
    <ul class="row row-cols-1 row-cols-md-2 row-cols-lg-3 list-style-none">
      <template
        v-for="(item, index) in products"
        :key="item.id"
      >
        <li
          class="col mb-4"
          v-if="index < 3"
        >
          <div
            class="mb-3 product__img"
            role="button"
            @click="getDetail(item.id)"
          >
            <img
              :src="item.imageUrl"
              :alt="item.title"
              class="img-fluid rounded"
            >
            <div class="bg-dark product__img__lightbox" />
            <div class="product__img__text mb-3">
              Check Details
            </div>
          </div>
          <p class="mb-1">
            {{ item.title }}
          </p>
          <p class="text-muted">
            ${{ item.price }} NTD / {{ item.unit }}
          </p>
          <a
            href=""
            class="c-btn"
            @click.prevent="addToCart(item.id)"
          >
            <span class="c-btn__text">Add to cart</span>
          </a>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import { getProduct, getProducts, addToCart } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';
import loadingMixin from '@/mixins/loadingMixin';

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
