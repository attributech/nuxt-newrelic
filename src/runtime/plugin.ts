import newrelic from 'newrelic'
import type { H3Event } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event: H3Event) => {
    newrelic.setTransactionName(event.path)
  })
  nitroApp.hooks.hook('error', (error: Error) => {
    newrelic.noticeError(error)
  })
})
