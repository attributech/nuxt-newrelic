import newrelic from 'newrelic'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    newrelic.setTransactionName(event.path)
  })
  nitroApp.hooks.hook('error', (error, context) => {
    newrelic.noticeError(error)
  })
})
