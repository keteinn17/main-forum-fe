import request from "@/utils/request";
export const createTopic = () => {
  return request({
    url: "/user/profile",
    method: "post",
  });
};

export const getAllTopic = (data) => {
  return request({
    url: "/topic/get_all",
    method: "get",
    data: data,
  });
};
