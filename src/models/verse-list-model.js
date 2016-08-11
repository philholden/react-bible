import {
  observable,
  computed,
} from 'mobx'
import { getVerseRanges } from 'bible-references'
import {
  fillRangeEnds,
  versions,
} from '../util/bible'

console.log(getVerseRanges(''))

export default class VerseListModel {
  store
  id
  @observable text = ''
  @computed get verseRanges() {
    const ranges = getVerseRanges(this.text)
    const ranges2 = ranges.map(range =>
      fillRangeEnds('kjv', range))
    const ends = ranges2.map(range => ({
      start: versions.kjv.verseList[range.start.index],
      end: versions.kjv.verseList[range.end.index],
    }))
    console.log(JSON.stringify(ranges2, 0, 2))
    console.log(JSON.stringify(ends), 0, 2)
    return ranges2
  }
  // @computed get verseRanges() {
  //   const a = getVerseRanges(this.text)
  //     .map(range => verseRangeToVerses('kjv', range))
  //   console.log(a)
  //   return a
  // }
}
