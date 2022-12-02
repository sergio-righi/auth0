<template>
  <div class="login-content">
    <gv-flexbox flex align="center" justify="center">
      <gv-progress-circle
        v-if="processing"
        color="primary"
        indeterminate
        size="40"
        width="3"
      />
      <gv-space x lg left>
        <span>{{ message }}</span>
      </gv-space>
    </gv-flexbox>
  </div>
</template>

<script>
export default {
  middleware: ["auth", "validate"],
  data() {
    return {
      processing: true,
      message: this.$t("message.logout.ongoing"),
    };
  },
  async created() {
    try {
      const { query } = this.$route;
      const callback = query.callback || this.$store.getters.getCallback;
      await this.$service.auth.logout();
      if (callback) {
        this.$service.auth.redirectToOrigin();
      } else {
        this.processing = false;
        this.message = this.$t("message.logout.no_callback");
      }
    } catch (err) {
      this.processing = false;
      this.message = this.$t("message.logout.error");
    }
  },
};
</script>
