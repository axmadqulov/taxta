import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages uchun: base ni repo nomiga o'zgartiring, masalan "/taxta/"
export default defineConfig({
  plugins: [react()],
  base: "./",
});
