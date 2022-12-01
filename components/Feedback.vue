<template>
  <gv-alert
    v-if="message"
    v-bind="{ dismissible: dismissible }"
    style="margin-bottom: 16px"
  >
    <gv-alert-item v-bind="status">
      <template #content>
        {{ message }}
      </template>
    </gv-alert-item>
  </gv-alert>
</template>

<script lang="ts">
import { eFeedback } from '@/utils/enum'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Feedback extends Vue {
  @Prop({ default: false }) dismissible!: boolean

  get status() {
    const status = this.$store.getters.getFeedback?.status
    return {
      error: eFeedback.error === status,
      success: eFeedback.success === status,
      warning: eFeedback.warning === status,
    }
  }

  get message() {
    return this.$store.getters.getFeedback?.message
  }
}
</script>
