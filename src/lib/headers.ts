//import ct from "content-type";
//import { Writable } from "stream";

import { Request } from "express";
import { Response } from "node-fetch";

const isPort = (value: any) => {
  const num = Number(value);
  return Number.isInteger(num) && !isNaN(num);
};

const processHeaders = (rawHeaders: any, config: any) => {
  const headers = Object.entries(rawHeaders)
    .filter((it) => !["host", "origin"].includes(it[0]))
    .reduce<Record<string, string>>((acc, [name, value]) => {
      //acc.set(name, Array.isArray(value) ? value.join(";") : String(value));
      acc[name] = Array.isArray(value) ? value.join(";") : String(value);
      return acc;
    }, {});
  return headers;
};

export const assertBufferCopy = (data: any) => {
  if (typeof data === "string") {
    return Buffer.from(data, "utf-8");
  } else if (Buffer.isBuffer(data)) {
    return Buffer.from(data);
  }
};

export const parseServeRequest = (req: Request, config: any) => {
  let { domain = "" } = req.params;
  const params = domain.split(":").reverse();
  if (isPort(params[0])) {
    let port = params.shift();
    params[0] = params[0] + ":" + port;
  }
  const group = params[2] || "common";
  const schema = params[1] || "http";
  const server = params[0] || "localhost";
  const url = `${schema}://${server}${req.url}`;
  const method = req.method;
  const headers = processHeaders(req.headersDistinct, config);
  const version = req.httpVersion;
  const content = assertBufferCopy(req.body);
  const copyContent = assertBufferCopy(req.body);
  return { group, method, url, headers, version, content, copyContent };
};

export const parseFetchResponse = async (resp: Response, config: any) => {
  const headers = processHeaders(resp.headers.raw(), config);
  const ab = await resp.arrayBuffer();
  const content = Buffer.from(ab);
  const copyContent = Buffer.from(ab);
  return {
    status: resp.status,
    size: resp.size,
    headers,
    content,
    copyContent,
  };
};

// export const normalizeHeaders = (headers) => {
//   return Object.entries(headers).reduce((acc, [name, value]) => {
//     acc[name] = [value].flatMap((it) => it).join(";");
//     return acc;
//   }, {});
// };

// export const getFetchRequestHeaders = (reqHeaders, config) => {
//   const headersNotAllowed = new Set([
//     "origin",
//     "referer",
//     "host",
//     "sec-fetch-site",
//     "sec-fetch-mode",
//     "sec-fetch-dest",
//     "sec-fetch-user",
//     "sec-ch-ua",
//     "sec-ch-ua-mobile",
//     "sec-ch-ua-platform",
//   ]);
//   const headers = Object.entries(reqHeaders)
//     .filter(([key]) => !headersNotAllowed.has(key.toLowerCase()))
//     .reduce((acc, [name, value]) => {
//       acc[name] = value;
//       return acc;
//     }, {});
//   headers.origin = "https://www.cloudsigma.com";
//   let contentType = headers["content-type"];
//   if (contentType) {
//     contentType = ct.parse(contentType).type;
//   }
//   //headers.referer = "https://lon.cloudsigma.com/ui/4.0/";
//   return [headers, contentType];
// };

// export const processProxyResponseHeaders = (
//   fetchResponseHeaders,
//   response,
//   config
// ) => {
//   const rawHeaders = fetchResponseHeaders.raw();
//   const headersNotAllowed = [
//     "set-cookie",
//     "x-powered-by",
//     "server",
//     "strict-transport-security",
//     "transfer-encoding",
//     "content-lenght",
//     "host",
//     "origin",
//     "referer",
//     "sec-fetch-*",
//     "accept-language",
//     "user-agent",
//     "connection",
//   ];

//   Object.entries(rawHeaders)
//     .filter(
//       ([name]) =>
//         !headersNotAllowed.some((pattern) => name.toLowerCase().match(pattern))
//     )
//     .forEach(([name, value]) => {
//       response.setHeader(name, value);
//     });
// };
// export const processProxyResponse = async (
//   fetchResponse,
//   clientResponse,
//   config
// ) => {
//   processProxyResponseHeaders(fetchResponse.headers, clientResponse, config);
//   let contentResponse = "";
//   clientResponse.status(fetchResponse.status);
//   let contentType = fetchResponse.headers.get("content-type");
//   if (contentType) {
//     contentType = ct.parse(contentType).type;
//   }
//   const contentEncoding = fetchResponse.headers.get("content-encoding");
//   if (contentEncoding || contentType) {
//     const bodyStream = fetchResponse.body;
//     const bufferStream = new Writable({
//       write(chunk, encoding, callback) {
//         contentResponse += chunk.toString();
//         callback();
//       },
//     });

//     bodyStream.pipe(clientResponse);
//     bodyStream.pipe(bufferStream);

//     await new Promise((resolve, reject) => {
//       bufferStream.on("finish", resolve);
//       bufferStream.on("error", reject);
//     });
//   } else {
//     contentResponse = await fetchResponse.text();
//     clientResponse.send(contentResponse);
//   }
//   if (contentType === "application/json") {
//     contentResponse = JSON.parse(contentResponse);
//   }
//   return {
//     status: fetchResponse.status,
//     headers: normalizeHeaders(clientResponse.getHeaders()),
//     contentType,
//     content: contentResponse,
//   };
// };

// export const ensureBody = (body, method) => {
//   if (method === "GET" || method === "HEAD") {
//     return undefined;
//   }
//   return body;
// };

// export const ensureBodyString = (body, method) => {
//   if (method === "GET" || method === "HEAD") {
//     return undefined;
//   }
//   return body?.toString();
// };

// export const urlParse = (urlString) => {
//   const url = new URL(urlString);
//   return {
//     schema: url.protocol,
//     server: url.hostname,
//     port: url.port,
//     path: url.pathname,
//     query: url.searchParams,
//   };
// };
