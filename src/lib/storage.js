import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const createDB = async ({ force = false }) => {
  const dbPath = path.join(process.cwd(), "database.db");

  const dbInternal = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  if (force) {
    await dbInternal.exec(`DROP TABLE IF EXISTS requests`);
  }

  await dbInternal.exec(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "group" VARCHAR(20),
      url TEXT,
      status VARCHAR(20),
      request TEXT,
      response TEXT,
      error TEXT,
      created_at DATE,
      updated_at DATE
    );
  `);

  //db = dbInternal;
  return dbInternal;
};

let db = await createDB({ force: false });

export const parseContent = (body, info) => {
  if (info.method === "GET") {
    return "";
  }
  if (info.contentType === "application/json") {
    try {
      return JSON.parse(body);
    } catch (e) {
      return {};
    }
  }
  if (
    info.contentType === "application/octet-stream" ||
    info.contentType === "application/hex"
  ) {
    return Buffer.from(body).toString("base64");
  }

  return body;
};

export const parseHeaders = (headers) => {
  const parsedHeaders = {};
  for (const [key, value] of Object.entries(headers)) {
    parsedHeaders[key.toLowerCase()] = value;
  }
  return parsedHeaders;
};

export const createRequest = async (requestInfo) => {
  const { group, method, url, headers, contentType, content } = requestInfo;
  const result = await db.run(
    'INSERT INTO requests ("group", url, status, request, created_at) VALUES (?, ?, ?, ?, ?)',
    [
      group,
      url,
      "pending",
      JSON.stringify(
        {
          method,
          headers,
          contentType,
          content,
        },
        null,
        2
      ),
      new Date().toISOString(),
    ]
  );
  console.log("REQUEST: ", result.lastID, ":", method, url);
  return result.lastID;
};

export const updateResponse = async (id, responseInfo) => {
  const { status, headers, contentType, content } = responseInfo;
  await db.run(
    "UPDATE requests SET status = ?, response = ?, updated_at = ? WHERE id = ?",
    [
      status,
      JSON.stringify(
        {
          status,
          headers,
          contentType,
          content,
        },
        null,
        2
      ),
      new Date().toISOString(),
      id,
    ]
  );
  console.log("RESPONSE: ", id, ":", status, contentType);
};

export const updateError = async (id, error) => {
  await db.run(
    "UPDATE requests SET status = ?, error = ?, updated_at = ? WHERE id = ?",
    [
      "error",
      JSON.stringify(
        {
          type: error.name || "Error",
          message: error.message || "Unknown error",
          trace: error.stack || "No stack trace",
        },
        null,
        2
      ),
      new Date().toISOString(),
      id,
    ]
  );
  console.log("ERROR: ", id, ":", error);
};
