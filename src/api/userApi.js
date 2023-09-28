import request from "@/utils/request";

export const getUserInfo = () => {
  return request({
    url: "/user/profile",
    method: "get",
  });
};

export const register = (data) => {
  console.log(data);
  return request({
    url: "/auth/registry",
    method: "post",
    data: data,
  });
};

export const loginByGoogle = () => {
  return request({
    url: "/auth/login/google",
    method: "get",
  });
};
