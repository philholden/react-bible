// @flow

import React from 'react'
import { observer } from 'mobx-react'
import * as bib from '../util/bible'
import DebugVerseListPane from './debug-verse-list-pane'
import EditVerseListPane from './edit-verse-list-pane'
import VersesPane from './verses-pane'
import VersePaneDom from './verse-pane-dom'
import QueryBar from './query-bar'

window.bib = bib

const App = ({ verseList }) => (
  <div style={styles.wrapper}>
    <div style={styles.col}>
      <div style={styles.row1}>
        <QueryBar />
      </div>
      <div style={styles.row2}>
        <EditVerseListPane />
        <DebugVerseListPane />
        <VersePaneDom
          versionName="kjv"
          hashList={verseList.hashList}
          filterText={verseList.filterText}
          fullWords={verseList.fullWords}
          caseSensitive={verseList.caseSensitive}
        />
      </div>
    </div>
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
  row1: {
    display: 'flex',
    background: 'white',
  },
  row2: {
    display: 'flex',
    flex: 1,
  },
  col: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backround: 'blue',
  },
}

export default observer(['verseList'])(App)
