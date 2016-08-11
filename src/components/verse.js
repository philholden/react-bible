// @flow

import React from 'react'
import {
  getVerseFromHash,
  titleCase,
} from '../util/bible'

const Verse = ({ hash, versionName }) => {
  const {
    text,
    book,
    chapter,
    verse,
  } = getVerseFromHash(versionName, hash)
  return (
    <div style={styles.wrapper}>
      {text}
      {' '}
      <em style={styles.reference}>
        ({`${titleCase(book)} ${chapter}:${verse}`})
      </em>
    </div>
  )
}

const styles = {
  wrapper: {
    margin: 10
  },
  reference: {
    whiteSpace: 'nowrap',
    fontWeight: '200',
  }

}

export default Verse
