import client from "./client";
import axiosCase from "./axiosCase";
import axios from "axios";

export const loginApi = (elem) =>
  axiosCase(
    client.post("/api/users/login", elem, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const registApi = (elem) => {
  console.log("오긴하냐?");
  return axiosCase(
    client.post("/api/users", elem, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
};

export const logoutApi = () => axiosCase(client.get("/api/users/logout"));

export const checkApi = ({ ...elem }) => axiosCase(client.get("/api/users/auth/check"));

export const mentorRegistApi = ({ ...elem }) =>
  axiosCase(
    client.post(
      "/api/users/mentor",
      { ...elem },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );

export const emailSendApi = ({ ...elem }) =>
  axiosCase(
    client.post(
      "/api/users/email",
      { ...elem },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );
