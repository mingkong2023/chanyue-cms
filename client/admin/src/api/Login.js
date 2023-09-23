import http from "../utils/http.js";
import Base from "./Base";
import { asyncRoutes } from "@/router/index.js";

import API from "../config/index.js";
export default class Login extends Base {
  constructor(props) {
    super(props);
  }

  static toLogin(data) {
    return http({
      url: `${API.BASE_API}/api/admin/login`,
      method: "post",
      data: data,
    });

    // return new Promise((resovle, reject) => {
    //   setTimeout(() => {
    //     let res = {
    //       code: 200,
    //       data: {
    //         token: "asdfawerxxxa",
    //       },
    //     };
    //     resovle(res);
    //   }, 300);
    // });
  }

  static userInfo() {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        let res = {
          code: 200,
          data: {
            userId: "123456",
            userName: "mingkong",
            nickName: "明空",
            role: "admin",
          },
        };
        resovle(res);
      }, 300);
    });
  }

  static menuList() {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        let res = asyncRoutes;
        resovle({ code: 200, data: res });
      }, 300);
    });
  }
}
