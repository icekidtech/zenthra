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
      // Make env variables available to client
      "import.meta.env.VITE_PINATA_API_KEY": JSON.stringify(
        env.VITE_PINATA_API_KEY
      ),
      "import.meta.env.VITE_PINATA_API_SECRET": JSON.stringify(
        env.VITE_PINATA_API_SECRET
      ),
      "import.meta.env.VITE_PINATA_GATEWAY": JSON.stringify(
        env.VITE_PINATA_GATEWAY
      ),
      "import.meta.env.VITE_CONTRACT_ADDRESS": JSON.stringify(
        env.VITE_CONTRACT_ADDRESS
      ),
    },
  };
});
