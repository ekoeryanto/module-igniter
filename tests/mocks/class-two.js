const MyObject = function (first, second, third) {
  this.name = 'two'
  this.lengthOfFirstArgument = first ? first.length : 0

  this.first = first

  this.second = second

  this.third = third
}

MyObject.prototype.getLengthOfFirstArgument = function () {
  return this.lengthOfFirstArgument
}

MyObject.prototype.getName = function () {
  return this.name
}

module.exports = MyObject
