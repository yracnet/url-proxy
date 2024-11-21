import { Request, Response } from "express";
import httpProxy from "http-proxy";
import { parseURLParameter } from "../lib/headers";
import { logRepository } from "../lib/model";

const proxy = httpProxy.createProxyServer({ secure: false });

proxy.on("proxyReq", async (proxyReq, req) => {
  const headers = proxyReq.getHeaderNames().reduce<any>((acc, name) => {
    acc[name] = proxyReq.getHeader(name);
    return acc;
  }, {});

  //@ts-ignore
  const reqContent = Buffer.isBuffer(req.body) ? req.body : null;
  //@ts-ignore
  const { reqGroup = "common" } = req;
  const log = await logRepository.create({
    group: reqGroup,
    version: req.httpVersion,
    method: proxyReq.method,
    url: `${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`,
    status: "sending",
    reqHeaders: JSON.stringify(headers, null, 2),
    reqContent,
  });
  //@ts-ignore
  req.reqId = log.id;
  //@ts-ignore
  console.log(">proxyReq>>>>", req.reqId, log.id);
});

proxy.on("proxyRes", (proxyRes, req) => {
  //@ts-ignore
  const { reqId } = req;
  console.log(">proxyRes>>>>", reqId);
  const headers = Object.entries(proxyRes.headersDistinct).reduce<any>(
    (acc, [name, value]) => {
      acc[name] = value?.join(";");
      return acc;
    },
    {}
  );
  const responseBody: any[] = [];
  proxyRes.on("data", (chunk) => {
    responseBody.push(chunk);
  });
  proxyRes.on("end", () => {
    const content = Buffer.concat(responseBody);
    logRepository.update(
      {
        status: `${proxyRes.statusCode}`,
        resHeaders: JSON.stringify(headers, null, 2),
        resContent: content,
      },
      {
        where: { id: reqId },
      }
    );
  });
});

proxy.on("error", async (error, req, res) => {
  //@ts-ignore
  const { reqId } = req;
  const errorInfo = {
    type: error.name || "Error",
    message: error.message || "Unknown error",
    trace: error.stack || "No stack trace",
  };
  logRepository.update(
    {
      status: "fails",
      error: JSON.stringify(errorInfo, null, 2),
    },
    {
      where: { id: reqId },
    }
  );
  console.error("Error global en el proxy:", error);
  //res.writeHead(502, { "Content-Type": "text/plain" });
  res.end("Error en la puerta de enlace (502)");
});

export default (req: Request, res: Response) => {
  const { group, url } = parseURLParameter(req, {});
  //@ts-ignore
  req.reqGroup = group;
  proxy.web(req, res, {
    target: url,
    changeOrigin: true,
    autoRewrite: true,
    secure: false,
  });
};
