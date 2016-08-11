// @flow

import React from 'react'
import { observer } from 'mobx-react'
import VerseRange from './verse-range'

const VersesPane = ({ verseList }) => (
  <div style={styles.wrapper}>
    {verseList.verseRanges.map(({ start, end }, i) => (
      <VerseRange
        key={i}
        startIndex={start.index}
        endIndex={end.index}
      />
    ))}
  </div>
)

const styles = {
  wrapper: {
    flex: 1,
    fontFamily: 'sans-serif',
    fontSize: 16,
    padding: 10,
    background: '#fff',
  },
}

export default observer(['verseList'])(VersesPane)
