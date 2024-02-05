import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      "/meeting-room-ics": {
        target: "https://meetings.cesnet.cz/",
        changeOrigin: true,
      },
    },
  },
});
