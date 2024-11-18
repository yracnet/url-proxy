import { Writable } from "stream";

const isPort = (value) => {
  const num = Number(value);
  return Number.isInteger(num) && !isNaN(num);
};

export const parseRawDomain = (clientRequest, config) => {
  let { domain = "" } = clientRequest.params;
  const params = domain.split(":").reverse();
  if (isPort(params[0])) {
    let port = params.shift();
    params[0] = params[0] + ":" + port;
  }
  return {
    group: params[2] || "common",
    schema: params[1] || "http",
    domain: params[0] || "localhost",
  };
};

export const getFetchRequestHeaders = (reqHeaders, config) => {
  const headersNotAllowed = new Set([
    "origin", // Afecta CORS, no debe ser enviada por el cliente al servidor
    "referer", // A veces puede causar problemas si se envía de forma incorrecta
    "host", // El proxy debería manejar el encabezado "Host"
    "sec-fetch-site", // Cabeceras relacionadas con la seguridad
    "sec-fetch-mode",
    "sec-fetch-dest",
    "sec-fetch-user",
    "sec-ch-ua", // Headers de características del navegador que no deberían ser enviados por el cliente
    "sec-ch-ua-mobile",
    "sec-ch-ua-platform",
    // "cookie", // El proxy puede manejar las cookies de manera independiente
    // "authorization", // Esta cabecera se debe manejar con precaución
  ]);

  // Filtrar y reducir en un solo paso las cabeceras
  const headers = Object.entries(reqHeaders)
    .filter(([key]) => !headersNotAllowed.has(key.toLowerCase()))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  headers.origin = "https://www.cloudsigma.com";
  //headers.referer = "https://lon.cloudsigma.com/ui/4.0/";
  return headers;
};

export const processProxyResponseHeaders = (
  fetchResponseHeaders,
  response,
  config
) => {
  const rawHeaders = fetchResponseHeaders.raw();
  const headersNotAllowed = [
    "set-cookie",
    "x-powered-by",
    "server",
    "strict-transport-security",
    "transfer-encoding",
    "content-lenght",
    "host",
    "origin",
    "referer",
    "sec-fetch-*",
    "accept-language",
    "user-agent",
    "connection",
  ];

  Object.entries(rawHeaders)
    .filter(
      ([name]) =>
        !headersNotAllowed.some((pattern) => name.toLowerCase().match(pattern))
    )
    .forEach(([name, value]) => {
      response.setHeader(name, value);
    });
};
export const processProxyResponse = async (
  fetchResponse,
  clientResponse,
  config
) => {
  processProxyResponseHeaders(fetchResponse.headers, clientResponse, config);
  let contentAsText = "";
  clientResponse.status(fetchResponse.status);
  const contentType = fetchResponse.headers.get("content-type");
  const contentEncoding = fetchResponse.headers.get("content-encoding");
  if (contentEncoding || contentType) {
    const bodyStream = fetchResponse.body;
    const bufferStream = new Writable({
      write(chunk, encoding, callback) {
        contentAsText += chunk.toString();
        callback();
      },
    });

    bodyStream.pipe(clientResponse);
    bodyStream.pipe(bufferStream);

    await new Promise((resolve, reject) => {
      bufferStream.on("finish", resolve);
      bufferStream.on("error", reject);
    });
  } else {
    contentAsText = await fetchResponse.text();
    clientResponse.send(contentAsText);
  }
  return {
    status: fetchResponse.status,
    headers: clientResponse.headers,
    content: contentAsText,
  };
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
