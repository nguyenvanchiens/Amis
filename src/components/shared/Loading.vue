<template>
  <div class="loading" v-show="isLoading">
    <div class="loading-icon"></div>
    <div class="dialog-background"></div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    showLoading() {
      setTimeout(() => {
        this.isLoading = !this.isLoading;
      }, 0);
      setTimeout(() => {
        this.isLoading = !this.isLoading;
      }, 1000);
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
  setup() {},
};
</script>
<style scoped></style>
