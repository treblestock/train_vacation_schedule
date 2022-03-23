const {DATE_TYPES, WORKER_NAMES} = require('./mochConstants')


class WorkerRecord {
  static currentId = 0
  constructor({ name, dateRecords }) {
    this.id = ++WorkerRecord.currentId
    this.name = name
    this.dateRecords = dateRecords
  }
}


class DateRecord {
  static currentId = 0

  constructor({ date, dateType, isNew = true, isProven = true }) {
    this.id = ++DateRecord.currentId
    this.date = date
    this.dateType = dateType
    this.isNew = isNew
    this.isProven = isProven
  }
}





const getRandom = (from, to) => from + Math.floor(Math.random() * ++to )
const getRandomProp = arr => arr[getRandom(0, (arr.length - 1) )]




const periodsFabric = () => {
  const periods = []
  let currentDate = 1
  let currentEnd = getRandom(1, 14)
  let currentType = getRandomProp(DATE_TYPES)

  for (; currentDate < 366; currentDate++) {
    if (currentDate > currentEnd) {
      currentDate += getRandom(1, 14)
      currentEnd = currentDate + getRandom(1, 14)
      currentType = getRandomProp(DATE_TYPES)
    } 
    if (currentDate > 365) break
    periods.push( {date: currentDate, dateType: currentType })
    
  }
  return periods
}

const toDate = date => new Date(Date.UTC(2021, 0, date) )
const mapToDate = dateRecords => (dateRecords.forEach(rec => rec.date = toDate(rec.date) ), dateRecords)

const validDate = date => (date.getFullYear() != 2021) ? false : true
const mapValid = dateRecords => dateRecords.filter(rec => validDate(rec.date) )


const periodsToDateRecrodOptions = dateRecords => mapValid(mapToDate(dateRecords) )
const mapToDateRecords = dateRecordOptions =>  dateRecordOptions.map(options => new DateRecord(options))

const dateRecordsFabric = () => {
  const periods = periodsFabric()
  const dateRecordOptions = periodsToDateRecrodOptions(periods)

  const dateRecords = mapToDateRecords(dateRecordOptions)
  return dateRecords
}

const workerRecordsFabric = () => {
  const workerRecords = WORKER_NAMES.map(name => new WorkerRecord({
    name,
    dateRecords: dateRecordsFabric(),
  }))
  return workerRecords
}

const workerRecords = workerRecordsFabric()

const serialize = nonPrimitive => JSON.stringify(nonPrimitive)
const deserialize = string => JSON.parse(string)

const transferDate = model => deserialize(serialize(model) )



module.exports = 
{
  // Jest tests
  DATE_TYPES,

  WorkerRecord,
  DateRecord,

  periodsFabric,

  periodsToDateRecrodOptions,

  mapToDateRecords,

  dateRecordsFabric,
  workerRecordsFabric,

  transferDate,

  // Moch data export
  workerRecords,
}
