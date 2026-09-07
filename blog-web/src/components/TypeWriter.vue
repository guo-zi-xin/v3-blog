<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    words: string[];
    typeSpeed?: number;
  }>(),
  { typeSpeed: 90 },
);

const text = ref('');
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let timer: ReturnType<typeof setTimeout> | undefined;

function typeNext() {
  const word = props.words[wordIndex] ?? '';

  if (!deleting) {
    charIndex += 1;
    text.value = word.slice(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      timer = setTimeout(typeNext, 1600);
      return;
    }
    timer = setTimeout(typeNext, props.typeSpeed);
    return;
  }

  charIndex -= 1;
  text.value = word.slice(0, charIndex);
  if (charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % props.words.length;
  }
  timer = setTimeout(typeNext, deleting ? 45 : 300);
}

onMounted(() => {
  typeNext();
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <span class="typewriter">{{ text }}<i class="cursor">|</i></span>
</template>

<style scoped>
.typewriter {
  color: #eef2ff;
}

.cursor {
  font-style: normal;
  color: #ffd76a;
  animation: blink 0.9s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
