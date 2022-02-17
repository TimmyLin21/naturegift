<template>
  <main class="container py-5">
    <div class="steps mb-7">
      <div class="steps__circle steps__circle-done">
        <BIconCart width="2rem" height="2rem"></BIconCart>
        <div class="steps__text">
          <p>Checkout</p>
        </div>
      </div>
      <div class="steps__circle steps__circle-active">
        <BIconCreditCard width="2rem" height="2rem"></BIconCreditCard>
        <div class="steps__text">
          <p>Payment</p>
        </div>
      </div>
      <div class="steps__circle">
        <BIconStar width="2rem" height="2rem"></BIconStar>
        <div class="steps__text">
          <p>Finish</p>
        </div>
      </div>
    </div>
    <div class="row gx-5">
      <section class="col-12 col-md-7 mb-4">
        <h2 class="mb-4">Your cart</h2>
        <table class="table mb-4">
          <thead>
            <tr>
              <th scope="col" colspan="2">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="20%">
                <img src="https://images.unsplash.com/photo-1583949885751-23b7d1909378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" class="img-fluid">
              </td>
              <td>
                <p class="mb-0">Turmeric Madras Ground</p>
                <small class="text-start">Size: 45g</small>
              </td>
              <td>
                <p class="mb-0"><del class="text-danger">NT$ 80</del></p>
                <p class="mb-0">NT$ 70</p>
              </td>
              <td width="10%">
                <input type="number" min="0" value="1" class="w-100">
              </td>
              <td>
                NT$ 70
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Subtotal</td>
              <td colspan="2" class="text-end text-danger"><del>NTD$ 70</del></td>
            </tr>
            <tr>
              <td colspan="5" class="text-end border-bottom-0">NTD$ 30</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Coupon"
          aria-label="Coupon" aria-describedby="coupon-apply">
          <button class="btn btn-outline-secondary" type="button" id="coupon-apply">Apply</button>
        </div>
      </section>
      <section class="col-12 col-md-5">
        <h2 class="mb-4">Contact Info</h2>
        <form class="row g-3 text-start mb-4">
          <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control">
          </div>
          <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name">
          </div>
          <div class="col-md-6">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="phone">
          </div>
          <div class="col-12">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address">
          </div>
          <div class="col-12">
            <label for="notes" class="form-label">Notes</label>
            <textarea class="form-control" id="notes" />
          </div>
        </form>
        <a href="#" class="c-btn">
          <span class="c-btn__text">Checkout</span>
        </a>
      </section>
    </div>
  </main>
</template>
<script>
export default {

};
</script>
<style lang="scss">
</style>
