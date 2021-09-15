import locales from './locale.json'
import { get } from 'lodash'

function templated(template, params) {
  const regexes = Object.keys(params).map((key) => [
    new RegExp(`{\\s*${key}\\s*}`, 'g'),
    params[key],
  ])
  let output = template
  for (const [regex, value] of regexes) output = output.replace(regex, value)
  return output
}

function counted(template, count) {
  const [none, singlur, plural] = template.split('|').map((s) => s.trim())

  const params = { count, n: count }
  if (count === 0) return templated(none, params)
  if (count === 1) return templated(singlur, params)
  return templated(plural, { count, n: count })
}

export class I18n {
  locale = 'en'

  t(key, params) {
    const match = get(locales, key)
    if (match) return params ? templated(match, params) : match

    const extra = params ? `, ${JSON.stringify(params)}` : ''
    return `{{ ${key}${extra} }}`
  }

  tc(key, count) {
    const match = get(locales, key)
    if (match) return counted(match, count)

    return `{{ "${key}" count=${count} }}`
  }
}
