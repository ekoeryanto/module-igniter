const igniter = require('../src')

const plug = igniter({ prefix: '../tests/mocks/' })

it('should throw if no param passed', () => {
  expect(plug).toThrowError('No module to load')
})

describe('without argument', () => {
  const expected = [
    {
      loaded: true,
      option: [],
      name: expect.stringMatching(/foo|bar|noop/)
    }
  ]

  test('ignite by string params', () => {
    expect(plug('noop', 'foo')).toEqual(expect.arrayContaining(expected))
  })
  test('ignited module count', () => {
    expect(plug('noop', 'foo')).toHaveLength(2)
  })
  test('ignite by array params', () => {
    expect(plug(['noop', 'foo'])).toEqual(expect.arrayContaining(expected))
  })
  test('ignited module count', () => {
    expect(plug(['noop', 'foo'])).toHaveLength(2)
  })
  test('ignite by boolean object params', () => {
    expect(plug({ noop: true, foo: true })).toEqual(
      expect.arrayContaining(expected)
    )
  })
  test('ignited module count', () => {
    expect(plug({ noop: true, foo: true })).toHaveLength(2)
  })
  test('ignited by boolean false object ommited', () => {
    expect(plug({ noop: true, foo: false })).toHaveLength(1)
  })
  test('duplicate module ommited', () => {
    expect(plug('noop', 'foo', 'noop')).toHaveLength(2)
  })

  describe('test (last) param', () => {
    describe('falsy have no module', () => {
      test('0', () => {
        expect(plug('foo', 'noop', 0)).toHaveLength(0)
      })
      test('`0`', () => {
        expect(plug('foo', 'noop', `0`)).toHaveLength(0)
      })
      test('false', () => {
        expect(plug('foo', 'noop', false)).toHaveLength(0)
      })
      test('`false`', () => {
        expect(plug('foo', 'noop', `false`)).toHaveLength(0)
      })
      test('undefined', () => {
        expect(plug('foo', 'noop', undefined)).toHaveLength(0)
      })
      test('null', () => {
        expect(plug('foo', 'noop', null)).toHaveLength(0)
      })
      test('``', () => {
        expect(plug('foo', 'noop', '')).toHaveLength(0)
      })
      test('NaN', () => {
        expect(plug('foo', 'noop', NaN)).toHaveLength(0)
      })
    })

    describe('truthy have the modules', () => {
      test('1', () => {
        expect(plug('foo', 'noop', 1)).toHaveLength(2)
      })
      test('`1`', () => {
        expect(plug('foo', 'noop', `1`)).toHaveLength(2)
      })
      test('true', () => {
        expect(plug('foo', 'noop', true)).toHaveLength(2)
      })
      test('`true`', () => {
        expect(plug('foo', 'noop', `true`)).toHaveLength(2)
      })
    })
  })
})

describe('with argument', () => {
  const expected = option =>
    expect.arrayContaining([
      expect.objectContaining({
        name: expect.stringMatching(/foo|bar|noop/),
        loaded: true,
        option: expect.arrayContaining(option)
      })
    ])
  it('should have single option object in module', () => {
    expect(plug({ foo: { baz: 1 } })).toEqual(
      expected([expect.objectContaining({ baz: 1 })])
    )
  })
  it('should have single string option in module', () => {
    expect(plug({ foo: 'hello' })).toEqual(
      expected([expect.stringMatching('hello')])
    )
  })
  it('should have single array option in module', () => {
    expect(plug({ foo: [['hello']] })).toEqual(
      expected([expect.arrayContaining(['hello'])])
    )
  })
  it('should have multiple option object in module', () => {
    expect(plug({ foo: [{ baz: 1 }, { bax: 1 }] })).toEqual(
      expected([
        expect.objectContaining({ baz: 1 }),
        expect.objectContaining({ bax: 1 })
      ])
    )
  })
})
