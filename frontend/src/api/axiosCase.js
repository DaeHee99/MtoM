export default function axiosCase(axiosPromise) {
  return axiosPromise
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data.message);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Setting Request Error", err.message);
      }
    });
}
