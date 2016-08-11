import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import App from './components/app'
import { AppContainer } from 'react-hot-loader'
import VerseListModel from './models/verse-list-model'
import { Provider } from 'mobx-react'
import 'react-virtualized/styles.css'

const verseList = new VerseListModel()
console.log(verseList)

function rerender(App2) {
  render(
    <AppContainer>
      <Provider verseList={verseList}>
        <App2 />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./components/app', () => {
//    const App2 = require('./components/app').default
    System.import('./components/app').then(({ default: App2 }) => {
      unmountComponentAtNode(document.getElementById('root'))
      rerender(App2)
    })
  })
}

rerender(App)
