import { WORKER_NAMES, PERIOD_DATES, PERIOD_TYPES } from "./mochConstants.js"
import { unifyPeriodsByDates } from "../../../helpers/mockData.js"
// const { WORKER_NAMES, PERIOD_DATES, PERIOD_TYPES } = require("./mochConstants.js")
const getRandom = (from = 0, to) => from + Math.floor(Math.random() * (to + 1) )
const getRandomConstant = constants => constants[getRandom(0, constants.length - 1) ]



class WorkerRecord {
  static currentId = 0
  constructor({ name, dateRecords }) {
    this._id = ++WorkerRecord.currentId
    this.name = name
    this.dateRecords = dateRecords
  }
}
class WorkerRecords {
  constructor(records) {
    this.records = records
  }
}


class DateRecord {
  static currentId = 0

  constructor({ date, type, isNew, isProven }) {
    this._id = ++DateRecord.currentId
    this.date = date
    this.type = type
    this.isNew = isNew
    this.isProven = isProven
  }
}
class DateRecords {
  constructor(records) {
    this.records = records
  }
}



const parseDayAndMonth = (periodStr) => {
  let [day, month] = periodStr.split('.')
  return [--month, day]
}
const dateFromDayMonth = (month, day) => new Date( Date.UTC(2021, month, day) )
const dayMonthFromDate = (date) => [date.getMonth(), date.getDate()]

const periodToDates = (periodStr) => {
  const dates = []
  let [startString, endString] = periodStr.split('-')

  let [currentMonth, currentDay] = parseDayAndMonth(startString)
  const endDate = dateFromDayMonth(...parseDayAndMonth(endString) )

  while (true) {
    let currentDate = dateFromDayMonth(currentMonth, currentDay++)
    dates.push(currentDate)
    if (currentDate.getTime() == endDate.getTime() ) break
  }
  return dates
} 

function getSetOfUnicPeriods (count = 1) {
  let datesSet = new Set()
  while (datesSet.size < count) {
    const period = getRandomConstant(PERIOD_DATES)
    datesSet.add(period)
  }

  return [...datesSet]
}

const getRandomDates = () => {
  const dates = []
  const length = getRandom(5, 14)
  const startDate = new Date( 2021, 0, getRandom(0, 340) )
  let [currentMonth, currentDay] = dayMonthFromDate(startDate)

  if (startDate.getFullYear() != 2021) return getRandomDates()
  
  for (let i = 0; i < length; i++) {
    const currentDate = new Date(Date.UTC(2021, currentMonth, currentDay++) )
    dates.push(currentDate)
  }
  return dates
}




function dateRecordsFabric(periodsCount = 1) {
  const periods = []
  for (let i = 0; i < periodsCount; i++) {
    const type = getRandomConstant(PERIOD_TYPES)
    const dates = getRandomDates()

    const dateRecords = dates.map(date => new DateRecord(
      {date, type, isNew: false, isProven:true}
    ))
    periods.push(dateRecords)
  }
  const dateRecords = new DateRecords(periods.flat() )
  dateRecords.records = getUnicDateRecords(dateRecords.records)
  return dateRecords
}



function WorkerRecordsFabric(countOfPeriods) {
  const workerRecords = []
  for (const name of WORKER_NAMES) {
    const record = new WorkerRecord({ name, dateRecords: dateRecordsFabric(countOfPeriods) })
    workerRecords.push(record)
  }
  return new WorkerRecords(workerRecords)
}









const workerRecords = WorkerRecordsFabric( Math.floor(PERIOD_DATES.length * 0.15) )


// unifyPeriodsByDates(workerRecords.records)


export { workerRecords }



// helpers 
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
function getUnicDateRecords(dateRecords) {
  const res = []
  for (const rec of dateRecords) {
    const dateStamp = rec.date.getTime()
    res.includes(dateStamp ) ? false : (res.push(rec), res.push(dateStamp) )
  }
  return res
}