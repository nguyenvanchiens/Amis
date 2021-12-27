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
      <div>
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
                  ref="txtemployeecode"
                  :class="{ 'm-input-error': $v.employee.employeeCode.$error }"
                  @blur="$v.employee.employeeCode.$touch()"
                  :title="
                    $v.employee.employeeCode.$error
                      ? titleEmployeeCodeIsNull
                      : null
                  "
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
                  :class="{ 'm-input-error': $v.employee.employeeName.$error }"
                  @blur="$v.employee.employeeName.$touch()"
                  :title="
                    $v.employee.employeeName.$error ? titleEmployeeIsNull : null
                  "
                />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Đơn vị <span>*</span></label>
                <DropDown
                  :originalOptions="Department"
                  @select="selectOptionDepartment"
                  :titleDepartmentNameIsNull="titleDepartmentNameIsNull"
                  ref="departmentDropDown"
                />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Chức danh</label>
                <div class="scombobox">
                  <input
                    type="text"
                    v-model="employee.employeePosition"
                    id=""
                    class="s-combobox-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-info-right">
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Ngày sinh</label>
                <input
                  type="date"
                  v-model="employee.dateOfBirth"
                  class="m-input m-input-dateofbirth"
                  name=""
                  id="dtdateofbirth"
                />
              </div>
              <div class="form-group">
                <label for="" class="lbgender">Giới tính</label>
                <div class="group-radio">
                  <div class="group-radio-item">
                    <input
                      v-model="employee.gender"
                      type="radio"
                      class=""
                      value="1"
                      name="gender"
                      id="rdgenderMale"
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
                type="email"
                v-model="employee.email"
                class="m-input m-input-info"
                :class="{ 'm-input-error': $v.employee.email.$error }"
                @blur="$v.employee.email.$touch()"
                :title="$v.employee.email.$error ? emailError : null"
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
            <button type="button" @click="saveAndClose" class="m-form-btn">
              Cất
            </button>
            <button
              type="button"
              class="m-form-btn m-btn-save"
              @click="saveAndContinue"
            >
              Cất và Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-background"></div>
    <!-- popupError -->
    <PopUpError ref="popUpError" :textMgs="textMgs" />
    <!-- popup Alert lưu khi đã phát sinh dữ liệu-->
    <PopUpChangValue
      :isShowAlert="isShowAlert"
      @closeFormAlert="closeFormAlert"
      @clearForm="clearForm"
      @saveAndClose="saveAndClose"
    />
  </div>
</template>
<script>
import DropDown from "../../components/shared/DropDown.vue";
import PopUpError from "../../components/shared/PopUpError.vue";
import PopUpChangValue from "../../components/shared/PopUpChangValue.vue";
import axios from "axios";
import Resource from "../../js/base/Resource";
import { Common } from "../../js/base/Common";
import { required, email } from "vuelidate/lib/validators";
export default {
  props: {},
  created() {
    this.loadDepartment();
  },
  data() {
    return {
      departmentName: "",
      Department: [],
      titleEmployeeIsNull: Resource["VN"].Warning.FullNameIsEmpty,
      titleEmployeeCodeIsNull: Resource["VN"].Warning.FullNameIsEmpty,
      titleDepartmentNameIsNull: Resource["VN"].Warning.DepartmentIsEmpty,
      employee: {
        employeeCode: "",
        employeeName: "Nguyễn Văn Chiến",
        departmentName: "",
        gender: "1",
        dateOfBirth: "2000-04-16",
        identityNumber: "033200003877",
        identityDate: "2015-05-17",
        identityPlace: "Hưng Yên",
        employeePosition: "Nhân viên",
        address: "Hưng Yên",
        telephoneNumber: "0987675432",
        email: "chienymhy@gmail.com",
        bankAccountNumber: "02547352",
        bankName: "acb",
        bankBranchName: "Hưng Yên",
      },
      isShowAlert: false,
      textMgs: "",
      checkStatusForm: 0,
      isShow: false,
      valueChanged: 0,
      emailError: Resource["VN"].Warning.EmailError,
    };
  },
  methods: {
    created() {},
    /**
     * Lấy ra danh sách deparment để laod cbb
     * Author: NVChien (9/12/2021)
     */
    loadDepartment() {
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/Departments`)
        .then((res) => {
          this.Department = res.data;
          this.$refs.departmentDropDown.options = [...res.data];
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
      this.employee.departmentName = option.departmentName;
      this.employee.departmentId = option.departmentId;
    },
    /**
     *Ẩn form
     * Author: NVChien(9/12/2021)
     */
    hideForm() {
      if (this.valueChanged > 2) {
        this.isShowAlert = !this.isShowAlert;
      } else {
        this.checkStatusForm = 0;
        this.employee = {
          employeeCode: "",
          departmentName: "",
          gender: "1",
          employeeName: "Nguyễn Văn Chiến",
        };
        this.isShow = false;
      }
    },
    /**
     * Hiện from chi tiết hoặc thêm mới
     * CreateBY: NVChien(23/12/2021)
     */
    showForm(entity) {
      this.valueChanged = 0;
      const me = this;
      if (entity) {
        this.checkStatusForm = 1;
        this.textSubmit = "Sửa";
        entity.dateOfBirth = this.ChangeDate(entity.dateOfBirth);
        entity.identityDate = this.ChangeDate(entity.identityDate);
        entity.gender = this.ChangeGender(entity.gender);
        this.$refs.departmentDropDown.textSearch = entity.departmentName;
        this.employee = entity;
      } else {
        this.employee = {
          employeeCode: "",
          employeeName: "Nguyễn Văn Chiến",
          departmentName: "",
          gender: "1",
          dateOfBirth: "2000-04-16",
          identityNumber: "033200003877",
          identityDate: "2015-05-17",
          identityPlace: "Hưng Yên",
          employeePosition: "Nhân viên",
          email: "chienymhy@gmail.com",
          telephoneNumber: "0987675432",
          address: "Hưng Yên",
          bankAccountNumber: "02547352",
          bankName: "acb",
          bankBranchName: "Hưng Yên",
        };
        this.newCodeEmployee();
      }
      setTimeout(() => {
        me.$refs.txtemployeecode.focus();
      });
      this.isShow = true;
    },
    /**
     * Update employee và giữ lại form
     * Author:(8/12/2021)
     */
    saveAndContinue() {
      const me = this;
      if (this.checkStatusForm == 0) {
        axios
          .post(`${Resource.AMIS_SERVICE_URL}/Employees/`, this.employee)
          .then(() => {
            this.checkStatusForm = 0;
            this.newCodeEmployee();
            this.employee = {
              employeeCode: "",
              departmentName: "",
            };
            this.$refs.txtemployeecode.focus();
            me.$emit("addSuccessContinue");
          })
          .catch((e) => {
            if (e.response.status == 400) {
              me.textMgs = e.response.data.data[0];
              this.isShowAlert = false;
              me.$refs.popUpError.showForm();
            }
          });
      } else {
        axios
          .put(
            `${Resource.AMIS_SERVICE_URL}/Employees/` +
              this.employee.employeeId,
            this.employee
          )
          .then(() => {
            this.checkStatusForm = 1;
            this.$refs.txtemployeecode.focus();
            me.$emit("updateSuccessContinue");
          })
          .catch((e) => {
            if (e.response.status == 400) {
              me.textMgs = e.response.data.data[0];
              this.isShowAlert = false;
              me.$refs.popUpError.showForm();
            }
          });
      }
    },
    /**
     * Update employee và đóng form
     * Author:(8/12/2021)
     */
    saveAndClose() {
      const me = this;
      if (this.checkStatusForm == 0) {
        axios
          .post(`${Resource.AMIS_SERVICE_URL}/Employees/`, this.employee)
          .then(() => {
            this.isShow = false;
            this.valueChanged = 0;
            me.$emit("addSuccess");
          })
          .catch((e) => {
            if (e.response.status == 400) {
              me.textMgs = e.response.data.data[0];
              this.isShowAlert = false;
              me.$refs.popUpError.showForm();
            }
          });
      } else {
        axios
          .put(
            `${Resource.AMIS_SERVICE_URL}/Employees/` +
              this.employee.employeeId,
            this.employee
          )
          .then(() => {
            this.isShow = false;
            me.$emit("updateSuccess");
          })
          .catch((e) => {
            if (e.response.status == 400) {
              me.textMgs = e.response.data.data[0];
              this.isShowAlert = false;
              me.$refs.popUpError.showForm();
            }
          });
      }
    },
    /**
     * Chuyển đổi date
     * Author: NVChien(7/12/2021)
     */
    ChangeDate(val) {
      return Common.ChangeDate(val);
    },
    /**
     * Chuyển đổi gender
     * Author: NVChien(7/12/2021)
     */
    ChangeGender(val) {
      return Common.ChangeGender(val);
    },
    /**
     * Đóng form alert và form detail
     */
    clearForm() {
      this.isShowAlert = !this.isShowAlert;
      this.checkStatusForm = 0;
      this.employee = {
        employeeCode: "",
        departmentName: "",
        gender: "1",
        employeeName: "Nguyễn Văn Chiến",
      };
      this.isShow = false;
    },
    /**
     * Lấy ra mã nhân viên mới
     * CreatedBy: NVChien(23/12/2021)
     */
    newCodeEmployee() {
      const me = this;
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/Employees/NewCodeEmployee`)
        .then((response) => {
          me.employee.employeeCode = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Đóng form alert change value
     * Author: NVChien(23/12/2021)
     */
    closeFormAlert() {
      this.isShowAlert = !this.isShowAlert;
    },
  },
  validations: {
    /**
     * Kiểm tra dữ liệu có để trống hay không
     * Author: NVChien(23/12/2021)
     */
    employee: {
      employeeCode: {
        required,
      },
      employeeName: {
        required,
      },
      email: {
        email,
      },
    },
  },
  components: {
    DropDown,
    PopUpError,
    PopUpChangValue,
  },
  watch: {
    // theo doi su thay doi cua form input
    employee: {
      handler: function () {
        this.valueChanged += 1;
      },
      deep: true,
    },
  },
};
</script>
<style scoped></style>
