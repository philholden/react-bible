// @flow

import React from 'react'
import { observer } from 'mobx-react'

const ref = ({book, chapter, verse}) =>
  `${book && (book[0].toUpperCase() + book.substr(1)) || ''}${book ? ' ' : ''}${chapter || ''}${verse ? ':' : ''}${verse || ''}`

const DebugVerseListPane = ({ verseList }) => (
  <div style={styles.wrapper}>
    {verseList.verseRanges.map(({ start, end }, i) => (
      <div key={i}>
        {`${ref(start)} - ${ref(end)}`}
      </div>
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
  }
}

export default observer(['verseList'])(DebugVerseListPane)
