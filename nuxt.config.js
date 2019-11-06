export default {
  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://tcdigital.azurewebsites.net'
  // },

  // server: {
  //   port: 80, // default: 3000
  //   host: '0.0.0.0', // default: localhost
  // },

  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/reset.css', '~assets/main.css', '~assets/misc.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  // modules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources', '@nuxtjs/google-tag-manager'],
  modules: [
    ['@nuxtjs/style-resources'],
    ['@nuxtjs/google-tag-manager', {
      id: 'GTM-TR6RF8C'
    }],
  ],

  styleResources: {
    scss: ['~assets/scss/vars/*.scss']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if(!ctx.isDev){
        config.output.publicPath = './_nuxt/'
      }
    }
  }
}
