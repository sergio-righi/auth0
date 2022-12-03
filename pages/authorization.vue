<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="onSubmit">
      <gv-row>
        <gv-col>
          <gv-verification-code
            v-model="code"
            autofocus
            @ondone="verificationCallback"
          />
        </gv-col>
        <gv-col>
          <gv-button submit primary stretch :process="isProcessing">
            {{ $t("action.continue") }}
          </gv-button>
        </gv-col>
        <gv-col>
          <gv-flexbox justify="center">
            <span class="footnote">
              {{ $t("footnote.try_again") }}
              <gv-button inline @onclick="resendEmail">
                {{ $t("action.resend") }}
              </gv-button>
              {{ $t("linking_word.or") }}
              <gv-button inline @onclick="logout">
                {{ $t("action.sign_out") }}
              </gv-button>
            </span>
          </gv-flexbox>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Feedback } from "@/components";
import { eFeedback } from "@/utils/enum";

export default {
  name: "Authorization",
  components: {
    Feedback,
  },
  middleware: ["auth", "validate"],
  data() {
    return {
      code: null,
      isProcessing: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    callback() {
      return this.$store.getters.getCallback;
    },
  },
  methods: {
    async onSubmit() {
      this.isProcessing = true;
      try {
        const response = await this.$service.token.grant(
          this.user.id,
          this.code
        );
        if (response) {
          this.$service.auth.redirectToOrigin();
        } else {
          this.code = null;
          this.isProcessing = false;
          this.$service.auth.feedback(
            this.$t("message.authorization.not_match")
          );
        }
      } catch (err) {
        this.isProcessing = false;
        this.$service.auth.feedback(this.$t("message.feedback.error"));
      }
    },
    async resendEmail() {
      try {
        this.code = null;
        await this.$service.mail.verificationCode(
          this.user.name,
          this.user.email
        );
        this.$service.auth.feedback(
          this.$t("message.feedback.mail_sent"),
          eFeedback.success
        );
      } catch (err) {
        this.$service.auth.feedback(this.$t("message.authorization.not_found"));
      }
    },
    async logout() {
      await this.$service.auth.logout();
      this.$service.auth.redirectToOrigin();
    },
    verificationCallback(code) {
      this.code = code;
      this.onSubmit();
    },
  },
};
</script>
