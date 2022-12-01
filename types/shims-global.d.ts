import { Store } from 'vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $t: any
    $tc: any
    $i18n: any
    $resolve: any
    $service: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $router: any
    $resolve: any
    $service: any
  }

  interface Context {
    i18n: any
    $resolve: any
    $service: any
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}