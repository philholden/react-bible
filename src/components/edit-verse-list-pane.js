// @flow

import React, { Component } from 'react'

export default class EditVerseListPane extends Component {
  state = {
    versionName: 'kjv',
    rangesText: '',
    ...(this.props.defaultValue || {}),
  }

  updateState = (key, field) => ({ target }) => {
    const update = { [key]: target[field] }
    this.setState(update)
    if (this.props.onChange) {
      this.props.onChange({
        ...this.state,
        ...update,
      })
    }
  }

  render() {
    const { rangeText } = this.state
    return (
      <textarea
        value={rangeText}
        onChange={this.updateState('rangesText', 'value')}
        style={styles.textarea}
      />
    )
  }
}

const styles = {
  textarea: {
    width: '8em',
    fontSize: 16,
    paddingTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    resize: 'none',
    borderRight: '1px solid #ccc',
    borderBottom: 'none',
    borderTop: 'none',
    borderLeft: 'none',
  }
}
