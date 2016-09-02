import React from 'react'
import { observer } from 'mobx-react'
import Spacer from './spacer'

const QueryBar = ({verseList}) => (
  <div style={styles.wrapper}>
    <label>search</label>
    {' '}
    <input
      value={verseList.filterText}
      type="text"
      onChange={e => verseList.filterText = e.target.value}
    />
    <Spacer />
    <label>range</label>
    {' '}
    <input
      value={verseList.rangesText}
      type="text"
      onChange={e => verseList.rangesText = e.target.value}
    />
    <Spacer />
    <label>
    <input
      type="checkbox"
      checked={verseList.caseSensitive}
      onChange={e => verseList.caseSensitive = e.target.checked}
    />
      {' '}
      case sensitive
    </label>
    <Spacer />
    <label>
      <input
        type="checkbox"
        checked={verseList.fullWords}
        onChange={e => verseList.fullWords = e.target.checked}
      />
      {' '}
      full words
    </label>
  </div>
)

const styles = {
  wrapper: {
    padding: 10,
    fontFamily: 'sans-serif'
  },
}
export default observer(['verseList'])(QueryBar)
