// @flow

import React from 'react'
import { observer } from 'mobx-react'
import * as bib from '../util/bible'

window.bib = bib

const ref = ({book, chapter, verse}) =>
  `${book && (book[0].toUpperCase() + book.substr(1)) || ''}${book ? ' ' : ''}${chapter || ''}${verse ? ':' : ''}${verse || ''}`

const App = ({ verseList }) => (
  <div>
    <textarea
      value={verseList.text}
      onChange={e => verseList.text = e.target.value}
      style={{height: 500, float: 'left', marginRight: 20}}
    />
    {verseList.verseRanges.map(({ start, end }, i) => (
      <div key={i}>
        {`${ref(start)} - ${ref(end)}`}
      </div>
    ))}
  </div>
)

export default observer(App)
