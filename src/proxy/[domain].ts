import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import { parseFetchResponse, parseServeRequest } from "../lib/headers";
import { logRepository } from "../lib/model";

const FETCH = async (req: Request, res: Response, next: NextFunction) => {
  const pReq = await parseServeRequest(req, {});
  const { id } = await logRepository.create({
    group: pReq.group,
    version: pReq.version,
    method: pReq.method,
    url: pReq.url,
    status: "sending",
    reqHeaders: JSON.stringify(pReq.headers, null, 2),
    reqContent: pReq.content,
    //reqSize: proxyReq.size,
  });
  try {
    const resp = await fetch(pReq.url, {
      method: pReq.method,
      headers: pReq.headers,
      body: pReq.copyContent,
    });
    const pRes = await parseFetchResponse(resp, {});
    res.status(pRes.status);
    Object.entries(pRes.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.send(pRes.content);
    logRepository.update(
      {
        status: `${pRes.status}`,
        resHeaders: JSON.stringify(pRes.headers, null, 2),
        resContent: pRes.copyContent,
        //resSize: proxyRes.size,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    logRepository.update(
      {
        status: "fails",
        error: JSON.stringify(error, null, 2),
      },
      {
        where: { id },
      }
    );
    next(error);
  }
};

export default FETCH;
