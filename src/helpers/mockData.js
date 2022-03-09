function getUnicItemsByValue(arr, value) {
  const res = []
  arr.forEach(item => {

    res.find(i => i[value] === item[value] ) ? false : res.push(item)
  })
  return res
}
function getReps(arr, value) {
  const unic = getUnicItemsByValue(arr, value)
  return getDiffByValue(arr, unic)
} 

function getDiffByValue(arr1, arr2) {
  return arr1.filter(item => !~arr2.indexOf(item) )
  // return arr.filter(item => !unic.find(i => i === item) )
}

function hasReps(arr, value) {
  return !!getReps(arr, value).length
}

function makeUnicArr(arr) {
  return [...new Set(arr)]
}

function unifyPeriodsByDates(setOfRecords) {
  for (const rec of setOfRecords) {
    const periods = rec.periods
    const reps = getReps(periods, 'dates')
    if (reps.length ) {
      rec.periods = periods.filter(p => !reps.includes(p) )
    }
  }
}

export {
  getUnicItemsByValue,
  getReps,
  getDiffByValue,
  hasReps,
  makeUnicArr,
  unifyPeriodsByDates,
}