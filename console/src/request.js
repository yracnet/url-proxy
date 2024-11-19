export const COLS = [
  { key: "id", name: "#", frozen: true, width: 40 },
  { key: "method", name: "Method", width: 80, style: { textAlign: "center" } },
  { key: "url", name: "URL", width: 250, style: { textAlign: "left" } },
  { key: "server", name: "Server", width: 150, style: { textAlign: "left" } },
  { key: "path", name: "Path", width: 200, style: { textAlign: "left" } },
  {
    key: "status",
    name: "Status",
    width: 60,
    style: { textAlign: "center" },
    renderCell: ({ row }) => {
      return row.response?.status;
    },
  },
  {
    key: "request_size",
    name: "Request Size (KB)",
    width: 120,
    style: { textAlign: "right" },
    renderCell: ({ row }) => {
      return row.size || 0;
    },
  },
  {
    key: "response_size",
    name: "Response Size (KB)",
    width: 120,
    style: { textAlign: "right" },
    renderCell: ({ row }) => {
      return row.response?.size || 0;
    },
  },
  {
    key: "start",
    name: "Start Time",
    width: 160,
    style: { textAlign: "center" },
    renderCell: ({ row }) => {
      return row.start_time ? new Date(row.start_time).toISOString() : "N/A";
    },
  },
  {
    key: "end",
    name: "End Time",
    width: 160,
    style: { textAlign: "center" },
    renderCell: ({ row }) => {
      return row.end_time ? new Date(row.end_time).toISOString() : "N/A";
    },
  },
  {
    key: "error",
    name: "Error",
    width: 200,
    style: { textAlign: "left" },
    renderCell: ({ row }) => {
      return row.error?.message;
    },
  },
  {
    key: "headers",
    name: "Headers",
    width: 200,
    style: { textAlign: "left" },
    renderCell: ({ row }) => {
      const headers = row.headers;
      return headers
        ? Object.keys(headers)
            .map((key) => `${key}: ${headers[key].join(", ")}`)
            .join("; ")
        : "N/A";
    },
  },
  {
    key: "content",
    name: "Response Content",
    width: 150,
    style: { textAlign: "left" },
    renderCell: ({ row }) => {
      const content = row.response?.content;
      return content ? `${content.slice(0, 50)}...` : "No content";
    },
  },
];

export const LOG = [
  {
    id: 1,
    method: "GET",
    url: "https://app.hiska.com/api/invoices/12345",
    server: "https://app.hiska.com",
    path: "/api/invoices/12345",
    headers: {
      Authorization: ["Bearer token123"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
        "Cache-Control": ["no-cache"],
      },
      content: '{"invoice_id":12345, "amount":500.00, "status":"paid"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:00:00Z",
    end_time: "2024-11-18T09:00:02Z",
  },
  {
    id: 2,
    method: "POST",
    url: "https://app.hiska.com/api/expenses",
    server: "https://app.hiska.com",
    path: "/api/expenses",
    headers: {
      Authorization: ["Bearer token456"],
      "Content-Type": ["application/json"],
    },
    content: '{"description":"Office Supplies","amount":100.00}',
    response: {
      status: 201,
      headers: {
        Location: ["/api/expenses/67890"],
      },
      content: '{"expense_id":67890, "status":"created"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:05:00Z",
    end_time: "2024-11-18T09:05:03Z",
  },
  {
    id: 3,
    method: "GET",
    url: "https://app.hiska.com/api/payments?invoice_id=12345",
    server: "https://app.hiska.com",
    path: "/api/payments?invoice_id=12345",
    headers: {
      Authorization: ["Bearer token123"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"payment_id":98765, "amount":500.00, "status":"completed"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:10:00Z",
    end_time: "2024-11-18T09:10:01Z",
  },
  {
    id: 4,
    method: "PUT",
    url: "https://app.hiska.com/api/invoices/12345",
    server: "https://app.hiska.com",
    path: "/api/invoices/12345",
    headers: {
      Authorization: ["Bearer token789"],
      "Content-Type": ["application/json"],
    },
    content: '{"status":"paid"}',
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"invoice_id":12345, "status":"paid", "amount":500.00}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:15:00Z",
    end_time: "2024-11-18T09:15:02Z",
  },
  {
    id: 5,
    method: "DELETE",
    url: "https://app.hiska.com/api/expenses/67890",
    server: "https://app.hiska.com",
    path: "/api/expenses/67890",
    headers: {
      Authorization: ["Bearer token456"],
    },
    content: "",
    response: {
      status: 204,
      headers: {},
      content: "",
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:20:00Z",
    end_time: "2024-11-18T09:20:01Z",
  },
  {
    id: 6,
    method: "POST",
    url: "https://app.hiska.com/api/receipts/upload",
    server: "https://app.hiska.com",
    path: "/api/receipts/upload",
    headers: {
      Authorization: ["Bearer token789"],
      "Content-Type": ["multipart/form-data"],
    },
    content: "file=@/path/to/receipt.pdf",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"receipt_id":112233, "status":"uploaded"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:25:00Z",
    end_time: "2024-11-18T09:25:05Z",
  },
  {
    id: 7,
    method: "GET",
    url: "https://app.hiska.com/api/transactions?date=2024-11-18",
    server: "https://app.hiska.com",
    path: "/api/transactions?date=2024-11-18",
    headers: {
      Authorization: ["Bearer token123"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content:
        '[{"transaction_id":1, "amount":200.00, "description":"Payment"}]',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:30:00Z",
    end_time: "2024-11-18T09:30:01Z",
  },
  {
    id: 8,
    method: "GET",
    url: "https://app.hiska.com/api/reports/financial-summary?year=2024",
    server: "https://app.hiska.com",
    path: "/api/reports/financial-summary?year=2024",
    headers: {
      Authorization: ["Bearer token456"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"year":2024, "revenue":1000000.00, "expenses":500000.00}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:35:00Z",
    end_time: "2024-11-18T09:35:01Z",
  },
  {
    id: 9,
    method: "POST",
    url: "https://app.hiska.com/api/transactions/transfer",
    server: "https://app.hiska.com",
    path: "/api/transactions/transfer",
    headers: {
      Authorization: ["Bearer token123"],
      "Content-Type": ["application/json"],
    },
    content: '{"from_account":1, "to_account":2, "amount":250.00}',
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"transaction_id":223344, "status":"completed"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:40:00Z",
    end_time: "2024-11-18T09:40:02Z",
  },
  {
    id: 10,
    method: "GET",
    url: "https://app.hiska.com/api/users/123",
    server: "https://app.hiska.com",
    path: "/api/users/123",
    headers: {
      Authorization: ["Bearer token789"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"user_id":123, "name":"John Doe", "role":"accountant"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:45:00Z",
    end_time: "2024-11-18T09:45:01Z",
  },
  {
    id: 11,
    method: "PUT",
    url: "https://app.hiska.com/api/users/123",
    server: "https://app.hiska.com",
    path: "/api/users/123",
    headers: {
      Authorization: ["Bearer token123"],
      "Content-Type": ["application/json"],
    },
    content: '{"name":"Jane Doe", "role":"manager"}',
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"user_id":123, "name":"Jane Doe", "role":"manager"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:50:00Z",
    end_time: "2024-11-18T09:50:02Z",
  },
  {
    id: 12,
    method: "POST",
    url: "https://app.hiska.com/api/reports/generate",
    server: "https://app.hiska.com",
    path: "/api/reports/generate",
    headers: {
      Authorization: ["Bearer token456"],
      "Content-Type": ["application/json"],
    },
    content: '{"report_type":"profit_loss", "period":"2024-Q4"}',
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"report_id":556677, "status":"generated"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T09:55:00Z",
    end_time: "2024-11-18T09:55:02Z",
  },
  {
    id: 13,
    method: "GET",
    url: "https://app.hiska.com/api/expenses/category?category=travel",
    server: "https://app.hiska.com",
    path: "/api/expenses/category?category=travel",
    headers: {
      Authorization: ["Bearer token789"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content:
        '{"category":"travel", "expenses":[{"expense_id":12345, "amount":100.00}]}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T10:00:00Z",
    end_time: "2024-11-18T10:00:01Z",
  },
  {
    id: 14,
    method: "POST",
    url: "https://app.hiska.com/api/expenses/upload",
    server: "https://app.hiska.com",
    path: "/api/expenses/upload",
    headers: {
      Authorization: ["Bearer token123"],
      "Content-Type": ["multipart/form-data"],
    },
    content: "file=@/path/to/receipt.jpg",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content: '{"expense_id":78901, "status":"uploaded"}',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T10:05:00Z",
    end_time: "2024-11-18T10:05:05Z",
  },
  {
    id: 15,
    method: "GET",
    url: "https://app.hiska.com/api/reports/transactions?date=2024-11-18",
    server: "https://app.hiska.com",
    path: "/api/reports/transactions?date=2024-11-18",
    headers: {
      Authorization: ["Bearer token456"],
      Accept: ["application/json"],
    },
    content: "",
    response: {
      status: 200,
      headers: {
        "Content-Type": ["application/json"],
      },
      content:
        '[{"transaction_id":1, "amount":200.00, "description":"Payment"}]',
    },
    error: {
      type: "",
      message: "",
    },
    start_time: "2024-11-18T10:10:00Z",
    end_time: "2024-11-18T10:10:01Z",
  },
];
