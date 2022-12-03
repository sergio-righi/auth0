<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="onSubmit">
      <gv-row>
        <gv-col>
          <gv-input
            v-model="user.name"
            v-validation.required
            :label="$t('label.name')"
            autofocus
          />
        </gv-col>
        <gv-col>
          <Email v-model="user.email" required />
        </gv-col>
        <gv-col>
          <Password
            v-model="user.password"
            required
            @onerror="passwordValidation"
          />
        </gv-col>
        <gv-col>
          <gv-button submit primary stretch :disabled="hasError" :process="isProcessing">
            {{ $t('action.sign_up') }}
          </gv-button>
        </gv-col>
        <gv-col class="justify-content-center">
          <gv-space y md bottom>
            <gv-flexbox align="center" justify="space-evenly">
              <span class="footnote">
                {{ $t('page.register.has_account') }}
                <gv-button @onclick="redirectToHome" inline>
                  {{ $t('action.sign_in') }}
                </gv-button>
              </span>
            </gv-flexbox>
          </gv-space>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Email, Feedback, Password } from '@/components'

export default {
  name: 'onSubmit',
  components: {
    Email,
    Feedback,
    Password,
  },
  middleware: ['not-auth', 'validate'],
  data() {
    return {
      user: {
        verified: false,
      },
      isProcessing: false,
      invalidPassword: false,
    }
  },
  computed: {
    hasError() {
      return this.invalidPassword
    },
    callback() {
      return this.$store.getters.getCallback
    },
  },
  methods: {
    async onSubmit() {
      if (this.hasError) return
      try {
        this.isProcessing = true
        const response = await this.$service.auth.register(this.user)
        if (response) {
          this.$service.token.insertWithCode(response._id)
          this.$service.mail.verificationCode(response.name, response.email)
          this.redirectToAuthorization()
        } else {
          this.redirectToLogin(this.user.email)
        }
      } catch (err) {
        this.isProcessing = false
        this.$service.auth.feedback(this.$t('message.feedback.error'))
      }
    },
    passwordValidation(error) {
      this.invalidPassword = error
    },
    redirectToHome() {
      this.$router.push(this.$resolve.home(this.callback))
    },
    redirectToLogin(email) {
      this.$router.push(this.$resolve.login(email, this.callback))
    },
    redirectToAuthorization() {
      this.$router.push(this.$resolve.authorization(this.callback))
    },
  },
}
</script>
