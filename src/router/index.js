// import view
import Home from "./view/dashboard/Index";
import Employee from "./view/employee/EmployeeList";
import Customer from "./view/customer/CustomerList";
import Student from "./view/stuent/StudentList";

const routes = [
  {
    path: "/",
    name: "Employee",
    component: Employee,
  },
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
  },
  {
    path: "/student",
    name: "Student",
    component: Student,
  },
];

export default routes;
