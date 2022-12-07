import client from "./client";
import axiosCase from "./axiosCase";

// export const loginApi = (elem) =>
//   axiosCase(
//     client.post("/api/users/login", elem, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   );

//   export const registApi = (elem) => {
//     return axiosCase(
//       client.post("/api/users", elem, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//     );
//   };

export const mentoringCreateApi = (elem) =>
  axiosCase(
    client.post("/api/postings", elem, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

export const mentoringListApi = (elem) =>
  axiosCase(
    client.get("/api/postings", {
      params: elem,
    })
  );
