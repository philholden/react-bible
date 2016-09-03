import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Spacer from './spacer'

export default class QueryBar extends Component {
  state = {
    versionName: 'kjv',
    filterText: '',
    rangesText: '',
    fullWords: false,
    caseSensitive: false,
    ...(this.props.defaultValue || {})
  }

  updateState = (key, field) => ({ target }) => {
    const update = { [key]: target[field] }
    this.setState(update)
    if (this.props.onChange) {
      this.props.onChange({
        ...this.state,
        ...update
      })
    }
  }

  render() {
    const {
      versionName,
      filterText,
      rangesText,
      fullWords,
      caseSensitive,
    } = this.state

    return (
      <div style={styles.wrapper}>
        <div style={styles.block}>
          <label>Search</label>
          {' '}
          <input
            value={filterText}
            type="text"
            onChange={this.updateState('filterText', 'value')}
          />
        </div>
        <div style={styles.block}>
          <label>Range</label>
          {' '}
          <input
            value={rangesText}
            type="text"
            onChange={this.updateState('rangesText', 'value')}
          />
        </div>
        <label style={styles.block}>
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={this.updateState('caseSensitive', 'checked')}
        />
          {' '}
          Case Sensitive
        </label>
        <label style={styles.block}>
          <input
            type="checkbox"
            checked={fullWords}
            onChange={this.updateState('fullWords', 'checked')}
          />
          {' '}
          Full Words
        </label>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    fontFamily: 'sans-serif',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -5,
    marginRight: -5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  block: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  }
}
