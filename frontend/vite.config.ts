import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Expose env variables to client-side code
      "process.env.VITE_WALLETCONNECT_PROJECT_ID": JSON.stringify(
        env.VITE_WALLETCONNECT_PROJECT_ID
      ),
    },
  };
});
