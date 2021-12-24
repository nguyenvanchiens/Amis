<template>
  <div class="message" v-show="isShowFormDel">
    <div class="message-content">
      <div class="message-header">
        <div class="header-warning">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="header-text" id="textMgg">
          <span>{{ textMgs }}</span>
        </div>
      </div>
      <div class="messgae-footer">
        <div class="btn-group">
          <button
            type="button"
            @click="hideForm"
            class="m-btn-default btn-close-delete"
          >
            Không
          </button>
          <button @click="Delete" class="btn-delete">Có</button>
        </div>
      </div>
    </div>
    <div class="dialog-background"></div>
  </div>
</template>
<script>
export default {
  props: {
    textMgs: String,
  },
  data() {
    return {
      isShowFormDel: false,
    };
  },
  methods: {
    showForm() {
      this.isShowFormDel = true;
    },
    hideForm() {
      this.isShowFormDel = false;
    },
    Delete() {
      this.$emit("Delete");
    },
  },
};
</script>
<style scoped></style>
