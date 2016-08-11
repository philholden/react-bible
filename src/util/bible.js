import { abbr } from 'bible-references'
import { getVersion } from '../api'
import kjv from '../../version/kjv.json'

window.kjv = kjv

export const bookNumber = abbr.reduce((acc, bookAbbrs, i) => {
  acc[bookAbbrs[0]] = i
  return acc
}, {})

export const bookName = abbr.reduce((acc, bookAbbrs, i) => {
  acc[i] = bookAbbrs[0]
  return acc
}, {})

export const bibleVersionToLookUp = (bibleVersion) => {
  const verseList = []
  const verseLookUp = {}
  const last = {
    book: 0,
    books: {},
  }
  bibleVersion.forEach((book, b) => {
    last.book = b
    last.books[b] = {
      chapter: 0,
      chapters: {},
    }
    book.forEach((chapter, c) => {
      last.books[b].chapter = c
      last.books[b].chapters[c] = {
        verse: 0,
      }
      chapter.forEach(verse => {
        last.books[b].chapters[c].verse = verse.n
        verseLookUp[`${b}:${c}:${verse.n}`] = verseList.length
        verseList.push({
          verse: verse.n,
          chapter: c,
          book: b,
          text: verse.txt,
        })
      })
    })
  })
  return { verseList, verseLookUp, last }
}

export const versions = {
  kjv: bibleVersionToLookUp(kjv),
}

export const addBibleVersion = (name: string) => {
  getVersion(name).then(bibleVersion => {
    versions[name] = bibleVersionToLookUp(bibleVersion)
  })
}

const limit = (n, max) => {
  if (n === undefined) return max
  if (n * 1 > max) return max
  return n * 1
}

export const fillRangeEnds = (versionName, verseRange) => {
  const { start, end } = verseRange
  const version = versions[versionName]
  const startIndex = version
    .verseLookUp[`${bookNumber[start.book]}:${start.chapter - 1}:${start.verse}`]
  const maxBook = version.last.book
  const endBook = limit(bookNumber[end.book], maxBook)
  const maxChapter = version.last.books[endBook].chapter
  const endChapter = limit(end.chapter, maxChapter)
  const maxVerse = version.last.books[endBook].chapters[endChapter].verse
  const endVerse = limit(end.verse, maxVerse)
  const endIndex = version
    .verseLookUp[`${endBook}:${endChapter}:${endVerse}`]
  console.log(endBook, endChapter, endVerse, endIndex)
  return {
    start: {
      ...start,
      index: startIndex,
    },
    end: {
      book: bookName[endBook],
      chapter: endChapter,
      verse: endVerse,
      index: endIndex,
    },
  }
}

export const verseRangeToVerses = (versionName, verseRange) => {
  const { start, end } = verseRange
  const version = versions[versionName]
  const startIndex = version
    .verseLookUp[`${bookNumber[start.book]}:${start.chapter}:${start.verse}`]
  const maxBook = version.last.book
  const endBook = limit(bookNumber[end.book], maxBook)
  const maxChapter = version.last.books[endBook].chapter
  const endChapter = limit(end.chapter, maxChapter)
  const maxVerse = version.last.books[endBook].chapters[endChapter].verse
  const endVerse = limit(end.verse, maxVerse)
  const endIndex = version
    .verseLookUp[`${endBook}:${endChapter}:${endVerse}`]
  console.log(endBook, endChapter, endVerse, endIndex)
  return { startIndex, endIndex }
}

export const getBookNumber = bookName => bookNumber[bookName]
