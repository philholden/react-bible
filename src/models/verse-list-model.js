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
import googlish from 'googlish'

console.log(getVerseRanges(''))

export default class VerseListModel {
  store
  id
  @observable rangesText = ''
  @observable filterText = ''
  @observable caseSensitive = false
  @observable fullWords = false

  @computed get verseRanges() {
    const text = this.rangesText || 'gen - rev'
    const ranges = getVerseRanges(text)
    return ranges.map(range =>
      fillRangeEnds('kjv', range))
  }
  @computed get hashList() {
    return getHashesFromVerseRanges('kjv', this.verseRanges)
  }
}
