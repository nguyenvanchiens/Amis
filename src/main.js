import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";

// import view
import Home from "./view/dashboard/Index";
import Employee from "./view/employee/EmployeeList";
import Customer from "./view/customer/CustomerList";
import Student from "./view/stuent/StudentList";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/employee",
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

const router = new VueRouter({
  mode: "history",
  routes, // short for `routes: routes`
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
