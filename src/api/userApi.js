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

export const changePassword = (data) => {
  return request({
    url: "/user/profile/change_password",
    method: "put",
    data: data,
  });
};

export const updateProfile = (data) => {
  return request({
    url: "/user/profile/edit_profile",
    method: "put",
    data: data,
  });
};
