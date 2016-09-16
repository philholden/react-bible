// @flow

import React from 'react'
import { observer } from 'mobx-react'
import * as bib from '../util/bible'
import DebugVerseListPane from './debug-verse-list-pane'
//import EditVerseListPane from './edit-verse-list-pane'
//import VersesPane from './verses-pane'
//import VersePaneDom from './verse-pane-dom'
//import RangePane from './range-pane'
//import QueryBar from './query-bar'

import BibleVerseListPane from './bible-verse-list-pane'
import BibleSearchPane from './bible-search-pane'

window.bib = bib

function App () {
  return (
    <div style={styles.wrapper}>
      <div style={styles.col}>
        {/* <div style={styles.row1}>
          <QueryBar />
        </div> */}
        <div style={styles.row2}>
          <BibleVerseListPane />
          {/* <EditVerseListPane />
          <div style={styles.colWrapper}>
            <RangePane
              versionName="kjv"
              rangesText={verseList.rangeListText}
            />
          </div> */}
          {/* <DebugVerseListPane /> */}
          <div style={styles.colWrapper}>
            <BibleSearchPane />
            {/* <VersePaneDom
              versionName="kjv"
              filterText={verseList.filterText}
              rangesText={verseList.rangesText}
              fullWords={verseList.fullWords}
              caseSensitive={verseList.caseSensitive}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}


const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
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
  colWrapper: {
//    paddingLeft: 20,
//    paddingRight: 20,
    overflow: 'auto',
    flex: 1,
    background: 'white',
  },
}

export default App
