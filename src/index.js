export default opts => {
  const options = Object.assign(
    {
      prefix: '',
      classic: false
    },
    opts
  )
  const prefix = options.prefix || ''
  const classic = options.classic || false

  return (...plugs) => {
    if (plugs.length < 1) throw new Error('No module to load')

    const last = plugs[plugs.length - 1]

    // test will always true when param is array/object or non empty string
    let test = Boolean(last)

    // if test is true, check for boolean string
    if (test && /false|true|\d/.test(last)) {
      test = Boolean(JSON.parse(last))
      plugs.pop()
    }

    if (!test) return []

    const callee = (name, opts) => {
      opts = opts ? [].concat(opts) : []
      const Fn = require(prefix + name)
      if (classic) return new Fn(...opts)
      return Fn.apply(null, opts)
    }

    return (
      plugs
        // flatten array
        .reduce((a, c) => a.concat(c), [])
        // remove dupe, empty and boolean(test) value
        .filter((v, i, a) => a.indexOf(v) === i && typeof v !== 'boolean' && v)
        .map(p => {
          if (typeof p === 'string') {
            return callee(p)
          }

          return Object.keys(p)
            .filter(x => p[x])
            .map(z => (p[z] === true ? callee(z) : callee(z, p[z])))
        })
        // reflatten array
        .reduce((a, c) => a.concat(c), [])
    )
  }
}
