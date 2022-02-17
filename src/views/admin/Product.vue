<template>
  <main class="bg-light w-100">
    <div class="container py-4">
      <div class="d-flex justify-content-between mb-4">
        <select class="form-select w-10">
          <option selected>All</option>
          <option value="1">1</option>
        </select>
        <button class="btn btn-secondary text-white" data-bs-toggle="modal"
        data-bs-target="#productModal">
          Add new product
        </button>
      </div>
      <table class="table">
        <thead>
          <tr class="table-secondary text-secondary">
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Origin Price</th>
            <th scope="col">Price</th>
            <th scope="col">Unit</th>
            <th scope="col">Enabled</th>
          </tr>
        </thead>
        <tbody class="border-top-0">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </main>
<!-- Modal -->
<div class="modal fade" id="productModal" tabindex="-1"
aria-labelledby="productModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5 class="modal-title text-secondary" id="productModalLabel">Add New Product</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-pills bg-success p-2 mb-3">
          <li class="nav-item">
            <a class="nav-link active">Info</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Content</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Nutrition</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Images</a>
          </li>
        </ul>
        <form class="row g-3">
          <div class="col-3">
            <label for="category" class="form-label">Category</label>
            <select id="category" class="form-select">
              <option value="bean">Bean</option>
            </select>
          </div>
          <div class="col-9">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title"
            placeholder="Product title">
          </div>
          <div class="col-4">
            <label for="originPrice" class="form-label">Origin Price</label>
            <input type="number" class="form-control" id="originPrice"
            placeholder="Product origin price">
          </div>
          <div class="col-4">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control" id="price"
            placeholder="Product price">
          </div>
          <div class="col-4">
            <label for="unit" class="form-label">Unit</label>
            <input type="text" class="form-control" id="unit"
            placeholder="Product unit">
          </div>
          <hr class="mb-0">
          <div class="col">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
              <label class="form-check-label" for="flexSwitchCheckChecked">Enable product</label>
            </div>
          </div>
        </form>
        <form class="row g-3">
          <div class="col-12">
            <label for="content" class="form-label">Content</label>
            <input class="form-control" id="content" type="text"
            placeholder="Product content">
          </div>
          <div class="col-12">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description"
            placeholder="Product description" />
          </div>
        </form>
        <form class="row g-3">
          <div class="col-6">
            <label for="calories" class="form-label">Calories (kg)</label>
            <input id="calories" type="number" min="0" class="form-control"
            placeholder="Product calories">
          </div>
          <div class="col-6">
            <label for="carbohydrate" class="form-label">Carbohydrate (g)</label>
            <input id="carbohydrate" type="number" min="0" class="form-control"
            placeholder="Product carbohydrate">
          </div>
          <div class="col-6">
            <label for="protein" class="form-label">Protein (g)</label>
            <input id="protein" type="number" min="0" class="form-control"
            placeholder="Product protein">
          </div>
          <div class="col-6">
            <label for="fat" class="form-label">Fat (g)</label>
            <input id="fat" type="number" min="0" class="form-control"
            placeholder="Product fat">
          </div>
          <div class="col-6">
            <label for="fiber" class="form-label">Fiber (g)</label>
            <input id="fiber" type="number" min="0" class="form-control"
            placeholder="Product fiber">
          </div>
        </form>
        <div class="d-flex my-3">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/panya/1627475396914.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=FheeG0HUO7LM0l0AbBvH3W15wlHc0vN0CeYnRIgG4K3Pv8hxF83wFlrqKefPuQwNTWiYXok1VUpJXkl3aiw8uMwGJXfNpXCET64iFhTeeKMCn09RXcZORPfPNtn%2BrKbtISSmOQqf%2BaOrAxSK%2FbmAjdcNmTy4BGxRy9lZ%2BNKUj19wdy04PEJo4vUTzd1HXn0RI9z5N%2Fo5b7GwoMDMt0nPtuFBUTtiMiedISpGzCNZ8WIngB%2F%2B%2BuuTgZALpQmGk3BcGl%2BEqcbhfy7%2F3eZHC7RCFNvjSFPlG8eAZyG%2FxZrlr7ME7cw5Ue5F8SUPBoUHgt%2Brkt4ePzPsZBE%2B%2F1gjbMF45g%3D%3D"
          alt="" class="w-33 rounded">
        </div>
        <label for="image-address" class="form-label">Image address</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Image address" id="image-address">
          <button class="btn btn-outline-success" type="button">Upload link</button>
        </div>
        <label for="image-file" class="form-label">Image file</label>
        <div class="input-group mb-3">
          <input type="file" class="form-control" placeholder="Image file" id="image-file">
          <button class="btn btn-outline-success" type="button">Upload link</button>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary text-secondary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      products: '',
      apiInfo: {
        baseUrl: 'https://vue3-course-api.hexschool.io',
        path: 'timtest',
      },
    };
  },
  methods: {
    getProducts() {
      this.$http.get(`${this.apiInfo.baseUrl}/v2/api/${this.apiInfo.path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
<style lang="">
</style>
