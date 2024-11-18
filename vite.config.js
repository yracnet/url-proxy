import { defineConfig } from "vite";
import { pluginAPIRoutes } from "vite-plugin-api-routes";

export default defineConfig({
  server: {
    port: 2000,
  },
  build: {
    minify: false,
    outDir: "dist/public",
  },
  plugins: [
    pluginAPIRoutes({
      minify: false,
      routeBase: "",
      configure: "./configure.js",
      dirs: [
        {
          dir: "/src/proxy",
          route: "proxy",
        },
      ],
    }),
  ],
});
