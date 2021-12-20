<template>
  <div class="m-content">
    <div class="m-header">
      <div class="m-header-text">Nhân viên</div>
      <button class="m-btn m-btn-add" @click="showFormAdd">
        Thêm mới nhân viên
      </button>
    </div>
    <div class="m-wrap-content">
      <div class="m-content-search">
        <div class="m-content-input-search">
          <input
            type="text"
            class="m-input-search"
            placeholder="Tìm kiếm theo mã hoặc tên"
          />
          <i class="fas fa-search"></i>
        </div>
        <button @click="refresh" class="m-button-refresh">
          <i class="fas fa-redo"></i>
        </button>
      </div>
      <div class="m-table">
        <table border="0" style="width: 100%" cellspacing="0" cellpadding="">
          <thead>
            <tr>
              <th class="text-align-left"><input type="checkbox" /></th>
              <th class="text-align-left w100">Mã nhân viên</th>
              <th class="text-align-left w200">Tên nhân viên</th>
              <th class="text-align-left w100">Giới tính</th>
              <th class="m-text-center w100">Ngày sinh</th>
              <th class="text-align-left w100">Số CMND</th>
              <th class="text-align-left w100">Chức danh</th>
              <th class="text-align-left" style="min-width: 100px">
                Tên đơn vị
              </th>
              <th class="text-align-left w100">Số tài khoản</th>
              <th class="text-align-left w150">Tên ngân hàng</th>
              <th class="text-align-left w150">Chi nhánh TK ngân hàng</th>
              <th class="text-align-right" style="padding-right: 12px">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              @dblclick="showFormEdit(employee.EmployeeId)"
              v-for="employee in employees"
              :key="employee.EmployeeId"
            >
              <td><input type="checkbox" name="" id="" /></td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.EmployeeName }}</td>
              <td>{{ employee.Gender | formatGender }}</td>
              <td class="m-text-center">
                {{ employee.DateOfBirth | formatDate }}
              </td>
              <td>{{ employee.IdentityNumber }}</td>
              <td>{{ employee.EmployeePosition }}</td>
              <td>{{ employee.DepartmentName }}</td>
              <td>{{ employee.BankAccountNumber }}</td>
              <td>{{ employee.BankName }}</td>
              <td>{{ employee.BankBranchName }}</td>
              <td>
                <button @click="showFormEdit(employee.EmployeeId)">Sửa</button>
                <button
                  @click="showListRowTable(employee.EmployeeId)"
                  class="m-btn-icon down-data-row"
                >
                  <i class="fas fa-sort-down"></i>
                </button>
                <div class="data-list-row" :id="employee.EmployeeId">
                  <div class="data-items">
                    <div class="data-item">Nhân bản</div>
                    <div
                      @click="showFomrDel(employee)"
                      class="data-item"
                      id="btn-delete-row"
                    >
                      Xóa
                    </div>
                    <div class="data-item">Ngừng</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-navigation">
        <div class="m-paging-left">
          <div class="m-paging-text-left">
            Tổng số: <b>{{ TotalRecord }}</b> bản ghi
          </div>
        </div>
        <div class="m-paging-center">
          <!--Combobox Phân trang-->
          <ComboboxPanigation
            style="margin-right: 10px"
            :ListItem="[
              '10 bản ghi trên trang',
              '20 bản ghi trên trang',
              '30 bản ghi trên trang',
              '50 bản ghi trên trang',
              '100 bản ghi trên trang',
            ]"
            v-if="true"
            @handleSelect="changeRecordNumber"
          />
          <button class="m-btn-paging m-btn-paging-First">Trước</button>
          <div class="m-paging-number">
            <div class="m-page-item">1</div>
            <div class="m-page-item">2</div>
            <div class="m-page-item">3</div>
            <div class="m-page-item">...</div>
            <div class="m-page-item">6</div>
          </div>
          <button class="m-btn-paging m-btn-paging-Next">Sau</button>
        </div>
      </div>
    </div>

    <EmployeeDetail
      v-show="isShowForm"
      @hide-form="hideForm"
      @add-employee="AddEmployee"
      @update-employee="UpdateEmployee"
      :employee="employee"
      :EmployeeId="EmployeeId"
      :text="EmployeeId == '' ? 'Cất và Thêm' : 'Update'"
    />
    <!--Phần hiện thị msg delete-->
    <div class="message" v-show="isShowFormDel">
      <div class="message-content">
        <div class="message-header">
          <div class="header-warning">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="header-text">
            <span
              >Bạn có thực sự muốn xóa Nhân viên
              <b class="employeeCode_text"></b> hay không hả bạn</span
            >
          </div>
        </div>
        <div class="messgae-footer">
          <div class="btn-group">
            <button
              type="button"
              @click="hideFomrDel"
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
    <!-- Phần loading -->
    <Loading :isLoading="isLoading" />
    <!--Toast Message-->
    <ToastMessage
      :isShowToast="isShowToast"
      :toastText="toastText"
      :toastColor="toastColor"
    />
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import EmployeeDetail from "./EmployeeDetail.vue";
import Loading from "../../components/shared/Loading.vue";
import ToastMessage from "../../components/shared/ToastMessage.vue";
import ComboboxPanigation from "../../components/shared/ComboboxPanigation.vue";

export default {
  created() {
    this.loadData();
  },
  components: {
    EmployeeDetail,
    Loading,
    ToastMessage,
    ComboboxPanigation,
  },
  data() {
    return {
      employees: [],
      isShowForm: false,
      isLoading: false,
      isShowFormDel: false,
      EmployeeId: "",
      isShowToast: false,
      toastText: "",
      toastColor: "",
      TotalRecord: 0,
      employee: {
        EmployeeCode: "NV-123123",
        EmployeeName: "Nguyễn Văn K",
        Gender: "1",
        DateOfBirth: "2021-12-09",
        IdentityNumber: "1234321456",
        IdentityDate: "2021-12-07",
        IdentityPlace: "Hưng yên",
        Address: "Hưng yên",
        PhoneNumber: "0986756432",
        TelephoneNumber: "0986756432",
        Email: "test@gmail.com",
        BankAccountNumber: "1968473212",
        BankName: "ACB",
        BankBranchName: "Hưng Yên",
        PositionId: "",
        DepartmentId: "17120d02-6ab5-3e43-18cb-66948daf6128",
        EmployeePosition: "Nhân viên",
      },
      searchText: "",
      // số bản ghi trên một trang
      pageSize: 10,
      // trang hiện tại
      pageNumber: 1,
      // tổng số trang
      totalPages: 0,
    };
  },
  methods: {
    /**
     * Hiện form chi tiết employee
     * Author: NVChien (07/12/2021)
     */
    showFormAdd() {
      this.EmployeeId = "";
      if (this.EmployeeId == "") {
        axios
          .get(`http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode`)
          .then((response) => {
            this.employee.EmployeeCode = response.data;
            $("txtemployeecode").focus();
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
      this.isShowForm = !this.isShowForm;
    },
    /**
     * Ẩn form chi tiết employee và gán lại dữ liệu mặc định cho employee
     * Author: NVChien (07/12/2021)
     */
    hideForm() {
      this.EmployeeId = "";
      this.employee = {
        EmployeeCode: "NV-123123",
        EmployeeName: "Nguyễn Văn A",
        Gender: "1",
        DateOfBirth: "2021-12-07",
        IdentityNumber: "1234321456",
        IdentityDate: "2021-12-07",
        IdentityPlace: "Hưng yên",
        Address: "Hưng yên",
        PhoneNumber: "0986756432",
        TelephoneNumber: "0986756432",
        Email: "test@gmail.com",
        BankAccountNumber: "1968473212",
        BankName: "ACB",
        BankBranchName: "Hưng Yên",
        PositionId: "",
        DepartmentId: "17120d02-6ab5-3e43-18cb-66948daf6128",
        EmployeePosition: "Nhân viên",
      };
      this.isShowForm = !this.isShowForm;
    },
    /**
     * Làm mới lại trang
     * Author:NVChien(7/12/2021)
     */
    refresh() {
      this.EmployeeId = "";
      this.loadData();
      setTimeout(() => {
        this.isLoading = true;
      }, 0);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    /**
     * Thêm mới nhân viên
     * Author: NVChien(07/12/2021)
     */
    AddEmployee(employee) {
      axios
        .post("http://amis.manhnv.net/api/v1/Employees", employee)
        .then(() => {
          this.hideForm();
          this.showToastMessage();
          this.toastText = "Thêm mới thành công";
          this.toastColor = "#2e6da4";
          this.refresh();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * Show Form Update
     * Author: NVChien(7/12/2021)
     */
    showFormEdit(employeeid) {
      this.EmployeeId = employeeid;
      this.isShowForm = !this.isShowForm;
      axios
        .get(`http://amis.manhnv.net/api/v1/Employees/` + employeeid)
        .then((response) => {
          this.employee = response.data;
          if (response.data.DateOfBirth != "") {
            this.employee.DateOfBirth = this.ChangeDate(
              response.data.DateOfBirth
            );
          }
          if (response.data.IdentityDate != "") {
            this.employee.IdentityDate = this.ChangeDate(
              response.data.IdentityDate
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Update employee
     * Author:(8/12/2021)
     */
    UpdateEmployee(employee) {
      axios
        .put(
          `http://amis.manhnv.net/api/v1/Employees/` + this.EmployeeId,
          employee
        )
        .then(() => {
          this.refresh();
          this.showToastMessage();
          this.toastText = "Update thành công";
          this.toastColor = "#01b075";
          this.hideForm();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Chuyển đổi date
     * Author: NVChien(7/12/2021)
     */
    ChangeDate(val) {
      var date = new Date(val);
      var reuslt = "";
      if (Number.isNaN(date.getTime())) {
        reuslt = "";
      } else {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        reuslt = year + "-" + month + "-" + day;
      }
      return reuslt;
    },
    /**
     * Load dữ liệu nhân viên
     * Author: NVChien (07/12/2021)
     */
    loadData() {
      axios
        .get(
          `http://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchText}`
        )
        .then((response) => {
          this.employees = response.data.Data;
          this.TotalRecord = response.data.TotalRecord;
          console.log(response.data.Data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    /**
     * Hiện chức năng xóa nhân bản cho từng table
     * Author: NVChien (07/12/2021)
     */
    showListRowTable(EmployeeId) {
      setTimeout(() => {
        $(`#${EmployeeId}`).show();
      }, 0);
      setTimeout(() => {
        $(`#${EmployeeId}`).hide();
      }, 2000);
    },
    /**
     * hiện form xóa
     * Author: NVChien(10/12/2021)
     */
    showFomrDel(emplyee) {
      this.EmployeeId = emplyee.EmployeeId;
      this.isShowFormDel = !this.isShowFormDel;
      $(".employeeCode_text").text(`(${emplyee.EmployeeCode})`);
      $(`#${emplyee.EmployeeId}`).hide();
    },
    /**
     * Ẩn form xóa
     * Author: NVChien(10/12/2021)
     */
    hideFomrDel() {
      this.EmployeeId = "";
      this.isShowFormDel = !this.isShowFormDel;
    },
    /**
     * Xóa nhân viên
     * Author: NvChien(12/10/2021)
     */
    Delete() {
      axios
        .delete("http://amis.manhnv.net/api/v1/Employees/" + this.EmployeeId)
        .then(() => {
          console.log("xóa thành công");
          this.hideFomrDel();
          this.showToastMessage();
          this.toastText = "Xóa thành công";
          this.toastColor = "#d43f3a";
          this.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Hiển thị toast message
     * CreatedBy: NVChien (15/12/2021)
     */
    showToastMessage() {
      setTimeout(() => {
        this.isShowToast = true;
      }, 1000);
      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
    },
    /**
     * Số lượng bản ghi trên một trang
     * CreatedBy: NVChien (18/12/2021)
     */
    changeRecordNumber(pageRecord) {
      this.pageSize = pageRecord;
      this.loadData();
    },
  },
  filters: {
    formatGender(val) {
      var result = "";
      switch (val) {
        case 0:
          result = "Nữ";
          break;
        case 1:
          result = "Nam";
          break;
        default:
          result = "Khác";
          break;
      }
      return result;
    },
    formatDate(val) {
      var result = "";
      var date = new Date(val);
      if (Number.isNaN(date.getTime())) {
        result = "";
      } else {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        result = day + "/" + month + "/" + year;
      }
      return result;
    },
  },
};
</script>

<style scoped>
@import url("../../style/page/employee.css");
</style>
