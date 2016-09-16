// @flow

import { uncompress } from './util/compress-bible'

export const getGreeting = () => fetch('/greeting')
  .then(res => {
    if (res.status >= 400) {
      throw new Error('Bad res from server')
    }
    return res.json()
  })

export const getVersion = (name: string) => fetch(`/version/${name}.flat`)
  .then(res => {
    if (res.status >= 400) {
      throw new Error('Bad res from server')
    }
    return res.text()
  }).then(text => uncompress(text))
