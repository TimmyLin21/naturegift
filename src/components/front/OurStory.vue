<template>
  <section
    class="my-7 pb-4 bg-secondary shadow-lg"
    id="OurStory"
  >
    <div class="container d-flex justify-content-between">
      <div class="row row-cols-1 row-cols-md-2">
        <div
          class="col wow fadeInLeft"
          data-wow-duration="2s"
          data-wow-offset="50"
        >
          <figure class="mt-n5">
            <img
              src="@/assets/images/OurStoryImg.jpeg"
              alt="A lots of fresh nuts."
              class="rounded img-fluid h-500px"
            >
          </figure>
        </div>
        <div
          class="col wow fadeInRight"
          data-wow-duration="2s"
          data-wow-offset="10"
        >
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
