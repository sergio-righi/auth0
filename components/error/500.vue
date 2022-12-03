<template>
  <div class="error-container" :class="bg">
    <div class="error-content">
      <div class="error-code">500</div>
      <div class="error-message">
        {{ $t('page.error.500') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error500',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
    bg: {
      type: String,
      required: true,
    },
  },
}
</script>
