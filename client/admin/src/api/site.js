import http from "../utils/http.js";
import API from "../config/index.js";

/**
 * @description 网站基本信息
 */
export let siteInfo = () => {
  return http({
    url: `${API.BASE_API}/api/site/find`,
    method: "get",
  });
};

//更新基本信息
export let updateInfo = ({
  id,
  name,
  domain,
  email,
  icp,
  police,
  address,
  copyright,
  code,
  json,
}) => {
  return http({
    url: `${API.BASE_API}/api/site/updateInfo`,
    method: "post",
    data: {
      id,
      name,
      domain,
      email,
      icp,
      police,
      address,
      copyright,
      code,
      json,
    },
  });
};

//更新seo
export let updateSeo = ({ id, title, keywords, description }) => {
  return http({
    url: `${API.BASE_API}/api/site/updateSeo`,
    method: "post",
    data: {
      id,
      title,
      keywords,
      description,
    },
  });
};

/**
 * @description 运行环境
 */
export let runEnv = () => {
  return http({
    url: `${API.BASE_API}/api/site/runEnv`,
    method: "get",
  });
};
