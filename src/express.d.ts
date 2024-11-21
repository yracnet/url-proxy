declare global {
  namespace Express {
    interface Request {
      idLog?: number;
      group?: string;
    }
  }

  namespace NodeJS {
    interface IncomingMessage {
      idLog?: number;
      group?: string;
    }
  }
}
