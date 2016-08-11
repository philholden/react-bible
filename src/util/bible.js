import { abbr } from 'bible-references'
import kjv from '../../version/kjv.json'

const bookNumber = abbr.reduce((acc, bookAbbrs, i) => {
  acc[bookAbbrs[0]] = i
  return acc
}, {})

const bookNames = abbr.reduce((acc, bookAbbrs, i) => {
  acc[i] = bookAbbrs[0]
  return acc
}, {})

// const bookDisplayNames = Object.values(bookNames)
//   .map(book => book.replace(
//     /\b\w/g,
//     (m) => m.toUpperCase()
//   ).replace(' Of ', ' of '))

export const titleCase = str => str.replace(
  /\b\w/g,
  (m) => m.toUpperCase()
).replace(' Of ', ' of ')

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
          hash: `${b}:${c}:${verse.n}`,
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
  const version = getVersion(versionName)
  const startIndex = version
    .verseLookUp[`${bookNumber[start.book]}:${start.chapter - 1}:${start.verse}`]
  const maxBook = version.last.book
  const endBook = limit(bookNumber[end.book], maxBook)
  const maxChapter = version.last.books[endBook].chapter
  const endChapter = limit(end.chapter && end.chapter - 1, maxChapter)
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
      book: getBookName(endBook),
      chapter: endChapter + 1,
      verse: endVerse,
      index: endIndex,
    },
  }
}

export const getBookName = index => bookNames[index]

export const expandHash = hash => {
  const parts = hash.split(':')
  return {
    book: getBookName(parts[0]),
    chapter: parts[1] * 1 + 1,
    verse: parts[2],
  }
}
export const getVersion = versionName => versions[versionName]
export const getBookNumber = bookName => bookNumber[bookName]

export const getIndexFromHash = (versionName, hash) =>
  versions[versionName].verseLookUp[hash]

export const getVerseFromIndex = (versionName, index) =>
  versions[versionName].verseList[index]

export const getVerseFromHash = (versionName, hash) => {
  const index = getIndexFromHash(versionName, hash)
  const { text } = getVerseFromIndex(versionName, index)
  return {
    text,
    ...expandHash(hash),
  }
}

const getIndexRange = (startIndex, endIndex) => {
  const indices = []
  for (let i = startIndex; i <= endIndex; i++) {
    indices.push(i)
  }
  return indices
}

export const getHashesFromIndexRange = (
  versionName,
  startIndex,
  endIndex
) =>
  getIndexRange(startIndex, endIndex)
    .map(index => getVersion(versionName).verseList[index].hash)
