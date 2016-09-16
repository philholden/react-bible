// @flow

import React, {Component} from 'react'
import VersePaneDom from './verse-pane-dom'
import QueryBar from './query-bar'
import { StyleSheet, css } from 'aphrodite'

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
      <div className={css(styles.wrapper)}>
        <QueryBar
          {...this.state}
          onChange={this.onChange}
        />
        <div className={css(styles.verseWrapper)}>
        <VersePaneDom
          {...this.state}
        />
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
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
  padding: {
  },
})
