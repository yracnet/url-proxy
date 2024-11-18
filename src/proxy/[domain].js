import fetch from "node-fetch";
import {
  ensureBody,
  ensureBodyString,
  getFetchRequestHeaders,
  parseRawDomain,
  processProxyResponse,
} from "../headers";
import { onLogger } from "../logger";

const proxyHandler = async (
  clientRequest,
  clientResponse,
  next,
  config = {}
) => {
  console.log("===================================");
  clientResponse.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  clientResponse.setHeader("Pragma", "no-cache");
  clientResponse.setHeader("Expires", "0");

  const { group, schema, domain } = parseRawDomain(clientRequest);
  const { method, body } = clientRequest;
  const fetchTarget = `${schema}://${domain}${clientRequest.url}`;
  const fetchRequestHeader = getFetchRequestHeaders(
    clientRequest.headers,
    config
  );
  console.log("::::::::::::::::::::::::::");
  onLogger("PROXY-REQUEST", {
    group,
    method,
    url: fetchTarget,
    request: {
      headers: fetchRequestHeader,
      body: ensureBodyString(body, method),
    },
  });
  try {
    const fetchResponse = await fetch(fetchTarget, {
      method,
      headers: fetchRequestHeader,
      //agent: new https.Agent({ rejectUnauthorized: false }),
      body: ensureBody(body, method),
    });
    const proxyResponse = await processProxyResponse(
      fetchResponse,
      clientResponse,
      config
    );
    onLogger("PROXY-RESPONSE", {
      group,
      method,
      url: fetchTarget,
      request: {
        headers: fetchRequestHeader,
        body: ensureBodyString(body, method),
      },
      response: {
        status: proxyResponse.status,
        headers: proxyResponse.headers,
        body: proxyResponse.content,
      },
    });
  } catch (error) {
    onLogger("PROXY-ERROR", {
      group,
      method,
      url: fetchTarget,
      request: {
        headers: fetchRequestHeader,
        body: ensureBodyString(body, method),
      },
      response: {
        status: "ERROR",
        headers: {},
        body: error,
      },
    });
    next(error);
  }
};

export default async (req, res, next) => proxyHandler(req, res, next, {});
