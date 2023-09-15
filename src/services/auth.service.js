import axios from "axios";

const API_URL = "http://192.168.10.31:8082/api/v1/auth/";

class AuthService {
  async login(user) {
    const response = await axios.post(API_URL + "login", {
      email: user.email,
      password: user.password,
    });
    if (response.data) {
      console.log("Loginnnnnnn: ", JSON.stringify(response.data.message));
      localStorage.setItem("user", JSON.stringify(response.data.message));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
    //localStorage.removeItem("token");
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
