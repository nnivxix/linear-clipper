<script setup lang="ts">
import { ref } from "vue";
import { browser } from "wxt/browser";
import { useClipboard } from "@vueuse/core";
import { type StatusMessage } from "@/constants/status";
import { handleClipboardCopy } from "@/utils/clipboardHandler";

const tab = await browser.tabs.query({ active: true, currentWindow: true });
const source = tab.at(0)?.url;
const { copy, isSupported } = useClipboard({
  source,
});
const { status: newStatus } = await handleClipboardCopy({
  source,
  copy,
  isSupported: isSupported.value,
});
const status = ref<StatusMessage>(newStatus);
</script>
<template>
  <h1 :class="status.class">{{ status.message }}</h1>
</template>
