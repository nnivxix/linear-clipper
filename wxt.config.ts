import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "LinearClipper",
    version: "0.4",
    description: "Copy Issue Links from Linear to Clipboard",
    permissions: ["tabs", "activeTab", "clipboardWrite"],
    browser_specific_settings: {
      gecko: {
        id: "{b4510bfd-f252-4447-b922-52ec94f7a4f6}",
        strict_min_version: "109.0",
      },
    },
  },
});
