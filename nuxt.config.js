import { i18n } from "./utils";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  publicRuntimeConfig: {
    api: process.env.API_URL,
    apiKey: process.env.API_KEY,
    vuexKey: process.env.VUEX_KEY,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "The Lazy Company - Single Sign-On",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/default.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/service.client",
    "~/plugins/vuex.client",
    "~/plugins/axios.client",
    "~/plugins/resolve.client",
    "~/plugins/grater-vue.client",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "nuxt-i18n",
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    progress: false,
    baseUrl: process.env.API_URL,
  },

  i18n: {
    seo: true,
    lazy: true,
    langDir: "~/locales/",
    parsePages: false,
    vueI18nLoader: true,
    locales: [
      { code: "en-CA", iso: "en-CA", name: "English", file: "en-CA.json" },
    ],
    vueI18n: i18n,
    defaultLocale: "en-CA",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
