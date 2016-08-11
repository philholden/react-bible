import { jsdom } from 'jsdom'

function noop() {
  return null
}

require.extensions['.css'] = noop
require.extensions['.png'] = noop

global.document = jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator
