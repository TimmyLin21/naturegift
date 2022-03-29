<template lang="">
  <section class="mb-7 py-5">
    <div class="container">
      <h2 class="mb-6 text-secondary d-flex justify-content-between align-items-center">
        <b class="d-block h-2 bg-primary flex-grow-1 bg-opacity-75" />
        <span class="mx-4">See why customers love our products</span>
        <b class="d-block h-2 bg-primary flex-grow-1 bg-opacity-75" />
      </h2>
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-md-6 col-lg-4 mb-4"
            v-for="user in users"
            :key="user.name"
          >
            <div class="d-flex align-items-center">
              <img
                :src="user.imgUrl"
                alt=""
                class="img-fluid rounded-circle me-3"
              >
              <div class="">
                <p class="fw-bold">
                  {{ user.name }}
                </p>
                <p>{{ user.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Reviews',
  data() {
    return {
      users: [
        {
          name: 'Cynthia W.',
          imgUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
          comment: 'Just ordered these for the first time and now that I have them, will be ordering again! The macadamia are awesome 😍.',
        },
        {
          name: 'Terry K.',
          imgUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
          comment: 'I continue to trust Nature Gift as a reliable, high quality company. Your actions and customer service confirm my confidence. Thank you. 🙌🏼',
        },
        {
          name: 'SALLY O.',
          imgUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
          comment: "It's just awesome. Need I say anything else? I feel better. I'm healthier. I'm more energized. I'm like a whole new person! 💪🏼",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
  .h-2 {
    height: 2px;
  }
</style>
