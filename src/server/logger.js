export const onLogger = (name, config = {}) => {
  name = `${name}           `.substring(0, 14);
  const { method, url, status = "" } = config;
  console.log(">>>", name, ">", method, url, status);
};
