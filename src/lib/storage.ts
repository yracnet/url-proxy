import { logRepository } from "./model";

type RequestInfo = {
  group: string;
  version: string;
  method: string;
  url: string;
  headers: any;
  content: Buffer | undefined;
};

export const createRequest = async ({
  group,
  version,
  method,
  url,
  headers,
  content,
}: RequestInfo) => {
  const log = await logRepository.create(
    {
      group,
      version,
      method,
      url,
      status: "pending",
      reqHeaders: JSON.stringify(headers, null, 2),
      reqContent: Buffer.isBuffer(content) ? content : null,
    },
    { raw: true }
  );
  console.log("REQUEST : ", log.id, ":", method, url);
  return log.id;
};

type ResponseInfo = {
  status: string;
  headers: Record<string, string>;
  content: Buffer | undefined;
};
export const updateResponse = async (
  id: number,
  { status, headers, content }: ResponseInfo
) => {
  await logRepository.update(
    {
      status,
      resHeaders: JSON.stringify(headers, null, 2),
      resContent: Buffer.isBuffer(content) ? content : null,
    },
    {
      where: { id },
    }
  );
  console.log("RESPONSE: ", id, ":", status);
};

export const updateError = async (id: number, error: any) => {
  const errorInfo = {
    type: error.name || "Error",
    message: error.message || "Unknown error",
    trace: error.stack || "No stack trace",
  };
  await logRepository.update(
    {
      status: "fails",
      error: JSON.stringify(errorInfo, null, 2),
    },
    {
      where: { id },
    }
  );
  console.log("ERROR: ", id, ":", errorInfo);
};
