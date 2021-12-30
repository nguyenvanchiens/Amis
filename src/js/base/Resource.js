const Resource = {
  VN: {
    Warning: {
      EmployeeCodeIsEmpty: "Mã nhân viên không được để trống",
      FullNameIsEmpty: "Tên không được để trống",
      DepartmentIsEmpty: "Đơn vị không được để trống",
      EmployeeCodeIsAvailable:
        "Mã nhân viên này đã tồn tại trong hệ thống, vui lòng kiểm tra lại !",
      DateOfBirthError: "Ngày sinh không được vượt quá ngày hiện tại",
      EmailError: "Email không đúng định dạng",
    },
    Message: {
      IndentityDate: "Ngày cấp không được vượt quá ngày hiện tại",
      textMgsDeleRecord: "Bạn có muốn xóa nhân viên có mã",
      textMgsDeleAll: "Bạn có thực sự muốn danh danh sách nhân viên đã chọn?",
    },
    DeleteConfirm: function (input) {
      return `Bạn có thực sự muốn xóa nhân viên <${input}> không?`;
    },
    DeleteAllConfirm: function () {
      return `Bạn có thực sự muốn danh sách nhân viên không?`;
    },
    ToastMessage: {
      textUpdateSuccess: "Sửa Thành Công",
      textAddSuccess: "Thêm mới Thành Công",
      textDeleteSuccess: "Xóa Thành Công",
      textDeleAllSuccess: "Xóa danh sách thành công thành công",
    },
  },
  AMIS_SERVICE_URL: "https://localhost:44320/api/v1",
};

export default Resource;
