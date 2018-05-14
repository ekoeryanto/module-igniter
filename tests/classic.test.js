const igniter = require('../src')
const plug = igniter({ prefix: '../tests/mocks/class-', classic: true })

const one = require('./mocks/class-one')
const two = require('./mocks/class-two')

jest.mock('./mocks/class-one')
jest.mock('./mocks/class-two')

beforeEach(() => {
  one.mockClear()
  two.mockClear()
})

it('should throw if no param passed', () => {
  expect(plug).toThrowError('No module to load')
})

it('should instantiate plugin', () => {
  plug('one', 'two')
  expect(one).toHaveBeenCalled()
  expect(two).toHaveBeenCalled()
})

it('should instantiate once', () => {
  plug('one', 'one')
  expect(one).toHaveBeenCalledTimes(1)
})

it('should instantiated with a string argument', () => {
  plug({one: 'hello'})
  expect(one).toHaveBeenCalledTimes(1)
  expect(one).toHaveBeenCalledWith('hello')
})

it('should instantiated with an array argument', () => {
  plug({one: [['hello']]})
  expect(one).toHaveBeenCalledTimes(1)
  expect(one).toHaveBeenCalledWith(['hello'])
})

it('should instantiated with multiple arguments', () => {
  const args = [[1, 2, 3], '2nd', '3rd']
  plug({one: args})
  expect(one).toHaveBeenCalledWith([1, 2, 3], '2nd', '3rd')
})
