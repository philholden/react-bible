import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Spacer from './spacer'
import { StyleSheet, css } from 'aphrodite'

export default class QueryBar extends Component {
  state = {
    versionName: 'kjv',
    filterText: '',
    rangesText: '',
    fullWords: false,
    caseSensitive: false,
    ...(this.props || {})
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
      <div className={css(styles.wrapper)}>
        <div className={css(styles.block)}>
          <label>Search</label>
          {' '}
          <input
            value={filterText}
            type="text"
            onChange={this.updateState('filterText', 'value')}
            className={css(styles.input)}
          />
        </div>
        <div className={css(styles.block)}>
          <label>Range</label>
          {' '}
          <input
            value={rangesText}
            type="text"
            onChange={this.updateState('rangesText', 'value')}
            className={css(styles.input)}
          />
        </div>
        <div className={css(styles.block)}>
        <label>
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={this.updateState('caseSensitive', 'checked')}
        />
          {' '}
          Case Sensitive
        </label>
        <Spacer />
        <label>
          <input
            type="checkbox"
            checked={fullWords}
            onChange={this.updateState('fullWords', 'checked')}
          />
          {' '}
          Full Words
        </label>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: 'sans-serif',
//    borderBottom: '1px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#3f8bae',
    color: 'white',
  },
  block: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  input: {
    border: 'none',
    marginLeft: 5,
    fontSize: 16,
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    paddingTop: 1,
  }
})
