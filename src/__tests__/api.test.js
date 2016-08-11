import 'isomorphic-fetch'
import fetchMock from 'fetch-mock'
import test from 'ava'
import { getGreeting } from '../api'

test.afterEach.always(fetchMock.restore)

test.serial('should return greeting', async t => {
  fetchMock.mock({
    matcher: '/greeting',
    response: {
      status: 200,
      body: { greeting: 'hello' },
    },
    method: 'GET',
  })

  const res = await getGreeting()
  t.deepEqual(res, { greeting: 'hello' })
})

test.serial('should throw error for failed request', t => {
  fetchMock.mock({
    matcher: '/greeting',
    response: 404,
    method: 'GET',
  })

  const res = getGreeting()

  t.throws(res, (e) => e.message === 'Bad res from server')
})
