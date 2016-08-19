import {
  observable,
  computed,
} from 'mobx'
import { getVerseRanges } from 'bible-references'
import {
  fillRangeEnds,
  getVersion,
  getHashesFromVerseRanges,
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
      start: getVersion('kjv').verseList[range.start.index],
      end: getVersion('kjv').verseList[range.end.index],
    }))
    console.log(JSON.stringify(ranges2, 0, 2))
    console.log(JSON.stringify(ends), 0, 2)
    return ranges2
  }
  @computed get hashList() {
    return getHashesFromVerseRanges('kjv', this.verseRanges)
  }
}
