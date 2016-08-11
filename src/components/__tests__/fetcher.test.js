import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Fetcher from '../fetcher'

const delay = callback => new Promise(resolve => {
  setImmediate(() => {
    resolve(callback())
  })
})

const getGreetingSuccess = () => new Promise(resolve => resolve({
  greeting: 'hello',
}))

const getGreetingError = () => new Promise(() => {
  throw new Error('Bad res from server')
})

test('button text is: Get greeting', async t => {
  const wrapper = shallow(<Fetcher />)
  t.is(wrapper.find('button').text(), 'Get greeting')
})

test('greeting text initially empty', async t => {
  const wrapper = shallow(<Fetcher />)
  t.is(wrapper.find('h1').text(), '')
})

test.serial('submiting form shows loading message', async t => {
  const wrapper = shallow(
    <Fetcher getGreeting={getGreetingSuccess} />
  )
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  })
  t.is(wrapper.find('h1').text(), '...loading')
})

test.serial('happy path', async t => {
  const wrapper = shallow(
    <Fetcher getGreeting={getGreetingSuccess} />
  )
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  })
  const text = await delay(() => wrapper.state())
  t.is(text.greeting, 'hello')
  wrapper.update()
  t.is(wrapper.find('h1').text(), 'hello')
})

test.serial('sad path', async t => {
  const wrapper = shallow(
    <Fetcher getGreeting={getGreetingError} />
  )
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  })
  const text = await delay(() => wrapper.state())
  wrapper.update()
  t.is(text.greeting, 'Bad res from server')
  t.is(wrapper.find('h1').text(), 'Bad res from server')
})
