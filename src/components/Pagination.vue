<template>
<nav aria-label="Page navigation">
    <ul class="flex justify-center list-none">
      <li
        class=""
        :class="{ 'opacity-50 cursor-not-allowed': !pagination?.has_pre }"
      >
        <a
          class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
          href="#"
          aria-label="Previous"
          @click.prevent="!pagination?.has_pre ? null : sendRequest(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <template
        v-for="page in pagination?.total_pages"
        :key="page"
      >
        <li
          class=""
          :class="{ 'z-10': pagination.current_page === page }"
        >
          <a
            class="block px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            :class="pagination.current_page === page ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white'"
            href="#"
            @click.prevent="sendRequest(page)"
          >{{ page }}</a>
        </li>
      </template>
      <li
        class=""
        :class="{ 'opacity-50 cursor-not-allowed': !pagination?.has_next }"
      >
        <a
          class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
          href="#"
          aria-label="Next"
          @click.prevent="!pagination?.has_next ? null : sendRequest(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    sendRequest(page) {
      this.$emit('send-request', page);
    },
  },
  emits: ['send-request'],
};
</script>
