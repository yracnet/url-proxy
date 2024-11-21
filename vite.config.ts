import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { pluginAPIRoutes } from "vite-plugin-api-routes";

// https://vite.dev/config/
export default defineConfig({
  appType: "mpa",
  server: {
    port: 2000,
  },
  build: {
    minify: false,
    outDir: "dist/public",
  },
  plugins: [
    react(),
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
