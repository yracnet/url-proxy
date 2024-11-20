export const onLogger = (name, config = {}) => {
  name = `${name}           `.substring(0, 14);
  const {
    group,
    method,
    url,
    request = {},
    response = { status: "" },
  } = config;

  if (
    (200 <= response.status && response.status < 300) ||
    name == "PROXY-REQUEST"
  ) {
    console.log(">>>", name, ">", method, url, response.status);
  } else {
    console.log(
      ">>>",
      name,
      ">",
      method,
      url,
      response.status,
      ">",
      response.body
    );
  }
};
