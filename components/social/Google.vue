<template>
  <gv-button
    :href="`${api}auth/google?callback=${callback}`"
    bg="red-600"
    color="white"
    stretch
  >
    <gv-icon value="google" /> {{ $t("auth.google") }}
  </gv-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Google extends Vue {
  @Prop({ type: String }) callback!: string;

  get api() {
    return this.$config.api;
  }
}
</script>
