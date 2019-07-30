import dotenv from 'dotenv/config'
import autoprefixer from 'autoprefixer'

export default {
  server: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0'
  },
  srcDir: 'src/',
  env: {
    version: process.env.npm_package_version,
    baseUrl: process.env.BASE_URL || 'http://localhost:8000',
    isDevelopment: process.env.development || false
  },
  head: {
    title: this.pageTitle || 'Page title',
    titleTemplate: '%s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'theme-color', name: 'theme-color', content: '#FF015B' },
      { hid: 'description', name: 'description', content: 'Page description' },
      { hid: 'keywords', name: 'keywords', content: 'Comma,separated,keywords' }
    ],
    link: []
  },
  plugins: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'cookie-universal-nuxt',
    [
      'nuxt-validate',
      {
        lang: 'en'
      }
    ]
  ],
  axios: {
    baseURL: ''
  },
  router: {
  },
  build: {
    // analyze: true,
    extractCSS: true,
    postcss: {
      preset: {
        autoprefixer
      }
    },
    extend(config, { isDev, isClient }) {
      if (isDev) {
        config.output.globalObject = 'this'
        if (isClient) config.devtool = '#source-map'
      }
    }
  }
}
