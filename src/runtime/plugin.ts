import newrelic from 'newrelic'
import type { H3Event } from 'h3'
import type { NitroAppPlugin } from 'nitropack'
import type { newrelicModuleOptions } from './types'
import { useRuntimeConfig } from '#imports'
import type { NuxtError } from '#app'

// @todo: Stubbing defineNitroPlugin. Maybe this could be solved differently?
export function defineNitroPlugin(def: NitroAppPlugin) {
  return def
}

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig().newrelic as newrelicModuleOptions
  nitroApp.hooks.hook('request', (event: H3Event) => {
    // Name the transaction to the value the request's path
    newrelic.setTransactionName(event.path)
  })
  nitroApp.hooks.hook('error', (error: Error) => {
    // Check if we have a nuxt error that should be ignored
    if (isNuxtError(error)) {
      const nuxtError: NuxtError = error
      const cause = nuxtError?.cause
      if (typeof cause === 'object' && cause !== null && 'statusCode' in cause) {
        const statusCode = cause.statusCode
        const errorClass = Number(String(statusCode)[0])
        if (!runtimeConfig.errorClasses.includes(errorClass)) {
          return
        }
      }
    }
    // Send error to newrelic agent
    newrelic.noticeError(error)
  })
})

// @todo: Stubbing isNuxtError, since somehow this can't be imported.
const isNuxtError = <DataT = unknown>(
  error?: string | object,
): error is NuxtError<DataT> => !!error && typeof error === 'object' && '__nuxt_error' in error
