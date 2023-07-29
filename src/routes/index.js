const { Router } = require("express");
const authRoute = require("./v1/authRoute");
const userRoute = require("./v1/userRoute");
const userDetailRoute = require("./v1/userDetailRoute");
const studentRoute = require("./v1/studentRoute");
const parentRoute = require("./v1/parentRoute");
const studentParentRoute = require("./v1/studentParentRoute");
const childOriginRoute = require("./v1/childOriginRoute");

const router = Router();

const defaultRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/userdetail",
    route: userDetailRoute,
  },
  {
    path: "/student",
    route: studentRoute,
  },
  {
    path: "/parent",
    route: parentRoute,
  },
  {
    path: "/studentparent",
    route: studentParentRoute,
  },
  {
    path: "/childorigin",
    route: childOriginRoute,
  },
];

defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
