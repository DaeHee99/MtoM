import axios from "axios";

const client = axios.create();

// client.defaults.baseURL = "http://localhost:3000";
client.defaults.baseURL = "http://localhost:80";

export default client;
