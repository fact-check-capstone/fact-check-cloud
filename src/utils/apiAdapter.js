// const axios = require("axios");
import axios from "axios";

const apiAdapter = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });
};

export default apiAdapter;
