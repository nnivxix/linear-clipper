<script setup lang="ts">
import { onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import { useClipboard } from "@vueuse/core";

const tab = await browser.tabs.query({ active: true, currentWindow: true });
const source = tab.at(0)?.url;

const status = ref({
  message: "Copying text...",
  class: "",
});

const { copy, isSupported } = useClipboard({
  source,
});

onMounted(async () => {
  if (!source?.includes("linear.app")) {
    status.value = {
      message: "This extension only works with Linear issues.",
      class: "error",
    };
    return;
  }

  const urlParts = source?.split("/");
  const issueId = urlParts?.[urlParts.length - 1] || "unknown-issue";
  const markedText = `[${issueId}](${source})`;

  if (isSupported.value) {
    try {
      await copy(markedText);
      status.value = {
        message: "Text copied to clipboard!",
        class: "success",
      };
    } catch (error) {
      status.value = {
        message: "Failed to copy text.",
        class: "error",
      };
      console.error("Copy error:", error);
    }
  } else {
    status.value = {
      message: "Clipboard API is not supported in this browser.",
      class: "error",
    };
  }
});
</script>
<template>
  <h1 :class="status.class">{{ status.message }}</h1>
</template>
