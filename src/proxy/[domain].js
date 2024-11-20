import fetch from "node-fetch";
import {
  ensureBody,
  ensureBodyString,
  getFetchRequestHeaders,
  parseRawDomain,
  processProxyResponse,
} from "../lib/headers";
import { createRequest, updateError, updateResponse } from "../lib/storage";

const proxyHandler = async (
  clientRequest,
  clientResponse,
  next,
  config = {}
) => {
  console.log("===================================");
  const { group, schema, domain } = parseRawDomain(clientRequest);
  const { method, body } = clientRequest;
  const fetchTarget = `${schema}://${domain}${clientRequest.url}`;
  const fetchRequestHeader = getFetchRequestHeaders(
    clientRequest.headers,
    config
  );
  const idRequest = await createRequest({
    group,
    method,
    url: fetchTarget,
    headers: fetchRequestHeader,
    contentType: fetchRequestHeader["content-type"],
    content: ensureBodyString(body, method),
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
    updateResponse(idRequest, {
      status: proxyResponse.status,
      headers: proxyResponse.headers,
      contentType: proxyResponse.contentType,
      content: proxyResponse.content,
    });
  } catch (error) {
    updateError(idRequest, error);
    next(error);
  }
};

export default async (req, res, next) => proxyHandler(req, res, next, {});
