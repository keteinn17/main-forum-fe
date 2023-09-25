import request from "@/utils/request";

export const getAllcategory = () => {
  return request({
    url: "/admin/category/get_all",
    method: "get",
  });
};
