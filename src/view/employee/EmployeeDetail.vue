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
          <button @click="$emit('hide-form')" class="m-btn-close">
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
                  v-model="employee.EmployeeCode"
                  type="text"
                  class="m-input m-input-employeecode"
                  name=""
                  id="txtemployeecode"
                />
              </div>
              <div class="form-group">
                <label for="">Tên <span>*</span></label>
                <input
                  v-model="employee.EmployeeName"
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
                <div class="scombobox">
                  <input
                    type="text"
                    id=""
                    class="s-combobox-input"
                    v-model="employee.DepartmentId"
                  />
                  <button class="s-combobox-buton">
                    <i class="fas fa-sort-down"></i>
                  </button>
                  <div class="s-combobox-data">
                    <div class="s-combobox-item" value="1">
                      Hiện thị 10 trang
                    </div>
                    <div class="s-combobox-item" value="0">
                      Hiện thị 20 trang
                    </div>
                    <div class="s-combobox-item" value="0">
                      Hiện thị 30 trang
                    </div>
                    <div class="s-combobox-item" value="0">
                      Hiện thị 40 trang
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Chức danh <span>*</span></label>
                <div class="scombobox">
                  <input
                    type="text"
                    v-model="employee.PositionId"
                    id=""
                    class="s-combobox-input"
                  />
                  <button class="s-combobox-buton">
                    <i class="fas fa-sort-down"></i>
                  </button>
                  <div class="s-combobox-data">
                    <div class="s-combobox-item" value="1">
                      Hiện thị 10 trang
                    </div>
                    <div class="s-combobox-item" value="0">
                      Hiện thị 20 trang
                    </div>
                    <div class="s-combobox-item" value="0">
                      Hiện thị 30 trang
                    </div>
                    <div class="s-combobox-item" value="0">
                      Hiện thị 40 trang
                    </div>
                  </div>
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
                  v-model="employee.DateOfBirth"
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
                      v-model="employee.Gender"
                      type="radio"
                      class=""
                      value="1"
                      name="gender"
                      id="rdgenderFale"
                    />
                    Nam
                  </div>
                  <div class="group-radio-item">
                    <input
                      v-model="employee.Gender"
                      type="radio"
                      class=""
                      value="0"
                      name="gender"
                      id="rdgenderMale"
                    />
                    Nữ
                  </div>
                  <div class="group-radio-item">
                    <input
                      v-model="employee.Gender"
                      type="radio"
                      class=""
                      value="2"
                      name="gender"
                      id="rdgendercc"
                    />
                    Khác
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="">Số chứng minh thư nhân dân</label>
                <input
                  type="text"
                  v-model="employee.IdentityNumber"
                  class="m-input m-input-card"
                  name=""
                  id="dtdateofbirth"
                />
              </div>
              <div class="form-group">
                <label for="">Ngày cấp</label>
                <input
                  type="date"
                  v-model="employee.IdentityDate"
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
                  v-model="employee.IdentityPlace"
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
                v-model="employee.Address"
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
                v-model="employee.PhoneNumber"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Đt cố định</label>
              <input
                type="text"
                v-model="employee.TelephoneNumber"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Email</label>
              <input
                type="text"
                v-model="employee.Email"
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
                v-model="employee.BankAccountNumber"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Tên ngân hàng</label>
              <input
                type="text"
                v-model="employee.BankName"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
            <div class="form-group">
              <label for="">Chi nhánh</label>
              <input
                type="text"
                v-model="employee.BankBranchName"
                class="m-input m-input-info"
                name=""
                id="txtfullname"
              />
            </div>
          </div>
        </div>
        <div class="m-dialog-footer">
          <div>
            <button @click="$emit('hide-form')" class="m-form-btn m-btn-close">
              Hủy
            </button>
          </div>
          <div>
            <button class="m-form-btn">Cất</button>
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
export default {
  props: {
    isShow: Boolean,
    employee: Object,
    EmployeeId: String,
    text: String,
  },
  created() {
    // if (this.EmployeeId == "") {
    //   axios
    //     .get(`http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode`)
    //     .then((response) => {
    //       this.employee.EmployeeCode = response.data;
    //       $("txtemployeecode").focus();
    //     })
    //     .catch((e) => {
    //       this.errors.push(e);
    //     });
    // }
  },
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      if (this.EmployeeId != "") {
        this.$emit("update-employee", this.employee);
      } else {
        this.$emit("add-employee", this.employee);
      }
    },
  },
};
</script>
<style scoped></style>
