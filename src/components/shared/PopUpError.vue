<template>
  <div class="message" v-show="isShow">
    <div
      class="message-content"
      style="
        box-shadow: 2px 1px 7px -1px #a09898;
        top: 44%;
        z-index: 220;
        width: 371px;
        height: 143px;
      "
    >
      <div class="message-header">
        <div class="header-warning">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="header-text" id="textMgg">
          <span>{{ textMgs }}</span>
        </div>
      </div>
      <div class="messgae-footer">
        <div class="btn-group" style="justify-content: flex-end">
          <button @click="hideForm" class="btn-delete">Ok</button>
        </div>
      </div>
    </div>
    <div class="dialog-background" style="z-index: 200"></div>
  </div>
</template>
<script>
export default {
  props: {
    textMgs: String,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showForm() {
      this.isShow = true;
    },
    hideForm() {
      this.isShow = false;
    },
  },
};
</script>
<style scoped></style>
