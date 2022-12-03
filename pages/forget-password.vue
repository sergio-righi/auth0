<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="onSubmit">
      <gv-row>
        <gv-col>
          <Password v-model="password" required @onerror="passwordValidation" />
        </gv-col>
        <gv-col>
          {{ $t("footnote.password") }}
          <gv-list>
            <li v-for="item in passwordPolicy" :key="item.id">{{ item }}</li>
          </gv-list>
        </gv-col>
        <gv-col>
          <gv-button
            submit
            primary
            stretch
            :disabled="hasError"
            :process="isProcessing"
          >
            {{ $t("action.send") }}
          </gv-button>
        </gv-col>
        <gv-col>
          <gv-flexbox justify="center">
            <span class="footnote">
              {{ $t("page.forget_password.remember_it") }}
              <gv-button @onclick="redirectToHome" inline>
                {{ $t("action.sign_in") }}
              </gv-button>
            </span>
          </gv-flexbox>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Email, Feedback, Password } from "@/components";

export default {
  name: "ForgotPassword",
  components: {
    Email,
    Feedback,
    Password,
  },
  middleware: ["not-auth", "validate"],
  data() {
    return {
      email: null,
      password: null,
      isProcessing: false,
      invalidPassword: false,
    };
  },
  async fetch() {
    const { error, query, $service } = this.$nuxt.context;
    try {
      if ("token" in query) {
        const token = await $service.token.findByToken(query.token);
        if (!token) {
          return this.redirectToLogin();
        }
      } else return this.redirectToHome();
    } catch {
      error({
        statusCode: 503,
      });
    }
  },
  computed: {
    hasError() {
      return this.invalidPassword;
    },
    passwordPolicy() {
      return Object.values(this.$t("password_policy"));
    },
    token() {
      return this.$route.query.token;
    },
    callback() {
      return this.$store.getters.getCallback;
    },
  },
  methods: {
    async onSubmit() {
      this.isProcessing = true;
      try {
        if (this.hasError) return;
        const response = await this.$service.token.reset(
          this.token,
          this.password
        );

        if (response) {
          this.$service.auth.redirectToOrigin();
        } else {
          this.isProcessing = false;
          this.$service.auth.feedback(
            this.$t("message.forget_password.expired")
          );
        }
      } catch (err) {
        this.isProcessing = false;
        this.$service.auth.feedback(this.$t("message.feedback.error"));
      }
    },
    passwordValidation(error) {
      this.invalidPassword = error;
    },
    redirectToHome() {
      this.$router.push(this.$resolve.home(this.callback));
    },
    redirectToLogin() {
      this.$router.push(this.$resolve.home(this.callback));
    },
  },
};
</script>
