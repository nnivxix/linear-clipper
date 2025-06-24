<script setup lang="ts">
import { onMounted } from "vue";
import { browser } from "wxt/browser";
const tab = await browser.tabs.query({ active: true, currentWindow: true });

const url = tab.at(0)?.url;
console.log("Current tab URL:", url);

onMounted(async () => {
  // This is a placeholder for the Status component.
  // It can be used to display status messages or indicators.
  console.log("Status component mounted");
});
</script>
<template>
  <div>Copied</div>
</template>
