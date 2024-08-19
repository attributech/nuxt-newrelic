import { defineNuxtModule, createResolver, addServerPlugin } from '@nuxt/kit'
import { defu } from 'defu'
import type { newrelicModuleOptions } from './runtime/types'

export const defaultOptions: newrelicModuleOptions = {
  errorClasses: [5],
}

export default defineNuxtModule<newrelicModuleOptions>({
  meta: {
    name: 'nuxt-newrelic',
    configKey: 'newrelic',
  },
  defaults: defaultOptions,
  setup(passedOptions, nuxt) {
    const options = defu(
      {},
      passedOptions,
      defaultOptions,
    ) as newrelicModuleOptions
    nuxt.options.runtimeConfig.newrelic = options
    const resolver = createResolver(import.meta.url)
    addServerPlugin(resolver.resolve('./runtime/plugin'))
  },
})
