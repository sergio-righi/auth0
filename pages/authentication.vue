<template>
  <div class="login-content">
    <gv-flexbox flex align="center" justify="center">
      <gv-progress-circle
        v-if="isProcessing"
        color="primary"
        indeterminate
        size="40"
        width="3"
      />
      <gv-space x lg left>
        <span class="a-center">{{ message }}</span>
      </gv-space>
    </gv-flexbox>
  </div>
</template>

<script>
export default {
  middleware: ['not-auth'],
  data() {
    return {
      isProcessing: true,
      message: this.$t('message.authentication.ongoing'),
    }
  },
  async created() {
    try {
      const { query } = this.$route
      const callback = query.callback || this.$store.getters.getCallback
      const response = await this.$service.auth.refresh()
      if (response) {
        if (callback) {
          this.$service.auth.callback(null)
          window.location.href = callback
        } else {
          this.isProcessing = false
          this.message = this.$t('message.authentication.no_callback')
        }
      } else {
        this.isProcessing = false
        this.message = this.$t('message.authentication.not_finished')
      }
    } catch (err) {
      this.isProcessing = false
      this.message = this.$t('message.authentication.error')
    }
  },
}
</script>
