<template>
  <section
    class="my-20 pb-4 bg-secondary shadow-lg"
    id="OurStory"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="wow fadeInLeft"
          data-wow-duration="2s"
          data-wow-offset="50"
        >
          <figure class="-mt-12">
            <img
              src="@/assets/images/OurStoryImg.jpeg"
              alt="A lots of fresh nuts."
              class="rounded max-w-full h-auto md:h-[500px] object-cover"
            >
          </figure>
        </div>
        <div
          class="wow fadeInRight"
          data-wow-duration="2s"
          data-wow-offset="10"
        >
          <div class="py-12 text-primary text-left p-3">
            <h2 class="mb-12 text-4xl font-bold">
              Our Story
            </h2>
            <p class="mb-8 leading-relaxed">
              Launched in 2022, Nature Gift is a superfoods and spices supplier.
              We searched the world to bring you nature's finest foods with exceptionally high
              nutritional profiles.
            </p>
            <p class="mb-12 leading-relaxed">
              Nature Gift sources 100% Fairtrade products.
              We believe farmers and workers deserve a decent income and work.
              Our products undergo minimal processing to ensure
              maximum nutrients are maintained from the point of harvest.
            </p>
            <ul class="flex justify-between px-12 list-none m-0">
              <li class="text-center">
                <font-awesome-icon
                  icon="balance-scale"
                  class="text-4xl block mx-auto"
                />
                <span class="block mt-2">Fair</span>
              </li>
              <li class="text-center">
                <font-awesome-icon
                  icon="medal"
                  class="text-4xl block mx-auto"
                />
                <span class="block mt-2">Quality</span>
              </li>
              <li class="text-center">
                <font-awesome-icon
                  icon="leaf"
                  class="text-4xl block mx-auto"
                />
                <span class="block mt-2">Nature</span>
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
