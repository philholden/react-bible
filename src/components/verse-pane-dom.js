// @flow

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import googlish from 'googlish'

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
    filterText,
    fullWords,
    caseSensitive,
  }, isInit) => {
    const filterFn = googlish(
      filterText,
      fullWords,
      caseSensitive
    )
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

    if (this.searchRoot) {
      selfDistruct(this.searchRoot)
    }

    this.searchRoot = document.createElement('div')
    this.searchRoot.setAttribute('class', 'a' + (Date.now()/1000|0))
    rootEl.insertBefore(this.searchRoot, rootEl.firstChild)
    console.log('filter',filterFn)
    this.clearRenderTimeout = rewriteAll({
      chunkCost: 1000,
      verseList,
      rootEl: this.searchRoot,
      isVisible: hash => displayLookUp[hash],
      filterFn,
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
      >
        <style
          dangerouslySetInnerHTML={{
            __html:`
            .verse {
              margin-bottom: 1em;
              line-height: 1.3;
            }
            .verse em {
              white-space: nowrap;
            }
        `}}/>
      </div>
    )
  }
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
    overflow: 'auto',
  },
}

const rewriteAll = ({
  chunkCost,
  verseList,
  rootEl,
  isVisible,
  filterFn,
  versionName,
}) => {
  let maxCost = 50
  const nextChunk = (start) => () => {
    let i = start
    let cost = 0
    const end = verseList.length
    const chunkEl = document.createElement('div')
    let innerHtml = ''
    while (i < end && cost < maxCost) {
      const hash = verseList[i].hash
      if (isVisible(hash)) {
        const {
          text,
          book,
          chapter,
          verse,
        } = getVerseFromHash(versionName, hash)
        if (filterFn(text)) {
          const reference = `${titleCase(book)} ${chapter}:${verse}`
          innerHtml += `<div id="${hash}" class="verse">${text} <em>(${reference})</em></div>\n`
          cost++
        }
      }
      i++
    }
    maxCost = chunkCost
    chunkEl.innerHTML = innerHtml
    rootEl.appendChild(chunkEl)
    return i >= end ?
      -1 :
      window.setTimeout(nextChunk(i), 100)
  }
  return window.setTimeout(nextChunk(0), 0)
}

const selfDistruct = (el) => {
  if (!document.contains(el)) return
  el.style.display = 'none'
  if (el.firstChild) {
    el.firstChild.remove()
    setTimeout(() => selfDistruct(el), 100)
  }
  el.remove()
}

export default observer(['verseList'])(VersePaneDom)
