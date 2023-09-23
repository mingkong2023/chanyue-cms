import { upload, qiniuUpload } from "@/api/upload.js";
export let tinymceSet = {
  //避免图片地址和链接地址转换成相对路径
  convert_urls: false,
  // 开启组件拓展的 上传图片功能，工具栏 图片按钮 弹框中出现 `upload` 选项
  custom_images_upload: true,
  // 复用 图片上传 api 地址
  images_upload_url: "/api/upload",

  // 上传成功回调函数，return 图片地址。默认 response.location
  custom_images_upload_callback: (res) => {
    if (res.code === 200) {
      return res.data.path;
    }
  },
  // 上传 api 请求头
  custom_images_upload_header: { "X-Token": "xxxx" },
  // 上传 api 额外的参数。图片默认 file
  custom_images_upload_param: {},
  height: 400, // editor 高度
  toolbar:
    "undo redo| code codesample | fullscreen | blocks alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsize forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
  toolbar_mode: "sliding",
  quickbars_selection_toolbar:
    "removeformat | bold italic underline strikethrough | fontsize forecolor backcolor",
  plugins: "link code image media table lists fullscreen quickbars codesample",
  font_size_formats: "12px 14px 16px 18px",
  link_default_target: "_blank",
  link_title: false,
  nonbreaking_force_tab: true,
  // 以中文简体为例
  language: "zh-Hans",
  language_url: "/public/admin/tinymce/zh-Hans.js",

  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
    { text: "C", value: "c" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
  ],
};
