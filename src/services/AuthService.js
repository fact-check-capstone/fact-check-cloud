import httpClient from "../common/Http.js";

class AuthService {
  register(data) {
    return httpClient.post("/auth/register", data);
  }
  login(data) {
    return httpClient.post("/auth/login", data);
  }
  me() {
    const token = localStorage.getItem("token");
    return httpClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AuthService();
