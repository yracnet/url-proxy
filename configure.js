import express from "express";
import cors from "cors";

export const viteServerBefore = (server, viteServer) => {
  server.use(
    express.raw({
      inflate: true,
      limit: "50mb",
      type: () => true,
    })
  );
  server.use(cors());
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
};
