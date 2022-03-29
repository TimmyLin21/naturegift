<template>
  <section
    class="my-7 pb-4 bg-secondary shadow-lg"
    id="OurStory"
  >
    <div class="container d-flex justify-content-between">
      <div class="row row-cols-1 row-cols-md-2">
        <div class="col">
          <figure class="mt-n5">
            <img
              src="https://images.unsplash.com/photo-1600189083288-89e1c8b9b0cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
              class="rounded img-fluid"
            >
          </figure>
        </div>
        <div class="col">
          <div class="py-5 text-primary text-start p-3">
            <h2 class="mb-5">
              Our Story
            </h2>
            <p class="mb-4">
              Launched in 2022, Nature Gift is a superfoods and spices supplier.
              We searched the world to bring you nature's finest foods with exceptionally high
              nutritional profiles.
            </p>
            <p class="mb-5">
              Nature Gift sources 100% Fairtrade products.
              We believe farmers and workers deserve a decent income and work.
              Our products undergo minimal processing to ensure
              maximum nutrients are maintained from the point of harvest.
            </p>
            <ul class="nav justify-content-between px-5">
              <li class="text-center">
                <font-awesome-icon
                  icon="balance-scale"
                  class="display-5"
                />
                <span class="d-block mt-2">Fair</span>
              </li>
              <li class="text-center">
                <font-awesome-icon
                  icon="medal"
                  class="display-5"
                />
                <span class="d-block mt-2">Quality</span>
              </li>
              <li class="text-center">
                <font-awesome-icon
                  icon="leaf"
                  class="display-5"
                />
                <span class="d-block mt-2">Nature</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OurStory',
};
</script>
