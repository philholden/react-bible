// @flow

import React, { Component } from 'react'
import RangePane from './range-pane'
import EditVerseListPane from './edit-verse-list-pane'

export default class BibleVerseListPane extends Component {
  state = {
    versionName: 'kjv',
    rangesText: [
      'Ec 9:11',
      'Matt 23:24',
    //  'lk 2:13,14',
    //  'Proverbs 20:3',
    //  'Proverbs 26:21',
    //  '1 Peter 3:18',
    //  'lk 11:9',
    //  'prov 6:6-9,11,',
    ].join('\n')
  }

  onChange = (value) => {
    this.setState(value)
  }

  render() {
    return(
      <div style={styles.wrapper}>
        <EditVerseListPane
          {...this.state}
          onChange={this.onChange}
        />
        <div style={styles.verseWrapper}>
        <RangePane
          {...this.state}
        />
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
  },
  verseWrapper: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRight: '2px solid #ccc',
    background: 'white',
    flex: 1,
    overflow: 'auto',
  }
}
