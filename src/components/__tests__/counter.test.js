// see here for more ways of testing react components with ava:
// https://github.com/avajs/ava/blob/master/docs/recipes/react.md
// Note Enzyme is becoming the norm in the React community

import test from 'ava'
import is from 'is_js'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import expect from 'expect'
import expectJSX from 'expect-jsx'
import Counter from '../counter'

expect.extend(expectJSX)

test('Counter render', () => {
  const renderer = createRenderer()

  renderer.render(
    <Counter />
  )
  expect(
    renderer.getRenderOutput()
  )
  .toEqualJSX(
    <h1 style={{ background: 'transparent', color: undefined }}>
      Counter (): 0
    </h1>
  )
})
