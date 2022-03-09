import { WORKER_NAMES, PERIOD_DATES, PERIOD_TYPES } from "./constants.js"
import { unifyPeriodsByDates } from "../../../helpers/mockData.js"
// const { WORKER_NAMES, PERIOD_DATES, PERIOD_TYPES } = require("./constants.js")
const getRandom = (from = 0, to) => from + Math.floor(Math.random() * (to + 1) )



const periodExample = {
  dates: '12.03-14.08',
  type: 'illnesss',
  isNew: false,
  isProved: false,
}

const workersExample = [
  {
    name: 'Vasiliy Petrovich',
    _id: '',
    periods: ['period'],
  },
]





class Period {
  constructor({ dates, type, isNew, isProven }) {
    this.dates = dates
    this.type = type
    this.isNew = isNew
    this.isProven = isProven
  }
}
class WorkerRecord {
  static currentId = 0
  constructor({ name, periods }) {
    this._id = ++WorkerRecord.currentId
    this.name = name
    this.periods = periods
  }
}
class WorkerRecordsBase {
  constructor(records) {
    this.records = records
  }
  addWorkerRecord(workerRecord) {
    this.records.push(workerRecord)
  }
  rmWorkerRecord(workerRecord) {
    this.records.filter(rec => rec !== workerRecord)
  }
  findWorkerRecord(workerId) {
    return this.records.find(rec => rec._id == workerId)
  }
  addDateRecord(dateRecord, workerId) {
    const wRecord = this.findWorkerRecord(workerId)
    wRecord.push(dateRecord)
  }
  rmDateRecord(dateRecord, workerId) {
    const wRecord = this.findWorkerRecord(workerId)
    wRecord.filter(rec => rec !== dateRecord)
  }
  findDateRecord(dateStamp, workerId) {
    const wRecord = this.findWorkerRecord(workerId)
    return wRecord.find(rec => rec._id == dateStamp)
  }
}


function PeriodFabric(count = 1) {
  const periods = []
  const unicPeriodParametrs = getSetOfUnicPeriodParametrs(count)

  unicPeriodParametrs.forEach(par => periods.push(new Period(par)))
  return periods
}

function getSetOfUnicPeriodParametrs(maxCount) {
  let datesSet = new Set()
  for (let i = 0; i < maxCount; i++) {
    const period = PERIOD_DATES[getRandom(0, (PERIOD_DATES.length - 1) ) ]
    datesSet.add(period)
  }
  let datesArray = [...datesSet].map(dates => {
    return {
      dates,
      type: PERIOD_TYPES[getRandom(0, (PERIOD_TYPES.length - 1) )],
      isNew: true,  
      isProven: true,
    }
  })
  return datesArray
}

function WorkerRecordFabric(countOfPeriods) {
  const workersRecords = []
  for (const name of WORKER_NAMES) {
    const record = new WorkerRecord({ name, periods: PeriodFabric(countOfPeriods) })
    workersRecords.push(record)
  }
  return new WorkerRecordsBase(workersRecords)
}







const workersRecords = WorkerRecordFabric( Math.floor(PERIOD_DATES.length * 0.1) )
unifyPeriodsByDates(workersRecords.records)



export { workersRecords }



