import http from "../utils/http.js";
import API from "../config/index.js";
import * as qiniu from "qiniu-js";
//上传
export let qiniuUpload = async (file) => {
  try {
    console.log("file", file);
    let res = await http({
      url: `${API.BASE_API}/api/qiniu/getUploadToken`,
      method: "get",
    });
    let _file = file?.file;
    let ext = "." + _file.name.split(".").pop();
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let key = `/upload/${year}/${month}/${day}/${new Date().getTime() + ext}`;
    let token = res.data.token;
    const observable = qiniu.upload(_file, key, token);
    return new Promise((resolve, reject) => {
      // 开始上传
      observable.subscribe({
        next(res) {
          // 上传成功后
          console.log("next: ", res);
          resolve(res);
        },
        error(err) {
          // 失败
          console.log(err);
          reject(err);
        },
        complete(res) {
          console.log("complete: ", res);
          resolve(res);
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//上传
// let formData = new FormData();
// formData.append('file', file);
// formData.append('fileName', file.name);

export let upload = (data) => {
  console.log("data", data);
  return http({
    url: `${API.BASE_API}/api/upload`,
    method: "post",
    headers: {
      "Content-type": "multipart/form-data",
    },
    data: data,
  });
};
