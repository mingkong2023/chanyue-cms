import http from "../utils/http.js";
import API from "../config/index.js";

/**
 * @description 登录
 * @param {*} param
 */
export let login = ({ username, password }) => {
  return http({
    url: `${API.BASE_API}/api/admin/login`,
    method: "post",
    data: {
      username,
      password,
    },
  });
};

/**
 * @description 注册
 * @param {*} param
 */
export let create = ({ username, password }) => {
  return http({
    url: `${API.BASE_API}/api/auth/admin/create`,
    method: "post",
    data: {
      username,
      password,
    },
  });
};

//验证码
export let captcha = (ver) => {
  return http({
    url: `${API.BASE_API}/api/captcha?v=${ver}`,
    method: "get",
  });
};
