<template>
  <section class="col-12 col-md-5">
    <h2 class="mb-4">
      Contact Info
    </h2>
    <v-form
      class="row g-3 text-start mb-4"
      @submit="checkOut"
      v-slot="{ errors }"
    >
      <div class="col-12">
        <label
          for="email"
          class="form-label"
          name="Email"
        >Email
          <span class="text-danger">*</span>
        </label>
        <v-field
          type="email"
          id="email"
          class="form-control"
          name="Email"
          :class="{ 'is-invalid': errors['Email'] }"
          rules="required|email"
          placeholder="Please enter email"
          v-model="data.user.email"
        />
        <ErrorMessage
          name="Email"
          class="invalid-feedback"
        />
      </div>
      <div class="col-md-6">
        <label
          for="name"
          class="form-label"
          name="Name"
        >Name
          <span class="text-danger">*</span>
        </label>
        <v-field
          type="text"
          class="form-control"
          id="name"
          name="Name"
          :class="{ 'is-invalid': errors['Name'] }"
          rules="required"
          placeholder="Please enter name"
          v-model="data.user.name"
        />
        <ErrorMessage
          name="Name"
          class="invalid-feedback"
        />
      </div>
      <div class="col-md-6">
        <label
          for="phone"
          class="form-label"
          name="Phone"
        >Phone
          <span class="text-danger">*</span>
        </label>
        <v-field
          type="text"
          class="form-control"
          id="phone"
          name="Phone"
          :class="{ 'is-invalid': errors['Phone'] }"
          :rules="isPhone"
          placeholder="Please enter phone, 09xxxxxxxx"
          v-model="data.user.tel"
        />
        <ErrorMessage
          name="Phone"
          class="invalid-feedback"
        />
      </div>
      <div class="col-12">
        <label
          for="address"
          class="form-label"
          name="Address"
        >Address
          <span class="text-danger">*</span>
        </label>
        <v-field
          type="text"
          class="form-control"
          id="address"
          name="Address"
          :class="{ 'is-invalid': errors['Address'] }"
          rules="required"
          placeholder="Please enter address"
          v-model="data.user.address"
        />
        <ErrorMessage
          name="Address"
          class="invalid-feedback"
        />
      </div>
      <div class="col-12 mb-4">
        <label
          for="notes"
          class="form-label"
          name=""
        >Notes</label>
        <textarea
          class="form-control"
          id="notes"
          placeholder="Notes about your order..."
        />
      </div>
      <div class="col-12 text-center">
        <button
          class="c-btn"
          type="submit"
        >
          <span class="c-btn__text">Checkout</span>
        </button>
      </div>
    </v-form>
  </section>
</template>

<script>
import { postOrder } from '@/scripts/api';
import alertMixin from '@/mixins/alertMixin';

export default {
  data() {
    return {
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    checkOut() {
      postOrder(this.data)
        .then((res) => {
          this.alert.msg = 'Order created successfully!';
          this.alert.state = true;
          this.sendMsg();
          this.$emitter.emit('renewCart');
          this.$router.push(`/payment/${res.data.orderId}`);
        }).catch(() => {
          this.alert.msg = 'Failed to create order!';
          this.alert.state = false;
          this.sendMsg();
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : 'Please enter correct phone number.';
    },
  },
  mixins: [alertMixin],
};
</script>
