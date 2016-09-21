// @flow

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import googlish from 'googlish'

import {
  loadVersion,
} from '../api'

import {
  getVersion,
  getVerseFromHash,
  titleCase,
  getFullVerseRanges,
  getHashesFromVerseRanges,
} from '../util/bible'

import type {
  BibleVersionType,
} from '../util/bible'

type VersePaneDomPropsType = {
  filterText: string,
  fullWords: boolean,
  caseSensitive: boolean,
  rangesText: string,
  versionName: string,
}

class VersePaneDom extends Component {
  rootEl: HTMLElement
  searchRoot: HTMLElement
  version: BibleVersionType
  clearRenderTimeout = -1
  hashList: Array<string> = []
  props: VersePaneDomPropsType

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    const { versionName } = this.props
    this.updateDomAfterLoading(this.props, null)
    this.rootEl.addEventListener('keydown', (e: Event) => {
      let el = e.target
      if (!(el instanceof HTMLElement)) return
      if (
        (el.classList.contains('verse') ||
        el.classList.contains('verse-group'))
        && [37, 38, 39, 40].indexOf(e.keyCode) !== -1
      ) {
        e.preventDefault()
        if (el.classList.contains('verse')) {
          const parent = el.parentElement
          el.outerHTML = `
          <div id="${el.id}" tabindex="100" class="verse-group">
          <div class="verses-before"></div>
          <div class="verse">${el.innerHTML}</div>
          <div class="verses-after"></div>
          </div>`
          el = parent.querySelector(`[id=${el.id}]`)
        }
        const beforeEl = el.querySelector('.verses-before')
        const afterEl = el.querySelector('.verses-after')
        el.focus()
        const div = document.createElement('div')
        // setTimeout(() => el.focus(), 1000)
        switch (e.keyCode) {
          case 37: {
            const { length } = beforeEl.children
            const index = this.version.verseLookUp[idToHash(el.id)] - (length + 1)
            if (index < 0) return
            const { hash } = this.version.verseList[index]
            beforeEl.insertBefore(div, beforeEl.firstChild)
            div.outerHTML = renderVerse(versionName, hash)
            break
          }
          case 39:
            if (beforeEl.firstChild) beforeEl.firstChild.remove()
            break
          case 40: {
            const { length } = afterEl.children
            const index = this.version.verseLookUp[idToHash(el.id)] + (length + 1)
            if (index >= this.version.verseLookUp) return
            const { hash } = this.version.verseList[index]
            afterEl.appendChild(div)
            div.outerHTML = renderVerse(versionName, hash)
            break
          }
          case 38:
            if (afterEl.lastChild) afterEl.lastChild.remove()
            break
        }
      }
    })
  }

  componentWillReceiveProps(props) {
    // window.setTimeout(() => this.updateDom(props), 75)
    this.updateDomAfterLoading(props, this.props)
  }

  componentWillUnmount() {
    if (this.clearRenderTimeout === -1) {
      window.clearTimeout(this.clearRenderTimeout)
    }
  }

  updateDomAfterLoading = (nextProps, props) => {
    loadVersion(nextProps.versionName).then(() => {
      const { versionName } = this.props
      this.version = getVersion(versionName)
      this.updateDom(nextProps, props)
    })
  }

  updateDom = ({
    filterText,
    fullWords,
    caseSensitive,
    rangesText,
    versionName,
  }, oldProps) => {
    const fullRange = getFullVerseRanges({ rangesText, versionName })
    const hashList = getHashesFromVerseRanges(versionName, fullRange)
    const filterFn = googlish(
      filterText,
      fullWords,
      caseSensitive
    )
    window.clearTimeout(this.clearRenderTimeout)
    const { rootEl } = this
    if (!rootEl) return
    if (
      oldProps &&
      arrayEquals(
        this.hashList,
        hashList,
      ) &&
      filterText === oldProps.filterText &&
      caseSensitive === oldProps.caseSensitive &&
      fullWords === oldProps.fullWords &&
      versionName === oldProps.versionName
    ) return

    this.hashList = hashList
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
              line-height: 1.5;
              margin: 0 0 1.5em;
              padding: 0 5px;
            }
            .verse em {
              white-space: nowrap;
            }
            .verses-after, .verses-before {
              background: #eee;
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
    fontFamily: 'sans-serif',
    fontSize: 20,
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
          innerHtml += `
          <div id="${hashToId(hash)}" class="verse" tabindex="100">
            ${text} <em>(${reference})</em>
          </div>\n`
          cost++
        }
      }
      i++
    }
    maxCost = Math.max(chunkCost, maxCost + 100)
    chunkEl.innerHTML = innerHtml
    rootEl.appendChild(chunkEl)
    return i >= end ?
      -1 :
      window.setTimeout(nextChunk(i), 100)
  }
  nextChunk(0)()
  return 0
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

const renderVerse = (versionName, hash) => {
  const {
    text,
    book,
    chapter,
    verse,
  } = getVerseFromHash(versionName, hash)

  const reference = `${titleCase(book)} ${chapter}:${verse}`
  return `<div class="verse">
    ${text} <em>(${reference})</em>
  </div>`
}

const hashToId = (hash) => `h${hash.replace(/:/g, '-')}`
const idToHash = (id) => id.substr(1).replace(/-/g, ':')


export default observer(VersePaneDom)
