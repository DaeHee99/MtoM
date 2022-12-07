import client from "./client";
import axiosCase from "./axiosCase";

export const mentoringCreateApi = (elem) =>
  axiosCase(
    client.post("/api/postings", elem, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const mentoringListApi = (elem) =>
  axiosCase(
    client.get("/api/postings", {
      params: elem,
    })
  );

export const mentoringPostApi = (postId) => axiosCase(client.get(`/api/postings/${postId}`));
