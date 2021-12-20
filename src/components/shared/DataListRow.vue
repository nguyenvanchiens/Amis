<template>
  <div class="data-list-row" :id="employee.EmployeeId">
    <div class="data-items">
      <div class="data-item">Nhân bản</div>
      <div @click="showFomrDel(employee)" class="data-item" id="btn-delete-row">
        Xóa
      </div>
      <div class="data-item">Ngừng</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped></style>
