<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="onSubmit">
      <gv-input :value="email" readonly :label="$t('label.email')">
        <template #trailing>
          <gv-button @onclick="redirectToHome" sm>
            <gv-icon value="swap-horizontal" size="24px" />
          </gv-button>
        </template>
      </gv-input>
      <gv-input
        v-model="password"
        v-validation.required
        :label="$t('label.password')"
        type="password"
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
      <gv-space y sm>
        <gv-flexbox justify="center">
          <gv-button class="footnote" @onclick="onReset" inline>
            {{ $t('page.login.forget_password') }}
          </gv-button>
        </gv-flexbox>
      </gv-space>
    </form>
  </div>
</template>

<script>
import { Feedback } from '@/components'
import { eFeedback } from '@/utils/enum'

export default {
  name: 'SignIn',
  components: {
    Feedback,
  },
  middleware: ['not-auth', 'validate'],
  data() {
    return {
      password: null,
      isProcessing: false,
    }
  },
  computed: {
    email() {
      return this.$route.query.email
    },
    callback() {
      return this.$store.getters.getCallback
    },
  },
  methods: {
    async onSubmit() {
      this.isProcessing = true
      try {
        const response = await this.$service.auth.login(
          this.email,
          this.password
        )
        if (response) {
          if (response.verified) {
            window.location.href = this.$store.getters.getCallback
            this.$service.auth.callback(null)
          } else {
            this.redirectToAuthorization()
          }
        } else {
          this.isProcessing = false
          this.$service.auth.feedback(this.$t('message.login.wrong_password'))
        }
      } catch (err) {
        this.isProcessing = false
        this.$service.auth.feedback(this.$t('message.feedback.error'))
      }
    },
    async onReset() {
      try {
        await this.$service.mail.forgetPassword(this.email)
        this.$service.auth.feedback(
          this.$t('message.feedback.mail_sent'),
          eFeedback.success
        )
      } catch (err) {
        this.$service.auth.feedback(this.$t('message.feedback.error'))
      }
    },
    redirectToHome() {
      this.$router.push(this.$resolve.home(this.callback))
    },
    redirectToRegister() {
      this.$router.push(this.$resolve.register(this.callback))
    },
    redirectToPassword() {
      this.$router.push(this.$resolve.password(this.callback))
    },
    redirectToAuthorization() {
      this.$router.push(this.$resolve.authorization(this.callback))
    },
  },
}
</script>
