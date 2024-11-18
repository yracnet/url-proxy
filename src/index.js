export default (req, res, next) => {
  const startTime = Date.now();

  // Almacenar la respuesta original para enviarla después
  const originalSend = res.send;

  res.send = function (body) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const harEntry = {
      startedDateTime: new Date(startTime).toISOString(),
      time: duration,
      request: {
        method: req.method,
        url: req.protocol + "://" + req.get("host") + req.originalUrl,
        headers: Object.entries(req.headers).map(([name, value]) => ({
          name,
          value,
        })),
        bodySize: Buffer.byteLength(body),
      },
      response: {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: Object.entries(res.getHeaders()).map(([name, value]) => ({
          name,
          value,
        })),
        bodySize: Buffer.byteLength(body),
        content: {
          mimeType: res.get("Content-Type") || "application/json", // Asumimos tipo 'json' por defecto
          size: Buffer.byteLength(body),
        },
      },
      timings: {
        wait: duration,
        receive: 0,
        send: 0,
      },
    };

    const har = {
      log: {
        version: "1.2",
        creator: { name: "Express HAR Generator", version: "1.0.0" },
        entries: [harEntry],
      },
    };

    const harPath = "requests.har";
    fs.appendFileSync(harPath, JSON.stringify(har) + "\n");

    originalSend.call(this, body);
  };

  next();
};
