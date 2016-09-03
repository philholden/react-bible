import React from 'react'
import { observer } from 'mobx-react'
import Spacer from './spacer'
import VersePaneDom from './verse-pane-dom'


type RangePanePropsType = {
  rangesText: string,
  versionName: string,
}

const RangePane = ({ versionName, rangesText }) => {
  let ranges = rangesText.split('\n')
  const removeEmpty = text => !!text.trim()
  ranges = ranges
     .filter(removeEmpty)
     .map(text => text.replace(/[,-\s;\n]+$/,''))

  return (
    <div style={styles.wrapper}>
      {
        ranges.map((rangesText2) => {
          return (
            <div key={rangesText2}>
              <VersePaneDom
                filterText={''}
                fullWords={false}
                caseSensitive={false}
                rangesText={rangesText2}
                versionName={versionName}
              />
            </div>
          )
        })
      }
    </div>
  )

}

const styles = {
  wrapper: {
    fontFamily: 'sans-serif',
    fontSize: 16,
  },
  verseGroup: {
//    marginBottom: 20,
  }
}

export default observer(RangePane)
