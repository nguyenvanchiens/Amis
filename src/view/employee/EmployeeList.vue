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
        <div class="m-content-multidel" @click="toggleDelMuti = !toggleDelMuti">
          <div class="m-content-multidel-text">Thực hiện hàng loạt</div>
          <div
            :style="selectedId.length > 1 ? 'opacity:1' : ''"
            class="m-content-multidel-icon m-icon icon-16 mi-arrow-up--black"
          ></div>
          <div
            class="multidel-item"
            v-show="toggleDelMuti && selectedId.length > 1"
          >
            <span
              class="item-text"
              style="font-size: 16px"
              @click="DelMutlRecord"
              >XÓA</span
            >
          </div>
        </div>
        <div class="m-content-right">
          <div class="m-content-input-search">
            <input
              type="text"
              v-model="searchText"
              class="m-input-search"
              placeholder="Tìm kiếm theo mã hoặc tên"
            />
            <div id="searchBtn" class="m-icon m-icon-search icon-16"></div>
          </div>
          <button @click="refresh" class="m-button-refresh">
            <div id="btnRefresh">
              <div class="m-icon m-icon-refresh icon-24"></div>
            </div>
          </button>
          <div>
            <a
              id="exportexcel"
              href="https://localhost:44320/api/v1/Employees/Export"
              ><div id="export" class="m-icon m-icon-export-excel icon-24"></div
            ></a>
          </div>
        </div>
      </div>
      <div class="m-table">
        <table border="0" style="width: 100%" cellspacing="0" cellpadding="">
          <thead>
            <tr>
              <th class="text-align-left">
                <input
                  v-model="isSelectAllId"
                  @click="selectAllId"
                  type="checkbox"
                />
              </th>
              <th class="text-align-left w150">Mã nhân viên</th>
              <th class="text-align-left w150">Tên nhân viên</th>
              <th class="text-align-left w100">Giới tính</th>
              <th class="m-text-center w100">Ngày sinh</th>
              <th class="text-align-left w150">Số CMND</th>
              <th class="text-align-left w100">Chức danh</th>
              <th class="text-align-left" style="min-width: 200px">
                Tên đơn vị
              </th>
              <th class="text-align-left w150">Số tài khoản</th>
              <th class="text-align-left w100">Tên ngân hàng</th>
              <th class="text-align-left w200">Chi nhánh TK ngân hàng</th>
              <th class="text-align-right" style="padding-right: 12px">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              @dblclick="showFormDetail(employee)"
              v-for="employee in employees"
              :key="employee.EmployeeId"
            >
              <td>
                <input
                  v-model="selectedId"
                  :value="employee.employeeId"
                  type="checkbox"
                  @click="selectId(employee.employeeId)"
                  name=""
                  id="EmployeeCode"
                />
              </td>
              <td>{{ employee.employeeCode }}</td>
              <td>{{ employee.employeeName }}</td>
              <td>{{ employee.genderName }}</td>
              <td class="m-text-center">
                {{ employee.dateOfBirth | formatDate }}
              </td>
              <td>{{ employee.identityNumber }}</td>
              <td>{{ employee.employeePosition }}</td>
              <td>{{ employee.departmentName }}</td>
              <td>{{ employee.bankAccountNumber }}</td>
              <td>{{ employee.bankName }}</td>
              <td>{{ employee.bankBranchName }}</td>
              <td>
                <button @click="showFormDetail(employee)">Sửa</button>
                <button
                  @click="showListRowTable($event, employee)"
                  class="m-btn-icon down-data-row"
                >
                  <i class="fas fa-sort-down"></i>
                </button>
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
          <PaginationPage
            :totalPages="totalPages"
            @changePage="changePageNumber"
          />
        </div>
      </div>
    </div>
    <!-- CONTEXT MENU -->
    <div id="contextMenu" v-show="toogleMenu">
      <button id="duplicate">Nhân bản</button>
      <button id="delete" v-on:click="showFomrDel">Xóa</button>
      <button id="stopUsing">Ngừng sử dụng</button>
    </div>
    <EmployeeDetail ref="popupEmployeeDetail" />
    <!--Phần hiện thị msg delete-->
    <PopDelete @Delete="Delete" :textMgs="textMgs" ref="popUpDelete" />
    <!-- Phần loading -->
    <Loading ref="loading" />
    <!--Toast Message-->
    <ToastMessage :isShowToast="isShowToast" :toastText="toastText" />
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import Resource from "../../js/base/Resource";
import { Common } from "../../js/base/Common";
import EmployeeDetail from "./EmployeeDetail.vue";
import Loading from "../../components/shared/Loading.vue";
import ToastMessage from "../../components/shared/ToastMessage.vue";
import PaginationPage from "../../components/shared/PaginationPage.vue";
import ComboboxPanigation from "../../components/shared/ComboboxPanigation.vue";

import PopDelete from "../../components/shared/PopUpDelete.vue";

export default {
  /**
   * Nhận về khi con xử lý thành công
   * CreateBy:NVChien(24/12/2021)
   */
  mounted() {
    const me = this;
    me.$refs.popupEmployeeDetail.$on("updateSuccess", function () {
      me.refresh();
      me.showToastMessage("Sửa thành công");
    });
    me.$refs.popupEmployeeDetail.$on("addSuccess", function () {
      me.refresh();
      me.showToastMessage("Thêm mới thành công");
    });
    me.$refs.popupEmployeeDetail.$on("updateSuccessContinue", function () {
      me.$refs.loading.showLoading();
      me.loadData();
    });
    me.$refs.popupEmployeeDetail.$on("addSuccessContinue", function () {
      me.$refs.loading.showLoading();
      me.loadData();
    });
  },
  created() {
    this.loadData();
  },
  components: {
    EmployeeDetail,
    Loading,
    ToastMessage,
    ComboboxPanigation,
    PaginationPage,
    PopDelete,
  },
  data() {
    return {
      employees: [], //chứ thông tin nhân viên
      isLoading: false,
      isShowFormDel: false,
      EmployeeId: "",
      employeeCode: "",
      isShowToast: false,
      toogleMenu: false,
      toggleDelMuti: false,
      textMgs: "",
      toastText: "",
      TotalRecord: 0,
      searchText: "",
      // số bản ghi trên một trang
      pageSize: 10,
      // trang hiện tại
      // pageNumber: 1,
      pageIndex: 1,
      // tổng số trang
      totalPages: 0,
      // danh sách Id nhân viên khi ấn input checkbox -> xoá nhiều
      selectedId: [],
      // có check toàn bộ ô checkbox hay không -> để lấy toàn bộ Id của nhân viên -> xoá toàn bộ
      isSelectAllId: false,
    };
  },
  methods: {
    /**
     * Load dữ liệu nhân viên
     * Author: NVChien (07/12/2021)
     */
    loadData() {
      axios
        .get(
          `${Resource.AMIS_SERVICE_URL}/Employees/GetAllPaging?pageSize=${this.pageSize}&pageIndex=${this.pageIndex}&entityFilter=${this.searchText}`
        )
        .then((response) => {
          this.employees = response.data.data;
          this.totalPages = response.data.totalPage;
          this.TotalRecord = response.data.totalRecord;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    /**
     * Thực hiện lấy toàn bộ Id nhân viên ô checkbox
     * CreatedBy: NVChien (22/12/2021)
     */
    selectAllId() {
      if (!this.isSelectAllId) {
        for (let i in this.employees) {
          this.selectedId.push(this.employees[i].employeeId);
        }
      } else {
        this.selectedId = [];
      }
    },
    /**
     * Thực hiện lấy từng giá trị Id nhân viên một, tham số truyền vào là một EmployeeId
     * CreatedBy: NVChien (22/12/2021)
     */
    selectId(employeeId) {
      // kiểm tra xem Id đã tồn tại trong mảng selectedId hay chưa
      if (!this.selectedId.includes(employeeId)) {
        this.selectedId.push(employeeId);
      } else {
        // nếu Id đã tồn tại trong mảng selectedId thì sẽ xoá Id đó khỏi mảng - tức là khi 2 lần vào ô checkbox
        this.selectedId.forEach((item, index) => {
          if (employeeId == item) {
            this.selectedId.splice(index, 1);
          }
        });
      }
    },
    /**
     * Show Form Update
     * Author: NVChien(7/12/2021)
     */
    showFormDetail(employee) {
      const me = this;
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/Employees/` + employee.employeeId)
        .then((response) => {
          me.$refs.popupEmployeeDetail.showForm(response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    /**
     * Hiện form chi tiết employee
     * Author: NVChien (07/12/2021)
     */
    showFormAdd() {
      this.$refs.popupEmployeeDetail.showForm();
    },
    /**
     * Ẩn form chi tiết employee và gán lại dữ liệu mặc định cho employee
     * Author: NVChien (07/12/2021)
     */
    hideForm() {
      this.$refs.popupEmployeeDetail.hideForm();
    },
    /**
     * Làm mới lại trang
     * Author:NVChien(7/12/2021)
     */
    refresh() {
      this.EmployeeId = "";
      this.searchText = "";
      this.loadData();
      this.$refs.loading.showLoading();
    },
    /**
     * Hiện chức năng xóa nhân bản cho từng table
     * Author: NVChien (07/12/2021)
     */
    showListRowTable(e, employee) {
      this.toogleMenu = true;
      var positionMenu = e.target;
      let contextMenu = $("#contextMenu");
      contextMenu.toggle();
      let top_pos = $(positionMenu).offset().top;
      let left_pos = $(positionMenu).offset().left;
      if (top_pos + 24 <= window.innerHeight - 90) {
        contextMenu.css("top", `calc(${top_pos}px + 24px)`);
      } else {
        contextMenu.css("top", `calc(${top_pos}px - 88px)`);
      }
      contextMenu.css("left", `calc(${left_pos}px - 115px)`);
      this.employeeCode = employee.employeeCode;
      this.EmployeeId = employee.employeeId;
    },
    /**
     * hiện form xóa
     * Author: NVChien(10/12/2021)
     */
    showFomrDel() {
      const me = this;
      me.$refs.popUpDelete.showForm();
      me.textMgs = `Bạn có muốn xóa nhân viên có mã <${me.employeeCode}> không?`;
      me.toogleMenu = !me.toogleMenu;
    },
    /**
     * Ẩn form xóa
     * Author: NVChien(10/12/2021)
     */
    hideFomrDel() {
      this.EmployeeId = "";
      this.popUpDelete = !this.isShowFormDel;
    },
    /**
     * Xóa nhân viên hoặc xóa nhiều bản ghi
     * Author: NvChien(12/10/2021)
     */
    Delete() {
      if (this.selectedId.length > 0) {
        axios
          .post(
            `${Resource.AMIS_SERVICE_URL}/Employees/DeleteMulti/`,
            this.selectedId
          )
          .then(() => {
            this.$refs.popUpDelete.hideForm();
            this.selectedId = [];
            this.showToastMessage();
            this.toastText = "Xóa danh sách thành công thành công";
            this.refresh();
            this.toogleMenu = !this.toogleMenu;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        axios
          .delete(`${Resource.AMIS_SERVICE_URL}/Employees/` + this.EmployeeId)
          .then(() => {
            console.log("xóa thành công");
            this.$refs.popUpDelete.hideForm();
            this.showToastMessage();
            this.toastText = "Xóa thành công";
            this.refresh();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    /**
     * Xóa nhiều bản ghi
     * CreateBy: NVChien(23/12/2021)
     */
    DelMutlRecord() {
      this.toggleDelMuti = !this.toggleDelMuti;
      this.toogleMenu = !this.toogleMenu;
      this.textMgs = `Bạn có thực sự muốn danh danh sách nhân viên đã chọn?`;
      this.$refs.popUpDelete.showForm();
    },
    /**
     * Hiển thị toast message
     * CreatedBy: NVChien (15/12/2021)
     */
    showToastMessage(string) {
      setTimeout(() => {
        this.isShowToast = true;
      }, 1000);
      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
      this.toastText = string;
    },
    /**
     * Chuyển trang
     * CreatedBy: NVChien (20/12/2021)
     */
    changePageNumber(pageIndex) {
      this.pageIndex = pageIndex;
      this.loadData();
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
  watch: {
    /**
     * Tìm kiếm dữ liệu
     * CreatedBy: NVChien (18/12/2021)
     */
    searchText: function () {
      this.loadData();
    },
  },
  filters: {
    /**
     * Chuyển dữ liệu dateTime về dữ liệu đẹp
     * CreateBy: NVCHien(21/12/2021)
     */
    formatDate(val) {
      return Common.formatDate(val);
    },
  },
};
</script>

<style scoped>
@import url("../../style/page/employee.css");
</style>
