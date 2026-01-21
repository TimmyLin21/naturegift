<template>
  <section class="w-full">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">
      Contact Info
    </h2>
    <v-form
      class="grid grid-cols-12 gap-4 mb-4"
      @submit="checkOut"
      v-slot="{ errors }"
    >
      <div class="col-span-12">
        <label
          for="email"
          class="block text-left text-gray-700 font-bold mb-2"
          name="Email"
        >Email
          <span class="text-red-500">*</span>
        </label>
        <v-field
          :validate-on-input="false"
          :validate-on-blur="false"
          :validate-on-change="false"
          type="email"
          id="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          name="Email"
          :class="{ 'border-red-500 focus:ring-red-500': errors.Email }"
          rules="required|email"
          placeholder="Please enter email"
          v-model="data.user.email"
        />
        <ErrorMessage
          name="Email"
          class="text-red-500 text-sm mt-1 block"
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <label
          for="name"
          class="block text-left text-gray-700 font-bold mb-2"
          name="Name"
        >Name
          <span class="text-red-500">*</span>
        </label>
        <v-field
          :validate-on-input="false"
          :validate-on-blur="false"
          :validate-on-change="false"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          id="name"
          name="Name"
          :class="{ 'border-red-500 focus:ring-red-500': errors.Name }"
          rules="required"
          placeholder="Please enter name"
          v-model="data.user.name"
        />
        <ErrorMessage
          name="Name"
          class="text-red-500 text-sm mt-1 block"
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <label
          for="phone"
          class="block text-left text-gray-700 font-bold mb-2"
          name="Phone"
        >Phone
          <span class="text-red-500">*</span>
        </label>
        <v-field
          :validate-on-input="false"
          :validate-on-blur="false"
          :validate-on-change="false"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          id="phone"
          name="Phone"
          :class="{ 'border-red-500 focus:ring-red-500': errors.Phone }"
          :rules="isPhone"
          placeholder="Please enter phone number"
          v-model="data.user.tel"
        />
        <ErrorMessage
          name="Phone"
          class="text-red-500 text-sm mt-1 block"
        />
      </div>
      <div class="col-span-12">
        <label
          for="address"
          class="block text-left text-gray-700 font-bold mb-2"
          name="Address"
        >Address
          <span class="text-red-500">*</span>
        </label>
        <v-field
          :validate-on-input="false"
          :validate-on-blur="false"
          :validate-on-change="false"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          id="address"
          name="Address"
          :class="{ 'border-red-500 focus:ring-red-500': errors.Address }"
          rules="required"
          placeholder="Please enter address"
          v-model="data.user.address"
        />
        <ErrorMessage
          name="Address"
          class="text-red-500 text-sm mt-1 block"
        />
      </div>
      <div class="col-span-12 mb-4">
        <label
          for="notes"
          class="block text-left text-gray-700 font-bold mb-2"
          name=""
        >Notes</label>
        <textarea
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          id="notes"
          rows="3"
          placeholder="Notes about your order..."
        />
      </div>
      <div class="col-span-12 text-center">
        <button
          class="bg-secondary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 font-bold w-full md:w-auto shadow-md transform hover:-translate-y-1"
          type="submit"
        >
          <span>Checkout</span>
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
      if (!value) return 'Phone number is required.';
      // Allow international formats: +123..., (02)..., spaces, dashes
      // Must have at least 8 digits and allow +, -, (, ), space
      const validFormat = /^[+\d\s-()]*$/;
      const digitCount = (value.match(/\d/g) || []).length;
      
      return (validFormat.test(value) && digitCount >= 8 && digitCount <= 20) 
        ? true 
        : 'Please enter a valid phone number.';
    },
  },
  mixins: [alertMixin],
};
</script>
