<template>
  <div>
    <Paginate
      :page-count="totalPages"
      :click-handler="changePageNumber"
      :containerClass="'pagination'"
      class="pagination"
      v-model="pageNumber"
    >
    </Paginate>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      pageNumber: 0,
    };
  },
  props: {
    totalPages: Number,
  },
  methods: {
    changePageNumber(pageNum) {
      this.pageNumber = pageNum;
      this.$emit("changePage", this.pageNumber);
    },
  },
};
</script>

<style>
.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-left: 10px;
}
.pagination a {
  float: left;
  padding: 4px 8px;
}

.pagination a.active {
  background-color: green;
}

.pagination a:hover:not(.active) {
  border: 1px solid #ddd;
  background-color: white;
}
</style>
