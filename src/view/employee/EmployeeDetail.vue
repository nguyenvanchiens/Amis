<template>
  <div
    class="m-modal"
    v-show="isShow"
    employee="employee"
    EmployeeId="EmployeeId"
  >
    <div class="m-dialog">
      <div class="m-dialog-header">
        <div class="m-dialog-title">
          <h2>Thông tin nhân viên</h2>
          <div class="input-group-lable">
            <input type="checkbox" name="" id="m-customer-checked" />
            <label for="customer">Là khách hàng</label>
          </div>
          <div class="input-group-lable">
            <input type="checkbox" name="" id="m-supplier-checked" />
            <label for="supplier">Là nhà cung cấp</label>
          </div>
        </div>
        <div class="m-dialog-close">
          <button class="m-btn-question">
            <i class="far fa-question-circle"></i>
          </button>
          <button @click="hideForm" class="m-btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="form-info">
          <div class="form-info-left">
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Mã <span>*</span></label>
                <input
                  v-model="employee.employeeCode"
                  type="text"
                  class="m-input m-input-employeecode"
                  name=""
                  id="txtemployeecode"
                />
              </div>
              <div class="form-group">
                <label for="">Tên <span>*</span></label>
                <input
                  v-model="employee.employeeName"
                  type="text"
                  class="m-input m-input-fullname"
                  name=""
                  id="txtfullname"
                />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Đơn vị <span>*</span></label>
                <DropDown
                  :options="Department"
                  @select="selectOptionDepartment"
                  :value="employee.departmentName"
                />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Chức danh <span>*</span></label>
                <div class="scombobox">
                  <input
                    type="text"
                    v-model="employee.employeePosition"
                    id=""
                    class="s-combobox-input"
                  />
                  <!-- <div class="s-combobox-buton">
                    <i class="fas fa-sort-down"></i>
                  </div>
                  <div class="s-combobox-data"></div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="form-info-right">
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Ngày sinh <span>*</span></label>
                <input
                  type="date"
                  v-model="employee.dateOfBirth"
                  class="m-input m-input-dateofbirth"
                  name=""
                  id="dtdateofbirth"
                />
              </div>
              <div class="form-group">
                <label for="" class="lbgender">Giới tính <span>*</span></label>
                <div class="group-radio">
                  <div class="group-radio-item">
                    <input
                      v-model="employee.gender"
                      type="radio"
                      class=""
                      value="1"
                      name="gender"
                      id="rdgenderFale"
                    />
                    <label for="">Nam</label>
                  </div>
                  <div class="group-radio-item">
                    <input
                      v-model="employee.gender"
                      type="radio"
                      class=""
                      value="0"
                      name="gender"
                      id="rdgenderMale"
                    />
                    <label for="">Nữ</label>
                  </div>
                  <div class="group-radio-item">
                    <input
                      v-model="employee.gender"
                      type="radio"
                      class=""
                      value="2"
                      name="gender"
                      id="rdgendercc"
                    />
                    <label for="">Khác</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Số chứng minh thư nhân dân</label>
                <input
                  type="text"
                  v-model="employee.identityNumber"
                  class="m-input m-input-card"
                  name=""
                  id="dtdateofbirth"
                />
              </div>
              <div class="form-group">
                <label for="">Ngày cấp</label>
                <input
                  type="date"
                  v-model="employee.identityDate"
                  class="m-input m-input-dateofbirth"
                  name=""
                  id="dtdateofbirth"
                />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Nơi cấp</label>
                <input
                  type="text"
                  v-model="employee.identityPlace"
                  class="m-input m-input-issued-by"
                  name=""
                  id="txtfullname"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-contact">
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Địa chỉ</label>
              <input
                type="text"
                v-model="employee.address"
                class="m-input m-input-address"
                name=""
                id="txtfullname"
              />
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Đt di động</label>
              <input
                type="text"
                v-model="employee.phoneNumber"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Đt cố định</label>
              <input
                type="text"
                v-model="employee.telephoneNumber"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Email</label>
              <input
                type="text"
                v-model="employee.email"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Tài khoản ngân hàng</label>
              <input
                type="text"
                v-model="employee.bankAccountNumber"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Tên ngân hàng</label>
              <input
                type="text"
                v-model="employee.bankName"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Chi nhánh</label>
              <input
                type="text"
                v-model="employee.bankBranchName"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
          </div>
        </div>
        <div class="m-dialog-footer">
          <div>
            <button
              type="button"
              @click="hideForm"
              class="m-form-btn m-btn-close"
            >
              Hủy
            </button>
          </div>
          <div>
            <button type="button" class="m-form-btn">Cất</button>
            <button type="submit" class="m-form-btn m-btn-save">
              {{ text }}
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="dialog-background"></div>
  </div>
</template>
<script>
import DropDown from "../../components/shared/DropDown.vue";
import axios from "axios";
export default {
  props: {
    isShow: Boolean,
    employee: Object,
    EmployeeId: String,
    text: String,
  },
  created() {
    this.loadDepartment();
  },
  data() {
    return {
      value: "",
      Department: [],
    };
  },
  methods: {
    /**
     * Thêm mới hoặc sửa employee
     * Author: NVChien (9/12/2021)
     */
    onSubmit() {
      if (this.EmployeeId != "") {
        this.$emit("update-employee", this.employee);
      } else {
        this.$emit("add-employee", this.employee);
      }
    },
    /**
     * Lấy ra danh sách deparment để laod cbb
     * Author: NVChien (9/12/2021)
     */
    loadDepartment() {
      axios
        .get(`http://amis.manhnv.net/api/v1/Departments`)
        .then((res) => {
          this.Department = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Lấy ra value khi mà mình chọn cbb
     * Author: NVChien (9/12/2021)
     */
    selectOptionDepartment(option) {
      this.employee.departmentName = option.DepartmentName;
      this.employee.DepartmentId = option.DepartmentId;
    },
    /**
     *Ẩn form
     * Author: NVChien(9/12/2021)
     */
    hideForm() {
      this.value = "";
      this.$emit("hide-form");
    },
  },
  components: {
    DropDown,
  },
};
</script>
<style scoped></style>
