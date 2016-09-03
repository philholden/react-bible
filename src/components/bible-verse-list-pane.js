// @flow

import React, { Component } from 'react'
import RangePane from './range-pane'
import EditVerseListPane from './edit-verse-list-pane'

export default class BibleVerseListPane extends Component {
  state = {
    versionName: 'kjv',
    rangesText: '',
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
    paddingLeft: 5,
    paddingRight: 5,
    borderRight: '1px solid #ccc',
    background: 'white',
    flex: 1,
    overflow: 'auto',
  }
}
