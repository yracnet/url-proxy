import { defineConfig } from "vite";
import { pluginAPIRoutes } from "vite-plugin-api-routes";

export default defineConfig({
  server: {
    port: 2000,
  },
  plugins: [
    pluginAPIRoutes({
      routeBase: "",
      configure: "./configure.js",
      dirs: [
        {
          dir: "/src/server/proxy",
          route: "proxy",
        },
      ],
    }),
  ],
});
