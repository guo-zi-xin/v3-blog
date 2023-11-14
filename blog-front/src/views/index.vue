<script setup lang="ts">
import { shallowRef } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

let componentId = shallowRef(null);

componentId.value = First;
</script>

<template>
  <div>
    Nav
  </div>
</template>

<style lang="scss" scoped></style>