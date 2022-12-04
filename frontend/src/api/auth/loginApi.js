import client from "../client";
import axiosCase from "../axiosCase";

const loginApi = ({ ...elem }) => axiosCase(client.post("/api/v1/auth/login", { ...elem }));

export default loginApi;
