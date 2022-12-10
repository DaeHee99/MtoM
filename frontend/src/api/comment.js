import axiosCase from "./axiosCase";
import client from "./client";

export const postCommentApi = (data) =>
  axiosCase(
    client.post("/api/comment", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const deleteCommentApi = (commentId) =>
  axiosCase(
    client.delete(`/api/comment/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const getCommentApi = (postId) => axiosCase(client.get(`/api/comment/${postId}`));
