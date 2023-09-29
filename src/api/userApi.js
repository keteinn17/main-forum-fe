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

export const loginByGoogle = (token) => {
  return request({
    url: "/auth/login_google",
    method: "post",
    data: token,
  });
};
