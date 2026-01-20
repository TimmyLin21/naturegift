<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ disabled: !pagination?.has_pre }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="sendRequest(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <template
        v-for="page in pagination?.total_pages"
        :key="page"
      >
        <li
          class="page-item"
          :class="{ active: pagination.current_page === page }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="sendRequest(page)"
          >{{ page }}</a>
        </li>
      </template>
      <li
        class="page-item"
        :class="{ disabled: !pagination?.has_next }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="sendRequest(pagination.current_page + 1)"
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
