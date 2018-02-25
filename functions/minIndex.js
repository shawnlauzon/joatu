const R = require('ramda')

// Performs 2 passes through the List: one to find the min, and another to find the index
// of that min. Thus it could be improved by keeping the index of the min value.
const minList = R.reduce(R.min, Infinity)

// R.ap = (f, g)(x) => f(x, g(x))
const minIndex = R.ap(R.flip(R.indexOf), minList)

module.exports = minIndex
