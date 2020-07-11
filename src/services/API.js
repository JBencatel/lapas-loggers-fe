import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `http://lapas-loggers.com/api`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};
