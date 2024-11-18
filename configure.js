import cors from "cors";
import express from "express";

export const viteServerBefore = (server, viteServer) => {
  server.use(
    express.raw({
      inflate: true,
      limit: "50mb",
      type: () => true,
    })
  );
  server.use(cors());
  server.use((req, res, next) => {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
  });
};

export const serverBefore = (server) => {
  server.use(
    express.raw({
      inflate: true,
      limit: "50mb",
      type: () => true,
    })
  );
  server.use(cors());
  server.use((req, res, next) => {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
  });
};
