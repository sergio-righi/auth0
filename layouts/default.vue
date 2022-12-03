<template>
  <div id="login">
    <div class="login-container">
      <div class="login-header">
        <gv-image class="brand" src="/lazy-company-logo.svg" />
      </div>
      <Nuxt />
      <div class="login-footer">
        <div class="message">
          {{ $t('footnote.login') }}
          <gv-link href="#" muted>{{
            $t('agreement.terms_of_service')
          }}</gv-link
          >,
          <gv-link href="#" muted>{{ $t('agreement.privacy_policy') }}</gv-link>
          {{ $t('linking_word.and') }}
          <gv-link href="#" muted>{{ $t('agreement.cookie_policy') }}</gv-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const callback =
      this.$route.query.callback || this.$store.getters.getCallback
    this.$service.auth.callback(callback ?? null)
  },
  watch: {
    $route: {
      handler: function () {
        this.$service.auth.feedback(null)
      },
    },
  },
}
</script>
