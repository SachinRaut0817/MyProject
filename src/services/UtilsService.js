import { BaseUrls } from "../config/BaseUrls";
import history from "./history";

const axios = require("axios");

const Request = (options) => {
  const BASE_URL = BaseUrls.REACT_APP_API_PATH;

  let userData = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    url: BASE_URL + options["url"],
    method: options["method"],
    data: options["body"],
  };

  if (userData && userData.auth_token) {
    config.headers["access-token"] = userData.auth_token;
  }

  return axios
    .request(config)
    .then((response) => {
      if (response && response.data) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error && error.response && error.response.status === 401) {
        //  LocalStorage.removeItem("user");
        // return error;
        history.push("login");
      } else {
        return error.response.data;
      }

      //  return error;
    });
};

export default Request;
