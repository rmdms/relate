import Project from './project.js';

const env = process.env.NODE_ENV;
const fullURL = (Project.env[env].portURL) ? `${Project.env[env].siteURL}:${Project.env[env].portURL}${Project.env[env].baseURL}` : `${Project.env[env].siteURL}${Project.env[env].baseURL}`;

export default {
  // HEAD
  head: {
    // HTML
    htmlAttrs: { lang: Project.head.lang },
    // TITLE
    title: Project.head.title,
    // META
    meta: [
      // BASE
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      // SEO
      { hid: 'description', name: 'description', content: Project.head.description },
      { rel: 'canonical', href: fullURL },
      { name: 'keywords', content: Project.head.keywords },
      // OPEN GRAPH
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: Project.head.title },
      { name: 'og:description', content: Project.head.description },
      { name: 'og:image', content: `${fullURL}${Project.head.imageURL}` },
      { name: 'og:url', content: fullURL },
      { name: 'og:site_name”', content: Project.head.title },
      // TWITTER CARD
      { name: 'twitter:title', content: Project.head.title },
      { name: 'twitter:description', content: Project.head.description },
      { name: 'twitter:image', content: `${fullURL}${Project.head.imageURL}` },
      { name: 'twitter:site', content: Project.head.twitterAccount },
      { name: 'twitter:creator', content: Project.head.twitterAccount }
    ],
    // LINK
    link: [
      // FAVICON
      { rel: 'icon', type: 'image/x-icon', href: `${fullURL}${Project.head.faviconURL}` }
    ]
  },
  // PLUGINS
  plugins: [
    { src: '~/plugins/api.js' },
    { src: '~/plugins/loader.js' },
    { src: '~/plugins/gsap.js' }
  ],
  // LOADING
  loading: '~/components/templates/loading.vue',
  // COMPONENTS
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/atoms',
        prefix: 'a',
        extensions: ['vue'],
      },
      {
        path: '~/components/molecules',
        prefix: 'm',
        extensions: ['vue'],
      },
      {
        path: '~/components/organisms',
        prefix: 'o',
        extensions: ['vue'],
      },
      {
        path: '~/components/templates',
        prefix: 't',
        extensions: ['vue'],
      }
    ]
  },
  // MODULES
  modules: [
    '@nuxtjs/style-resources'
  ],
  // STYLES
  css: ['~/assets/styles/index.css'],
  // styleResources: {
  //     scss: [
  //       '@/assets/styles/index.scss'
  //     ]
  // },
  // BUILD MODULES
  buildModules: [],
  // ENVIRONNMENT
  env: {
    fullURL: fullURL,
    apiURL: Project.env[env].apiURL
  },
  // SERVER
  server: {
    host: '0.0.0.0',
    port: Project.env[env].portURL
  },
  // ROUTER
  router: {
    base: Project.env[env].baseURL
  },
  // GENERATE
  generate: {
    routes: [],
    fallback: '404.html'
  },
  // BUILD
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
