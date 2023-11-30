<script setup lang="ts">
  import { zhCN, dateZhCN, darkTheme } from "naive-ui";
  import { storeToRefs } from "pinia";
  import WindowDialog from "./WindowDialog";
  import WindowLoadingBar from "./WindowLoadingBar";
  import WindowMessage from "./WindowMessage";
  import WindowNotification from "./WindowNotification";
  import { useThemeStore } from '@/store/modules/theme'

  const { themeChange  } = storeToRefs(useThemeStore());

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="themeChange? darkTheme: null" wh-full>
    <n-dialog-provider>
      <window-dialog />
      <n-notification-provider>
        <window-notification />
        <n-message-provider>
          <window-message />
          <n-loading-bar-provider>
            <window-loading-bar />
            <slot name="default" />
          </n-loading-bar-provider>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped></style>
