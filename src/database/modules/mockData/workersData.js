// import { WORKER_NAMES, PERIOD_DATES, PERIOD_TYPES } from "./constants.js"
const { WORKER_NAMES, PERIOD_DATES, PERIOD_TYPES } = require("./constants.js")
const getRandom = (from = 0, to) => from + Math.floor(Math.random() * (to + 1) )



const periodContract = {
  dates: '12.03-14.08',
  type: 'illnesss',
  isNew: false,
  isProved: false,
}

const workersContract = [
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
  constructor({ name, periods }) {
    this._id = Date.now()
    this.name = name
    this.periods = periods
  }
}



function PeriodFabric(count = 1) {
  const periods = []
  for (let i = 0; i < count; i++) {
    const dates = PERIOD_DATES[getRandom(0, (PERIOD_DATES.length - 1) ) ]
    const type = PERIOD_TYPES[getRandom(0, (PERIOD_TYPES.length - 1) ) ]
    const period = new Period({
      dates, 
      type, 
      isNew: false, 
      isProven: true
    })
    periods.push(period)
  }
  return periods
}



function WorkerRecordFabric(countOfPeriods) {
  const workersRecords = []
  for (const name of WORKER_NAMES) {
    const record = new WorkerRecord({ name, periods: PeriodFabric(countOfPeriods) })
    workersRecords.push(record)
  }
  return workersRecords
}

const workersRecords = WorkerRecordFabric( Math.floor(PERIOD_DATES.length * 0.1) )

export { workersRecords }
