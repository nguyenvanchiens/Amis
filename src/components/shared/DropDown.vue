<template>
  <div class="scombobox">
    <input
      type="text"
      class="s-combobox-input"
      v-model="textSearch"
      ref="txtFilter"
      @keyup="filterData($event)"
      :class="{
        'm-input-error': $v.textSearch.$error,
      }"
      @blur="$v.textSearch.$touch()"
      :title="$v.textSearch.$error ? titleDepartmentNameIsNull : null"
    />
    <div @click="showData" class="s-combobox-buton">
      <i class="fas fa-sort-down"></i>
    </div>
    <div class="s-combobox-data" v-show="isShow">
      <div
        class="s-combobox-item"
        v-for="(option, index) in options"
        :key="index"
        @click="select(option)"
      >
        {{ option.departmentName }}
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    originalOptions: Array,
    titleDepartmentNameIsNull: String,
  },
  data() {
    return {
      isShow: false,
      options: [],
      textSearch: "",
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
     * Lọc dữ liệu data
     * Created: NVChien(27/12/2021)
     */
    filterData(event) {
      if (event.target.value) {
        this.options = this.originalOptions;
        this.options = this.options.filter(function (item) {
          if (
            item &&
            item.departmentName &&
            item.departmentName
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          ) {
            return true;
          }
          return false;
        });
      }
      this.isShow = true;
    },
    /**
     * lấy ra dữ liệu và gọi lên cha
     * Author: NVChien (9/12/2021)
     */
    select(option) {
      this.isShow = !this.isShow;
      this.textSearch = option.departmentName;
      this.$emit("select", option);
    },
  },
  validations: {
    textSearch: {
      required,
    },
  },
};
</script>

<style scoped></style>
