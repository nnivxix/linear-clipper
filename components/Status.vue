<script setup lang="ts">
import { ref } from "vue";
import { browser } from "wxt/browser";
import { useClipboard } from "@vueuse/core";
import { type StatusMessage } from "@/constants/status";
import { handleClipboardCopy } from "@/utils/clipboardHandler";

const tab = await browser.tabs.query({ active: true, currentWindow: true });
const source = tab.at(0)?.url;
const title = tab.at(0)?.title;
const { copy, isSupported } = useClipboard({
  source,
});
const { status: newStatus } = await handleClipboardCopy({
  source,
  title,
  copy,
  isSupported: isSupported.value,
});
const status = ref<StatusMessage>(newStatus);
</script>
<template>
  <div class="wrapper-info">
    <h1 :class="status.class">{{ status.message }}</h1>
  </div>
</template>

<style scoped>
.wrapper-info {
  width: 200px;
}
</style>
