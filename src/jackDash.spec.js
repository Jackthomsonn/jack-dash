var JackDash = require('./jackDash.js')()

describe('When the values method is called', function () {
  describe('with an object', function () {
    it('should return the values from the given object', function () {
      expect(JackDash.values({ a: 1 }))
        .toEqual([1])
    })
  })
  describe('without an object', function () {
    beforeEach(function () {
      JackDash.values('a')
    })
    it('should throw an error', function () {
      expect(JackDash.values).toThrow()
    })
  })
})

describe('When the keys method is called', function () {
  describe('with an object', function () {
    expect(JackDash.keys({ foo: 'bar' }))
      .toEqual(['foo'])
  })
  describe('without an object', function () {
    beforeEach(function () {
      JackDash.keys('foo')
    })
    it('should throw an error', function () {
      expect(JackDash.keys).toThrow()
    })
  })
})

describe('When the concat method is called', function () {
  describe('with two seperate arrays', function () {
    expect(JackDash.concat([1, 2], [3, 4]))
      .toEqual([1, 2, 3, 4])
  })
  describe('with strings', function () {
    beforeEach(function () {
      JackDash.concat('Foo', 'Bar')
    })
    it('should throw an error', function () {
      expect(JackDash.concat).toThrow()
    })
  })

  describe('with two objects', function () {
    beforeEach(function () {
      JackDash.concat({ foo: 'bar' }, { foo: 'baz' })
    })
    it('should throw an error', function () {
      expect(JackDash.concat).toThrow()
    })
  })
})

describe('When the unique method is called', function () {
  describe('with an array of objects and a property to search by', function () {
    it('should return a unique array of object', function () {
      expect(JackDash.unique([
        { name: 'Jack', age: 22 },
        { name: 'Deadpool', age: 100 },
        { name: 'Jack', age: 22 }], 'name'))
        .toEqual([
          { name: 'Jack', age: 22 },
          { name: 'Deadpool', age: 100 }])
    })
  })
  describe('with an array and no property', function () {
    it('should return a unique array of object', function () {
      expect(JackDash.unique([1, 2, 3, 3, 4, 2, 5]))
        .toEqual([1, 2, 3, 4, 5])
    })
  })
  describe('with the wrong arguments', function () {
    beforeEach(function () {
      JackDash.unique({})
    })
    it('should throw an error', function () {
      expect(JackDash.unique).toThrow()
    })
  })
})

describe('When the dynamicObject method is called', function () {
  describe('with an array of keys and values', function () {
    it('should return an object built from the two arrays passed in', function () {
      expect(JackDash.dynamicObject(['a', 'b'], [1, 2]))
        .toEqual({
          a: 1,
          b: 2
        })
    })
  })
  describe('with more keys than values', function () {
    beforeEach(function () {
      JackDash.dynamicObject(['a', 'b', 'c'], [1, 2])
    })
    it('should throw an error', function () {
      expect(JackDash.dynamicObject).toThrow()
    })
  })
})