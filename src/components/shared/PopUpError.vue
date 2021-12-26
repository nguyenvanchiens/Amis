<template>
  <div class="message" v-show="isShow">
    <div class="message-content">
      <div class="message-header">
        <div class="m-icon mi-48 mi-exclamation-error-48-2"></div>
        <div class="header-text" id="textMgg" style="margin-left: 10px">
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
<style scoped>
.message-content {
  box-shadow: 2px 1px 7px -1px #a09898;
  top: 44%;
  z-index: 220;
  width: 371px;
  height: 143px;
  animation: fadein 0.1s;
}
.message-content {
  z-index: 260 !important;
  transition: all 1s;
}
.dialog-background {
  z-index: 250 !important;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
