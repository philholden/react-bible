// @flow

import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
  getVersion,
  getVerseFromHash,
  titleCase,
} from '../util/bible'

class VersePaneDom extends Component {
  rootEl = null
  clearRenderTimeout = -1

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.updateDom(this.props, true)
  }

  componentWillReceiveProps(props) {
    this.updateDom(props)
  }

  componentWillUnmount() {
    if (this.clearRenderTimeout === -1) {
      window.clearTimeout(this.clearRenderTimeout)
    }
  }

  updateDom = ({
    hashList,
    versionName,
  }, isInit) => {
    window.clearTimeout(this.clearRenderTimeout)
    const { props, rootEl } = this
    if (!rootEl) return
    if (
      !isInit &&
      arrayEquals(
        props.hashList,
        hashList,
      )
    ) return

    const { verseList } = getVersion(versionName)
    const displayLookUp = hashList.reduce((acc, item) => {
      acc[item] = true
      return acc
    }, {})

    this.clearRenderTimeout = rewriteAll({
      chunkCost: 1000,
      verseList,
      rootEl,
      isVisible: hash => displayLookUp[hash],
      versionName,
    })
  }

  render() {
    return (
      <div
        style={styles.wrapper}
        ref={el => {
          if (el != null) this.rootEl = el
        }}
      />
    )
  }
}

const replace = (el, text, reference, display) => {
  el.innerHTML = `${text} <em>(${reference})</em>`
  el.style.display = display
  return 3
}

const add = (parentEl, text, reference, display) => {
  const el = document.createElement('div')
  replace(el, text, reference, display)
  parentEl.appendChild(el)
  return 7
}

const rewrite = (el, text, reference, display) => {
  const txt = el.childNodes[0]
  const ref = el.childNodes[1].childNodes[0]
  const sty = el.style
  const newText = ` ${text}`
  const newReference = `(${reference})`
  let mutations = 0
  if (txt.nodeValue !== newText) {
    txt.nodeValue = newText
    mutations++
  }
  if (ref.nodeValue !== newReference) {
    ref.nodeValue = newReference
    mutations++
  }
  if (sty.display !== display) {
    sty.display = display
    mutations++
  }
  return mutations
}

const setVerse = ({
  parentEl,
  index,
  text,
  reference,
  display,
}) => {
  const node = parentEl.childNodes[index]
  if (!node) {
    return add(parentEl, text, reference, display)
  } else if (node.childNodes.length === 2) {
    return rewrite(node, text, reference, display)
  }
  return replace(node, text, reference, display)
}

const arrayEquals = (arr1, arr2) => {
//  if (!arr1 || !arr2) return false
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

const styles = {
  wrapper: {
    flex: 1,
    fontFamily: 'sans-serif',
    fontSize: 16,
    padding: 10,
    background: '#fff',
  },
}

const rewriteAll = ({
  chunkCost,
  verseList,
  rootEl,
  isVisible,
  versionName,
}) => {
  const nextChunk = (start) => () => {
    let i = start
    let cost = 0
    const end = verseList.length
    while (i < end && cost < chunkCost) {
      const hash = verseList[i].hash
      const {
        text,
        book,
        chapter,
        verse,
      } = getVerseFromHash(versionName, hash)
      cost += setVerse({
        parentEl: rootEl,
        index: i,
        text,
        reference: `${titleCase(book)} ${chapter}:${verse}`,
        display: isVisible(hash) ? 'block' : 'none',
      })
      i++
    }
    return i >= end ?
      -1 :
      window.setTimeout(nextChunk(i), 50)
  }
  return window.setTimeout(nextChunk(0), 50)
}

export default observer(['verseList'])(VersePaneDom)
