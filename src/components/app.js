// @flow

import React from 'react'
import { observer } from 'mobx-react'
import * as bib from '../util/bible'
import DebugVerseListPane from './debug-verse-list-pane'
import EditVerseListPane from './edit-verse-list-pane'
import VersesPane from './verses-pane'

window.bib = bib

const ref = ({book, chapter, verse}) =>
  `${book && (book[0].toUpperCase() + book.substr(1)) || ''}${book ? ' ' : ''}${chapter || ''}${verse ? ':' : ''}${verse || ''}`

const App = ({ verseList }) => (
  <div style={styles.wrapper}>
    <EditVerseListPane />
    <DebugVerseListPane />
    <VersesPane />
  </div>
)

const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    background: '#ccc',
    margin: -1,
  },
}

export default observer(['verseList'])(App)
