import httpClient from "../common/Http.js";

class PredictHoaxService {
  news() {
    const token = localStorage.getItem("token");
    return httpClient.get("/news", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new PredictHoaxService();
