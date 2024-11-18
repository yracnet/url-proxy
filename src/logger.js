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
  // if (group === "API") {
  //   if (
  //     (200 <= response.status && response.status < 300) ||
  //     name == "PROXY-REQUEST"
  //   ) {
  //     console.log(">>>", name, ">", method, url, response.status);
  //   } else {
  //     console.log(
  //       ">>>",
  //       name,
  //       ">",
  //       method,
  //       url,
  //       response.status,
  //       ">",
  //       response.body
  //     );
  //   }
  // }
  // if (group === "API") {
  //   console.log(">>>", name, ">", method, url, response.status, response.body);
  //   //console.log(">>>", name, ">", config);
  //   if (["PROXY-RESPONSE", "PROXY-ERROR"].includes(name)) {
  //     console.log(">>>", request.headers);
  //     if (response.status != 200) {
  //       //         console.log(
  //       //           `
  //       // # Linux
  //       // curl -X ${method} "${url}" -H "Authorization: ${request.headers.authorization}"
  //       // # Windows
  //       // $headers = @{
  //       //   "Authorization" = "${request.headers.authorization}"
  //       // }
  //       // $response = Invoke-WebRequest -Uri "${url}" -Headers $headers -Method ${method}
  //       // $response.Content
  //       // `
  //       //         );
  //       // console.log(">>>", config);
  //     }
  //   } else {
  //     console.log(">>>", config);
  //   }
  // }
};
