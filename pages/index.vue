<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="onSubmit">
      <gv-input
        v-model="email"
        v-validation.required.email
        :label="$t('label.email')"
        autofocus
      />
      <gv-flexbox>
        <gv-button submit primary stretch :process="isProcessing">
          {{ $t('action.sign_in') }}
        </gv-button>
        <gv-button
          @onclick="redirectToRegister"
          stretch
          :disabled="isProcessing"
        >
          {{ $t('action.sign_up') }}
        </gv-button>
      </gv-flexbox>
      <div class="horizontal-line">
        <span>{{ $t('linking_word.or') }}</span>
      </div>
      <gv-space y md>
        <Google :callback="callback" />
        <gv-space y sm />
        <GitHub :callback="callback" />
      </gv-space>
    </form>
  </div>
</template>

<script>
import { Feedback } from '@/components'
import { eFeedback } from '@/utils/enum'
import { Google, GitHub } from '@/components/social'

export default {
  name: 'SignIn',
  components: {
    Feedback,
    Google,
    GitHub,
  },
  middleware: ['not-auth', 'validate'],
  data() {
    return {
      email: null,
      isProcessing: false,
    }
  },
  computed: {
    callback() {
      return this.$store.getters.getCallback
    },
  },
  methods: {
    async onSubmit() {
      this.isProcessing = true
      try {
        const response = await this.$service.auth.find(this.email)
        if (response) {
          this.redirectToLogin()
        } else {
          this.isProcessing = false
          this.$service.auth.feedback(
            this.$t('message.login.not_exist'),
            eFeedback.warning
          )
        }
      } catch (err) {
        this.isProcessing = false
        this.$service.auth.feedback(
          this.$t(
            /401/.test(err)
              ? 'message.feedback.not_exist'
              : 'message.feedback.error'
          )
        )
      }
    },
    redirectToRegister() {
      this.$router.push(this.$resolve.register(this.callback))
    },
    redirectToLogin() {
      this.$router.push(this.$resolve.login(this.email, this.callback))
    },
  },
}
</script>
