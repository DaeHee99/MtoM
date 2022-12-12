import axios from "axios";

const client = axios.create();

client.defaults.baseURL = "http://localhost:3000";
// client.defaults.baseURL = "http://ec2-3-36-86-195.ap-northeast-2.compute.amazonaws.com";

export default client;
