<template>
  <div>
    <h1>Slow</h1>
    <div>{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

const { data } = await useAsyncData(
  'test',
  async () => {
    await sleep(1000)
    return {}
  },
)
</script>
