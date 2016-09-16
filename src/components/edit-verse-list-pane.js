// @flow

import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'

export default class EditVerseListPane extends Component {
  state = {
    versionName: 'kjv',
    rangesText: '',
    ...(this.props || {}),
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
    const { rangesText } = this.state
    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.titlebar)}>
          Verse List
        </div>
        <textarea
          value={rangesText}
          onChange={this.updateState('rangesText', 'value')}
          className={css(styles.textarea)}
        />
        <div className={css(styles.links)}>
          <a
            className={css(styles.link)}
            href="https://www.youtube.com/watch?v=95KgkVCHmok"
            target="_blank"
          >
            Video
          </a>
          <a
            className={css(styles.link)}
            href="https://github.com/philholden/react-bible/blob/master/README.md"
            target="_blank"
          >
            GitHub ReadMe
          </a>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  textarea: {
    width: '7em',
    fontSize: 18,
    paddingTop: 22,
    paddingLeft: 24,
    paddingRight: 10,
    paddingBottom: 10,
    resize: 'none',
    borderRight: '1px solid #ccc',
    borderBottom: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    flex: 1,
  },
  titlebar: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    backgroundColor: '#3f8bae',
    color: 'white',
    lineHeight: '50px',
    textAlign: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    padding: 5,
    textAlign: 'center',
    display: 'block',
    color: 'white',
  },
  links: {
    backgroundColor: '#333',
    fontFamily: 'sans-serif',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
  },
})
