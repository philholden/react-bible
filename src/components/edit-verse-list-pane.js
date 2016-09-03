// @flow

import React from 'react'
import { observer } from 'mobx-react'
import * as bib from '../util/bible'

const EditVerseListPane = ({ verseList }) => (
  <textarea
    value={verseList.rangeListText}
    onChange={e => verseList.rangeListText = e.target.value}
    style={styles.textarea}
  />
)

const styles = {
  textarea: {
    width: '8em',
    fontSize: 16,
    padding: 10,
    resize: 'none',
    border: 'none',
    margin: 1
  }
}

export default observer(['verseList'])(EditVerseListPane)
