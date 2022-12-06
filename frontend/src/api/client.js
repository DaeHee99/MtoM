import axios from "axios";
import qs from "qs";

const client = axios.create();

client.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};
client.defaults.baseURL = "http://localhost:3000";

export default client;
