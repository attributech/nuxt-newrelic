<template>
  <div>
    <h1>Error</h1>
  </div>
</template>

<script setup lang="ts">
throw createError({
  statusCode: 500,
  statusMessage: 'Internal server error.',
})
</script>
