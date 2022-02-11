<template>
  <main class="container py-6">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <div>
        <p class="text-start">FILTER BY</p>
        <ul class="nav">
          <li class="me-3">
            <a href="" class="c-btn">
              <span class="c-btn__text">Nuts</span>
            </a>
          </li>
          <li class="me-3">
            <a href="" class="c-btn">
              <span class="c-btn__text">Beans</span>
            </a>
          </li>
          <li class="">
            <a href="" class="c-btn">
              <span class="c-btn__text">Spices</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <label name="sort" class="text-end d-block mb-2">SORT BY</label>
        <div class="c-select">
          <div class="c-select__selected">Please select</div>
        </div>
        <!-- <div class="c-select__items">
          <div>Name</div>
          <div>Price: low to high</div>
          <div>Price: high to low</div>
        </div> -->
      </div>
    </div>
    <ul class="row row-cols-1 row-cols-md-2 row-cols-lg-3 list-style-none">
      <li class="col mb-4">
        <div class="mb-3 product__img" role="button">
          <img src="https://images.unsplash.com/photo-1583949885751-23b7d1909378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" class="img-fluid rounded">
          <div class="bg-dark product__img__lightbox"></div>
          <div class="product__img__text mb-3">
            Check Details
          </div>
        </div>
        <p class="mb-1">Turmeric Madras Ground</p>
        <p class="text-muted">$120 NTD</p>
        <a href="" class="c-btn">
          <span class="c-btn__text">Add to cart</span>
        </a>
      </li>
      <li class="col mb-4">
        <div class="mb-3 product__img" role="button">
          <img src="https://images.unsplash.com/photo-1583949885751-23b7d1909378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" class="img-fluid rounded">
          <div class="bg-dark product__img__lightbox"></div>
          <div class="product__img__text mb-3">
            Check Details
          </div>
        </div>
        <p class="mb-1">Turmeric Madras Ground</p>
        <p class="text-muted">$120 NTD</p>
        <a href="" class="c-btn">
          <span class="c-btn__text">Add to cart</span>
        </a>
      </li>
      <li class="col mb-4">
        <div class="mb-3 product__img" role="button">
          <img src="https://images.unsplash.com/photo-1583949885751-23b7d1909378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" class="img-fluid rounded">
          <div class="bg-dark product__img__lightbox"></div>
          <div class="product__img__text mb-3">
            Check Details
          </div>
        </div>
        <p class="mb-1">Turmeric Madras Ground</p>
        <p class="text-muted">$120 NTD</p>
        <a href="" class="c-btn">
          <span class="c-btn__text">Add to cart</span>
        </a>
      </li>
      <li class="col mb-4">
        <div class="mb-3 product__img" role="button">
          <img src="https://images.unsplash.com/photo-1583949885751-23b7d1909378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" class="img-fluid rounded">
          <div class="bg-dark product__img__lightbox"></div>
          <div class="product__img__text mb-3">
            Check Details
          </div>
        </div>
        <p class="mb-1">Turmeric Madras Ground</p>
        <p class="text-muted">$120 NTD</p>
        <a href="" class="c-btn">
          <span class="c-btn__text">Add to cart</span>
        </a>
      </li>
    </ul>
  </main>
</template>
<script>
export default {

};
</script>
<style lang="scss">
</style>
