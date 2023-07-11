import { init, register } from 'svelte-i18n'

const defaultLocale = 'en'

register('en', () => import('./locales/en.json'))
register('ru', () => import('./locales/ru.json'))

init({
	fallbackLocale: defaultLocale,
})
