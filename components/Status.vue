<script setup lang="ts">
import { onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import { useClipboard } from "@vueuse/core";
import { STATUS_MESSAGES, type StatusMessage } from "@/constants/status";
import { handleClipboardCopy } from "@/utils/clipboardHandler";

const tab = await browser.tabs.query({ active: true, currentWindow: true });
const source = tab.at(0)?.url;
const status = ref<StatusMessage>(STATUS_MESSAGES.COPYING);
const { copy, isSupported } = useClipboard({
  source,
});
const { status: newStatus } = await handleClipboardCopy({
  source,
  copy,
  isSupported: isSupported.value,
});

status.value = newStatus;

// onMounted(async () => {
// });
</script>
<template>
  <h1 :class="status.class">{{ status.message }}</h1>
</template>
