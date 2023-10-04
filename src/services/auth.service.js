import axios from "axios";
//import authHeader from "@/services/auth-header";
import { loginByGoogle } from "@/api/userApi";
const API_URL = "http://localhost:8082/api/v1/auth/";

class AuthService {
  async login(user) {
    const response = await axios.post(API_URL + "login", {
      email: user.email,
      password: user.password,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.access_token));
      localStorage.setItem("role", JSON.stringify(response.data.role));
      localStorage.setItem(
        "account_type",
        JSON.stringify(response.data.account_type)
      );
    }
    return response.data;
  }

  async loginByGoogle() {
    const response = await loginByGoogle();
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.access_token));
      localStorage.setItem("role", JSON.stringify(response.data.role));
      localStorage.setItem(
        "account_type",
        JSON.stringify(response.data.account_type)
      );
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("account_type");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
