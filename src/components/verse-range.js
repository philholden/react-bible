// @flow

import React, { Component } from 'react'
import {
  getHashesFromIndexRange,
} from '../util/bible'
import Verse from './verse'

const VerseRange = ({ startIndex, endIndex }) => {
  const hashes = getHashesFromIndexRange('kjv', startIndex, endIndex)
  return (
    <div>
      {
        hashes.map(hash => (
          <Verse key={hash} hash={hash} versionName="kjv" />
        ))
      }
    </div>
  )
}

export default VerseRange
