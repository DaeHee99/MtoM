import axios from "axios";

const client = axios.create();

client.defaults.baseURL = "http://localhost:3000";
// client.defaults.baseURL = "http://localhost:3080";

export default client;
