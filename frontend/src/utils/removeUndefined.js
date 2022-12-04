export default function removeUndefined(obj) {
  const exists = Object.entries(obj).filter((elem) => elem[1]);
  return exists.reduce((prev, curr) => Object.assign(prev, { [curr[0]]: curr[1] }), {});
}
