import fetch from "node-fetch";
import https from "https";
import { ensureBody, ensureBodyString, getHeaders } from "../headers";
import { onLogger } from "../logger";

export default async (req, res, next) => {
  const { domain } = req.params;
  const { method, body } = req;

  const url = `https://${domain}${req.url}`;
  const headers = getHeaders(req.headers);
  onLogger("PROXY-REQUEST", {
    method,
    url,
    headers,
    body: ensureBodyString(body, method),
  });
  try {
    const resp = await fetch(url, {
      method,
      headers,
      //agent: new https.Agent({ rejectUnauthorized: false }),
      body: ensureBody(body, method),
    });

    const rawHeaders = getHeaders(resp.headers.raw());
    Object.keys(rawHeaders).forEach((name) => {
      res.setHeader(name, rawHeaders[name]);
    });
    const text = await resp.text();
    res.status(resp.status).send(text);
    onLogger("PROXY-RESPONSE", {
      method,
      url,
      status: resp.status,
      headers: rawHeaders,
      body: text,
    });
  } catch (error) {
    onLogger("PROXY-ERROR", {
      url,
      status: "ERROR",
      headers: {},
      body: error,
    });
    next(error);
  }
};
