export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('vuetify:before-create', options => {
    if (import.meta.client) {
      console.log('vuetify:before-create', options)
    }
  })
})
