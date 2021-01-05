/*!

=========================================================
* E-Cell Startup-Portal - v1.1.0
=========================================================

* Product Page: https://github.com/entrepreneurship-iitp/Startup-portal-front
* Copyright 2020 E-Cell, IIT Patna (http://ecell-iitp.org/)
* Licensed under MIT (https://github.com/entrepreneurship-iitp/Startup-portal-front/blob/master/LICENSE)

* Coded by Tech & Dev Committee, E-Cell | IIT Patna

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Jobs from "./views/examples/Jobs.js";
import Login from "./views/examples/Login.js";
import Register from "./views/examples/Register.js";
import Verify from "./views/examples/verify.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/jobs",
    name: "Job Posts",
    icon: "ni ni-bullet-list-67 text-red",
    component: Jobs,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/verify/:token/:email",
    name: "Verify",
    icon: "ni ni-circle-08 text-pink",
    component: Verify,
    layout: "/auth",
  },
];
export default routes;
