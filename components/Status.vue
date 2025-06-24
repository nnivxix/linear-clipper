<script setup lang="ts">
import { onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import { useClipboard } from "@vueuse/core";

const tab = await browser.tabs.query({ active: true, currentWindow: true });
const source = tab.at(0)?.url;

const status = ref("");

const { copy, isSupported } = useClipboard({
  source,
});

onMounted(async () => {
  if (!source?.includes("linear.app")) {
    status.value = "This extension only works on linear.app";
    return;
  }
  const urlParts = source.split("/");
  const issueId = urlParts[5];
  const markedText = `[${issueId}](${source})`;

  if (isSupported.value) {
    try {
      await copy(markedText);
      status.value = "Text copied to clipboard!";
    } catch (error) {
      status.value = "Failed to copy text.";
      console.error("Copy error:", error);
    }
  } else {
    status.value = "Clipboard API not supported.";
  }
});
</script>
<template>
  <h1>{{ status }}</h1>
</template>
