<template>
  <div class="scombobox">
    <input
      type="text"
      id=""
      class="s-combobox-input"
      :text="textNameValue"
      v-model="textNameValue"
    />
    <div @click="showData" class="s-combobox-buton">
      <i class="fas fa-sort-down"></i>
    </div>
    <div class="s-combobox-data" v-show="isShow">
      <div
        class="s-combobox-item"
        value="1"
        v-for="(option, index) in options"
        :key="index"
        @click="select(option)"
      >
        {{ option.DepartmentName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: Array,
    textNameValue: String,
  },
  data() {
    return {
      Department: [],
      isShow: false,
    };
  },
  methods: {
    /**
     * Hiện cbb department
     * Author: NVChien (9/12/2021)
     */
    showData() {
      this.isShow = !this.isShow;
    },
    /**
     * lấy ra dữ liệu và gọi lên cha
     * Author: NVChien (9/12/2021)
     */
    select(option) {
      this.isShow = !this.isShow;
      this.$emit("select", option);
    },
  },
};
</script>

<style scoped></style>
