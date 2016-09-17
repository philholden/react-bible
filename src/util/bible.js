// @flow

import BibleReferences from 'bible-references'

const {
  bookNames: abbr,
  getVerseRanges,
} = new BibleReferences('english', 'chinese')

type VerseListItemType = {
  hash: string,
  text: string,
}

type LastVerseType = { verse: number }
type LastChapterType = {
  chapter: number,
  chapters: LastVerseType
}
type LastBookType = {
  book: number,
  books: LastChapterType
}

export type BibleVersionType = {
  verseList: Array<VerseListItemType>,
  verseLookUp: {[key: string]: number},
  last: LastBookType,
}

type BibleRefType = {
  book?: string,
  chapter?: string,
  verse?: string,
  index?: number
}

type VerseRangeType = {
  start: BibleRefType,
  end: BibleRefType
}

type BibleVerseType = {
  text: string,
  book: string,
  chapter: string,
  verse: string,
}

type JsonVerseType = {
  n: number,
  txt: string,
}
type JsonChapterType = Array<JsonVerseType>
type JsonBibleType = Array<JsonChapterType>

const bookNumber: {[key: string]: number} = abbr.reduce((acc, bookAbbrs, i) => {
  acc[bookAbbrs[0]] = i
  return acc
}, {})

const bookNames: {[key: string]: string} = abbr.reduce((acc, bookAbbrs, i) => {
  acc[i] = bookAbbrs[0]
  return acc
}, {})

export const titleCase = (str: string): string => str.replace(
  /\b\w/g,
  (m) => m.toUpperCase()
).replace(' Of ', ' of ')

export const bibleVersionToLookUp = (bibleVersion: JsonBibleType): BibleVersionType => {
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

const versions: {[key: string]: BibleVersionType} = {}

export const addBibleVersion = (
  versionName: string,
  version: BibleVersionType,
) => {
  versions[versionName] = bibleVersionToLookUp(version)
}

const limit = (n, max) => {
  if (n === undefined) return max
  if (n * 1 > max) return max
  return n * 1
}

export const fillRangeEnds = (
  versionName: string,
  verseRange: VerseRangeType
): VerseRangeType => {
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
  return {
    start: {
      ...start,
      index: startIndex,
    },
    end: {
      book: getBookName(endBook),
      chapter: `${endChapter + 1}`,
      verse: `${endVerse}`,
      index: endIndex,
    },
  }
}

export const getBookName = (index: number): string => bookNames[index]

export const expandHash = (hash: string): BibleRefType => {
  const parts = hash.split(':')
  return {
    book: getBookName(parts[0]),
    chapter: `${parts[1] * 1 + 1}`,
    verse: parts[2],
  }
}
export const getVersion = (
  versionName: string
): BibleVersionType => versions[versionName]

export const getBookNumber = (
  bookName: string
): number => bookNumber[bookName]

export const getIndexFromHash = (
  versionName: string,
  hash: string
): number => versions[versionName].verseLookUp[hash]

export const getVerseFromIndex = (
  versionName: string,
  index: number
): VerseListItemType => versions[versionName].verseList[index]

export const getVerseFromHash = (
  versionName: string,
  hash: string
): BibleVerseType => {
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
  versionName: string,
  startIndex: number,
  endIndex: number
): Array<string> =>
  getIndexRange(startIndex, endIndex)
    .map(index => getVersion(versionName).verseList[index].hash)

export const getHashesFromVerseRanges = (
  versionName: string,
  verseRanges: Array<VerseRangeType>
): Array<string> => {
  const ranges = verseRanges.map(
    ({ start, end }) =>
      getHashesFromIndexRange(versionName, start.index, end.index)
  )
  return [].concat(...ranges)
}

export const getFullVerseRanges = (
  { rangesText, versionName }: { rangesText: string, versionName: string }
) => {
  const text = rangesText || 'gen - rev'
  const ranges: Array<VerseRangeType> = getVerseRanges(text)
  return ranges.map(range =>
    fillRangeEnds(versionName, range))
}
