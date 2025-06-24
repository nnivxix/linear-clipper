import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "LinearClipper",
    version: "0.4",
    description: "Copy Issue Links from Linear to Clipboard",
    permissions: ["tabs", "activeTab", "clipboardWrite"],
  },
});
