<template>
  <gv-button
    :href="`${api}auth/github?callback=${callback}`"
    bg="black"
    color="white"
    stretch
  >
    <gv-icon value="github" /> {{ $t('auth.github') }}
  </gv-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GitHub extends Vue {
  @Prop({ type: String }) callback!: string

  get api() {
    return this.$config.api
  }
}
</script>
