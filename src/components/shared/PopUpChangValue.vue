<template>
  <div class="message" v-show="isShowAlert">
    <div class="message-content">
      <div class="message-header">
        <div class="m-icon m-icon-question mi-48"></div>
        <div class="header-text" id="textMgg">
          <span style="margin-left: 20px"
            >Dữ liệu đã được thay đổi bạn có muốn lưu hay không?</span
          >
        </div>
      </div>
      <div class="messgae-footer">
        <div class="btn-group">
          <div class="btn-group-left">
            <button
              @click="closeFormAlert"
              type="button"
              class="m-btn-default btn-close-delete"
            >
              Hủy
            </button>
          </div>
          <div class="btn-group-right">
            <button
              @click="clearForm"
              type="button"
              class="m-btn-default btn-close-delete"
            >
              Không
            </button>
            <button class="btn-delete" @click="saveAndClose">Có</button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-background" style="z-index: 220"></div>
  </div>
</template>
<script>
export default {
  props: {
    isShowAlert: Boolean,
  },
  methods: {
    closeFormAlert() {
      this.$emit("closeFormAlert");
    },
    clearForm() {
      this.$emit("clearForm");
    },
    saveAndClose() {
      this.$emit("saveAndClose");
    },
  },
};
</script>
<style scoped>
.m-btn-default {
  margin-right: 10px;
}
</style>
