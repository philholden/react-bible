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
  @observable text = ''
  @observable filterText = ''
  @observable caseSensitive = false
  @observable fullWords = false
  @computed get verseRanges() {
    const ranges = getVerseRanges(this.text)
    return ranges.map(range =>
      fillRangeEnds('kjv', range))
  }
  @computed get hashList() {
    console.log('run')
    return getHashesFromVerseRanges('kjv', this.verseRanges)
  }
  @computed get filterFn() {
    const filterText = this.filterText
    console.log('run2')
    return googlish(
      filterText,
      this.fullWords,
      this.caseSensitive
    )
  }
}
