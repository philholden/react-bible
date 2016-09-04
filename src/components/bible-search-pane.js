// @flow

import React, {Component} from 'react'
import VersePaneDom from './verse-pane-dom'
import QueryBar from './query-bar'

export default class BibleSearchPane extends Component {
  state = {
    versionName: 'kjv',
    filterText: '',
    rangesText: 'gen - rev',
    fullWords: false,
    caseSensitive: false,
    ...(this.props || {})
  }

  onChange = (value) => {
    this.setState(value)
  }

  render() {
    return(
      <div style={styles.wrapper}>
        <QueryBar
          {...this.state}
          onChange={this.onChange}
        />
        <div style={styles.verseWrapper}>
        <VersePaneDom
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
    flexDirection: 'column',
    flex: 1,
  },
  verseWrapper: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'auto',
  },
  padding:{
  }
}
