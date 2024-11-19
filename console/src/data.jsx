export const columns = [
  { key: "id", name: "#", frozen: true, width: 40 },
  { key: "method", name: "Method", width: 60, style: { textAlign: "center" } },
  { key: "server", name: "Server", width: 200, style: { textAlign: "left" } },
  { key: "path", name: "Path", width: 200, style: { textAlign: "left" } },
  { key: "status", name: "Status", width: 60, style: { textAlign: "center" } },
  { key: "time", name: "Time (ms)", width: 80, style: { textAlign: "right" } },
  { key: "size", name: "Size (KB)", width: 80, style: { textAlign: "right" } },
];

export const rows = [
  {
    id: 1,
    server: "https://api.example.com",
    path: "/user/data",
    method: "GET",
    status: 200,
    time: 150,
    size: 50,
  },
  {
    id: 2,
    server: "https://api.example.com",
    path: "/user/settings",
    method: "POST",
    status: 201,
    time: 250,
    size: 120,
  },
  {
    id: 3,
    server: "https://cdn.example.com",
    path: "/assets/img/logo.png",
    method: "GET",
    status: 200,
    time: 80,
    size: 45,
  },
  {
    id: 4,
    server: "https://api.example.com",
    path: "/user/profile",
    method: "PUT",
    status: 200,
    time: 180,
    size: 95,
  },
  {
    id: 5,
    server: "https://api.example.com",
    path: "/user/logout",
    method: "POST",
    status: 200,
    time: 220,
    size: 10,
  },
  {
    id: 6,
    server: "https://cdn.example.com",
    path: "/assets/css/styles.css",
    method: "GET",
    status: 304,
    time: 110,
    size: 75,
  },
  {
    id: 7,
    server: "https://api.example.com",
    path: "/user/friends",
    method: "GET",
    status: 200,
    time: 320,
    size: 150,
  },
  {
    id: 8,
    server: "https://cdn.example.com",
    path: "/assets/js/app.js",
    method: "GET",
    status: 200,
    time: 250,
    size: 200,
  },
  {
    id: 9,
    server: "https://api.example.com",
    path: "/user/posts",
    method: "GET",
    status: 500,
    time: 500,
    size: 30,
  },
  {
    id: 10,
    server: "https://api.example.com",
    path: "/user/messages",
    method: "GET",
    status: 200,
    time: 100,
    size: 60,
  },
];