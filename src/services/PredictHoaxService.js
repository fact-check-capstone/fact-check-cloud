import httpClient from "../common/Http.js";

class PredictHoaxService {
  predict(data) {
    const token = localStorage.getItem("token");
    return httpClient.post("/predict", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  histories() {
    const token = localStorage.getItem("token");
    return httpClient.get("/predict", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new PredictHoaxService();
