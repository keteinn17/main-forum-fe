import request from "@/utils/request";
export const createTopic = () => {
  return request({
    url: "/user/profile",
    method: "post",
  });
};

export const getAllTopic = () => {
  return request({
    url: "/topic/get_all_topics",
    method: "get",
  });
};

export const getTopicById = (data) => {
  return request({
    url: `/topic/${data}`,
    method: "get",
  });
};
