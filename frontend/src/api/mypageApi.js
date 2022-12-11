// export const mentoringListApi = (elem) =>
//   axiosCase(
//     client.get("/api/postings", {
//       params: elem,
//     })
//   );

import axiosCase from "./axiosCase";
import client from "./client";

export const getMyInfoApi = () => axiosCase(client.get(`/api/mypage`));

export const getMentorPageApi = () => axiosCase(client.get(`/api/mypage/mentor/mypost`));
