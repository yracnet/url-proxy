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
  const { group, schema, domain } = parseRawDomain(clientRequest);
  const { method, body } = clientRequest;
  const fetchTarget = `${schema}://${domain}${clientRequest.url}`;
  try {
    const fetchRequestHeader = getFetchRequestHeaders(
      clientRequest.headers,
      config
    );
    onLogger("PROXY-REQUEST", {
      method,
      url: fetchTarget,
      headers: fetchRequestHeader,
      body: ensureBodyString(body, method),
    });
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
      method,
      url: fetchTarget,
      status: proxyResponse.status,
      headers: proxyResponse.headers,
      body: proxyResponse.content,
    });
  } catch (error) {
    onLogger("PROXY-ERROR", {
      url: fetchTarget,
      status: "ERROR",
      headers: {},
      body: error,
    });
    next(error);
  }
};

export default async (req, res, next) => proxyHandler(req, res, next, {});
