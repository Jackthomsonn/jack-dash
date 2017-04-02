'use strict'

var JackDash = function () {
  return {
    values: function (obj) {
      if (obj instanceof Array || typeof obj === 'string' || typeof obj === 'number') {
        try {
          throw new CustomError('Values', 'values must be instantiated with an object')
        } catch (e) {
          return e
        }
      } else {
        return Object.values(obj)
      }
    },
    keys: function (obj) {
      if (obj instanceof Array || typeof obj === 'string' || typeof obj === 'number') {
        try {
          throw new CustomError('Keys', 'keys must be instantiated with an object')
        } catch (e) {
          return e
        }
      } else {
        return Object.keys(obj)
      }
    },
    concat: function (arr1, arr2) {
      if (typeof arr1 === 'string' || typeof arr2 === 'string' || typeof arr1 === 'object' && !(arr1 instanceof Array) || typeof arr2 === 'object' && !(arr2 instanceof Array) || typeof arr1 === 'number' || typeof arr2 === 'number' || !arguments) {
        try {
          throw new CustomError('Concat', 'concat must be instantiated with two arrays')
        } catch (e) {
          return e
        }
      } else {
        var arr = []
        arr1.forEach(function (arr1) {
          arr.push(arr1)
        })
        arr2.forEach(function (arr2) {
          arr.push(arr2)
        })
        return arr
      }
    },
    unique: function (arr, prop) {
      if (typeof arr === 'string' || typeof arr === 'number' || typeof arr === 'object' && !(arr instanceof Array)) {
        try {
          throw new CustomError('Unique', 'unique must be instantiated with an array')
        } catch (e) {
          return e
        }
      } else {
        var results = []
        var exists
        var ab = arr.forEach(function (a) {
          if (prop) {
            exists = results.find(function (b) {
              return a[prop] === b[prop]
            })
          } else {
            exists = results.find(function (b) {
              return a === b
            })
          } !exists ? results.push(a) : null
        })
        return results
      }
    },
    dynamicObject: function (keys, values) {
      var keyPairs = [],
        valuePairs = [],
        obj = {}

      keys.map(function (key) {
        keyPairs.push(key)
      })

      values.map(function (value) {
        valuePairs.push(value)
      })

      if (keyPairs.length !== valuePairs.length) {
        try {
          throw new CustomError('Dynamic Object', 'Make sure you have supplied the same amount of values as keys')
        } catch (e) {
          return e
        }
      } else {
        keyPairs.map(function (curr, index) {
          obj[curr] = valuePairs[index]
        })
        return obj
      }
    },
    async: function () {
      var index = 0
      var results = []
      var hasError = false
      var exists = undefined
      var err = undefined
      var iterator = 0
      var obj = {}
      var bodyItems = []
      return {
        parallel: function (fns, response) {
          if (typeof fns === 'string' || typeof fns === 'number') {
            err = new CustomError('Async parallexql', 'You must provide either an object or array of functions')
            return response(err, results)
          }
          if (typeof fns === 'object' && fns instanceof Array) {
            var cb = function (error, body) {
              index++
              if (error !== null) {
                index = fns.length
                err = new CustomError('Async parallel', error)
              } else {
                results.push(body)
              }
              if (index === fns.length) {
                response(err, results)
              }
            }
            fns.forEach(function (fn) {
              fn(cb)
            })
          } else {
            var keys = Object.keys(fns)
            var functionDatas = []

            keys.forEach(function (key) {
              functionDatas.push({
                function: fns[key],
                propertyName: key
              })
            })

            var cb = function (error, body, propertyName) {
              index++
              if (error !== null) {
                index = functionDatas.length
                err = new CustomError('Async parallel', error)
              } else {
                obj[propertyName] = body
              }
              if (index === functionDatas.length) {
                response(err, obj)
              }
            }
            functionDatas.forEach(function (functionData, index) {
              functionData.function(function (err, result) {
                cb(err, result, functionData.propertyName)
              })
            })
          }
        },
        series: function(fns, response) {
          if (typeof fns === 'string' || typeof fns === 'number') {
            err = new CustomError('Async series', 'You must provide either an object or array of functions')
            return response(err, results)
          }
          if (typeof fns === 'object' && fns instanceof Array) {
            var iterator = 0
            var results = []

            const checkForMoreFns = function () {

              if (iterator < fns.length) {
                fns[iterator](cb)
              } else {
                response(err, results)
              }
            }

            const cb = function(error, body) {
              if (error !== null) {
                iterator = fns.length
                err = new CustomError('Async Series', error)
                checkForMoreFns()
              } else {
                results.push(body)
                iterator++
                checkForMoreFns()
              }
            }

            checkForMoreFns()
          } else {
            const keys = Object.keys(fns)
            const functionDatas = []

            keys.forEach(function (key) {
              functionDatas.push({
                function: fns[key],
                propertyName: key
              })
            })

            const checkForMoreFns = function () {
              if (iterator < keys.length) {
                functionDatas[iterator].function(function (err, body) {
                  cb(err, body, functionDatas[iterator].propertyName)
                })
              } else {
                response(err, obj)
              }
            }

            const cb = function (error, body, propertyName) {
              if (error !== null) {
                iterator = keys.length
                err = new CustomError('Async Series', error)
                checkForMoreFns()
              } else {
                obj[propertyName] = body
                iterator++
                checkForMoreFns()
              }
            }

            checkForMoreFns()
          }
        }
      }
    }()
  }
}

var CustomError = function (method, message) {
  return {
    message: 'JackDash: ' + method + ' threw the following error: ' + message
  }

}

module.exports = JackDash