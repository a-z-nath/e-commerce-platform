import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 8000, // front end will run in this port
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true, // if default port changes then true
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
