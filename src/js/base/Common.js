export const Common = {
  /**
   * Chuyển đổi dữ liệu trả về
   * @param {*} val Giới tính truyền xuống từ api
   * @returns trả về 0-1-2 dựa vào giá trị trả về
   * CreateBy:NVChien(24/12/2021)
   */
  formatGender(val) {
    var result = "";
    switch (val) {
      case "Male":
        result = "Nam";
        break;
      case "Female":
        result = "Nữ";
        break;
      default:
        result = "Khác";
        break;
    }
    return result;
  },
  /**
   * Chuyển đổi dữ liệu ngày giờ
   * @param {*} val Datetime truyền vào
   * @returns từ 01-01-2000 7:8: -> 01/01/2000
   *
   */
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
  /**
   * Chuyển đổi gender
   * Author: NVChien(7/12/2021)
   */
  ChangeGender(val) {
    var result = "";
    if (val == "") {
      result = "";
    }
    if (val == "Other") {
      result = "2";
    }
    if (val == "Female") {
      result = "0";
    }
    if (val == "Male") {
      result = "1";
    }
    return result;
  },
  /**
   * Chuyển đổi date
   * Author: NVChien(7/12/2021)
   */
  ChangeDate(val) {
    var date = new Date(val);
    var reuslt = "";
    if (val == "") {
      reuslt = "";
    } else {
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
    }
    return reuslt;
  },
};
