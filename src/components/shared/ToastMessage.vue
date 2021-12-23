<template>
  <div class="m-toast .m-toast-success" v-show="isShowToast">
    <i class="fas fa-check-circle" style="color: green"></i>
    <div class="m-toast-text">{{ toastText }}</div>
    <span
      class="fas fa-times"
      style="cursor: pointer; margin-left: 10px; color: green"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    isShowToast: {
      Type: Boolean,
      default: true,
    },
    toastColor: String,
    toastText: {
      Type: String,
      default: "",
    },
  },
};
</script>

<style>
.m-toast {
  position: absolute;
  top: 70px;
  left: 600px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  min-width: 200px;
  max-width: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 16px;
  animation-name: toogle;
  animation-duration: 1.5s;
}

.m-toast-text {
  flex: 1;
  padding-left: 8px;
}

.m-toast > span:hover {
  opacity: 0.6;
}
@keyframes toogle {
  0% {
    top: 0px;
  }
}
</style>
