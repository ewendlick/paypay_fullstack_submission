<template>
  <div>
    <h1>{{ error.statusCode }} Error</h1>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped></style>
