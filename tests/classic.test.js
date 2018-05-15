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

it('should should call with string parameters', () => {
  plug('one', 'two')
  expect(one).toHaveBeenCalled()
  expect(two).toHaveBeenCalled()
})

it('should should call with mixed parameters', () => {
  plug('one', ['two'], { one: true, two: true })
  expect(one).toHaveBeenCalled()
  expect(two).toHaveBeenCalled()
  expect(one).toHaveBeenCalledTimes(2)
  expect(two).toHaveBeenCalledTimes(2)
})

it('should should call with array parameter', () => {
  plug(['one', 'two'])
  expect(one).toHaveBeenCalled()
  expect(two).toHaveBeenCalled()
})

it('should call just once when parameters passed is on the same method', () => {
  plug('one', 'one')
  plug(['two', 'two'])
  expect(one).toHaveBeenCalledTimes(1)
  expect(two).toHaveBeenCalledTimes(1)
})

it('should call when last parameter is string true and popped', () => {
  plug('one', 'true')
})

it('should call without prefix set', () => {
  igniter()('../tests/mocks/class-one')
})

it('should not call when last parameter is falsy', () => {
  plug('one', false)
  plug('one', 'false')
  plug('one', '0')
})

it('should be called with a string plugin argument passed', () => {
  plug({ one: 'hello' })
  expect(one).toHaveBeenCalledTimes(1)
  expect(one).toHaveBeenCalledWith('hello')
})

it('should be called with an array plugin argument passed', () => {
  plug({ one: [['hello']] })
  expect(one).toHaveBeenCalledTimes(1)
  expect(one).toHaveBeenCalledWith(['hello'])
})

it('should be called with multiple plugin arguments passed', () => {
  const args = [[1, 2, 3], '2nd', '3rd']
  plug({ one: args })
  expect(one).toHaveBeenCalledWith([1, 2, 3], '2nd', '3rd')
})
