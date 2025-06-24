<script setup lang="ts">
import { onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import { useClipboard } from "@vueuse/core";
import { createIssue } from "@/utils/createIssue";
import { STATUS_MESSAGES, type StatusMessage } from "@/constants/status";

const tab = await browser.tabs.query({ active: true, currentWindow: true });
const source = tab.at(0)?.url;

const status = ref<StatusMessage>(STATUS_MESSAGES.COPYING);

const { copy, isSupported } = useClipboard({
  source,
});

onMounted(async () => {
  if (!source?.includes("linear.app")) {
    status.value = STATUS_MESSAGES.NOT_LINEAR;
    return;
  }

  const { markedText } = createIssue(source);

  if (isSupported.value) {
    try {
      await copy(markedText);
      status.value = STATUS_MESSAGES.SUCCESS;
    } catch (error) {
      status.value = STATUS_MESSAGES.COPY_FAILED;
      console.error("Copy error:", error);
    }
  } else {
    status.value = STATUS_MESSAGES.CLIPBOARD_NOT_SUPPORTED;
  }
});
</script>
<template>
  <h1 :class="status.class">{{ status.message }}</h1>
</template>
