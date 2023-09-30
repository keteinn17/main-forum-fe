import request from "@/utils/request";
import authHeader from "@/services/auth-header";
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
    url: "/auth/login_google",
    method: "get",
    headers: authHeader(),
  });
};
