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

export const mentoringApplyApi = (postId) =>
  axiosCase(
    client.post(`/api/postings/apply`, {
      postid: postId,
    })
  );

export const mentoringDeleteApi = (postId) => axiosCase(client.delete(`/api/postings/${postId}`));

export const mentoringUpdateApi = (postId, data) =>
  axiosCase(
    client.put(`/api/postings/${postId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const mentoringPostApi = (postId) => axiosCase(client.get(`/api/postings/${postId}`));
