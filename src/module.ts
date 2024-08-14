import { defineNuxtModule, createResolver, addServerPlugin } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-newrelic',
    configKey: 'newrelic',
  },
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    addServerPlugin(resolver.resolve('./runtime/plugin'))
  },
})
