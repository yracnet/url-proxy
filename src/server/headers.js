const headersAllowed = [
  "content-type",
  "token",
  "authorization",
  "accept",
  "accept-encoding",
  "connection",
  "x-api-key",
  "service-name",
  "hmac-auth",
  "request-id",
  "server",
  "x-api-version",
  "x-request-id",
];
export const getHeaders = (headers) => {
  return headersAllowed
    .map((name) => {
      let value = headers.get ? headers.get(name) : headers[name];
      return {
        name,
        value,
      };
    })
    .filter((it) => it.value)
    .reduce((map, it) => {
      map[it.name] = it.value;
      return map;
    }, {});
};

export const ensureBody = (body, method) => {
  if (method === "GET" || method === "HEAD") {
    return undefined;
  }
  return body;
};

export const ensureBodyString = (body, method) => {
  if (method === "GET" || method === "HEAD") {
    return undefined;
  }
  return body?.toString();
};
