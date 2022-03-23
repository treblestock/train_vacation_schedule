const {
  DATE_TYPES,

  WorkerRecord,
  DateRecord,

  periodsFabric,
  periodsToDateRecrodOptions,
  mapToDateRecords,
  
  dateRecordsFabric,
  workerRecordsFabric,

  transferDate,
} = require('../workerRecordsGenerator.js')

// describe('periodsFabric', () => {
//   for (let i = 0; i < 200; i++) {
//     const periods = periodsFabric()
//     test('valid prop values in records', () => {
  
//       periods.forEach(rec => {
//         expect(rec.date).not.toBeGreaterThan(365)
//         expect(rec.date).not.toBeLessThan(1)

//         expect(DATE_TYPES).not.toEqual(expect.arrayContaining([rec.date]) )
//       })
//     })

//     test('Unic records by date', () => {
//       const counts = periods.reduce((counts, rec) => (counts[rec] ? counts[rec]++ : counts[rec] = 1, counts), {})

//       Object.values(counts).every(count => count == 1)
//     }) 
//   }
// })


// describe('periodsToDateRecrodOptions', () => {
//   for (let i = 0; i < 1; i++) {
    
//     const periods = periodsFabric()
//     const dateRecordOptions = periodsToDateRecrodOptions(periods)
    
//     dateRecordOptions.forEach(rec => {
//       test('valid prop values', () => {
//         expect(rec.date).toBeInstanceOf(Date)
//         expect(rec.date.getFullYear() ).toBe(2021)
  
//         expect(DATE_TYPES).toEqual(expect.arrayContaining([rec.dateType]) )
//       })
//     })

//     test('unic dates in workerRecords', () => {
//       const counts = dateRecordOptions.reduce((counts, rec) => (counts[rec.date.getTime()] ? counts[rec.date.getTime()]++ : counts[rec.date.getTime()] = 1, counts), {})
//       const bool = Object.values(counts).every(count => count == 1)
//       expect(bool).toBe(true)
//     })
//   }
// })

// describe('mapToDateRecords', () => {
//   const periods = periodsFabric()
//   const dateRecordOptions = periodsToDateRecrodOptions(periods)
//   const dateRecords = mapToDateRecords(dateRecordOptions)


//   dateRecords.forEach(rec => {
//     test('valid properties of DateRecord instance', () => {
//       expect(rec).toHaveProperty('id',)
//       expect(rec).toHaveProperty('date',)
//       expect(rec).toHaveProperty('dateType',)
//       expect(rec).toHaveProperty('isNew',)
//       expect(rec).toHaveProperty('isProven',)
  
//       expect(rec).toBeInstanceOf(DateRecord)
//       expect(rec.id).not.toBeLessThan(1)
//       expect(rec.id).toBe(Math.floor(rec.id) )
//     })
//   })
// })

// describe('dateRecordsFabric', () => {
//   const dateRecords = dateRecordsFabric()

//   dateRecords.forEach(rec => {
//     test('valid properties of DateRecord instance', () => {
//       expect(rec).toHaveProperty('id',)
//       expect(rec).toHaveProperty('date',)
//       expect(rec).toHaveProperty('dateType',)
//       expect(rec).toHaveProperty('isNew',)
//       expect(rec).toHaveProperty('isProven',)

//       expect(rec).toBeInstanceOf(DateRecord)
//       expect(rec.id).not.toBeLessThan(1)
//       expect(rec.id).toBe(Math.floor(rec.id) )
//     })
//   })
// })

// describe('workerRecordsFabric', () => {
//   const workerRecordsArr = workerRecordsFabric()
//   workerRecordsArr.forEach(rec => {
//     test('valid initialization', () => {
//       expect(rec).toHaveProperty('id')
//       expect(rec).toHaveProperty('name')
//       expect(rec).toHaveProperty('dateRecords')

//       expect(rec).toBeInstanceOf(WorkerRecord)
//       expect(rec.id).not.toBeLessThan(1)
//       expect(rec.id).toBe(Math.floor(rec.id) )
//     })

//     test('unic dates in workerRecords', () => {
//       const counts = rec.dateRecords.reduce((counts, rec) => (counts[rec.date.getTime()] ? counts[rec.date.getTime()]++ : counts[rec.date.getTime()] = 1, counts), {})
//       const bool = Object.values(counts).every(count => count == 1)
//       expect(bool).toBe(true)
//     })
//   })

  
//   test('unic worker id ', () => {
//     const counts = workerRecordsArr.reduce((counts, rec) => (counts[rec.id] ? counts[rec.id]++ : counts[rec.id] = 1, counts), {})
//     const bool = Object.values(counts).every(count => count == 1)
//     expect(bool).toBe(true)
//   })
// })



// describe('deserialize(serialize() ', () => {
  
//   test('check on data', () => {
//     let data = [{
//       name: 'carl',
//       age: 23,
//       address: {
//         city: 'Paris',
//       },
//       nonth: () => 'steri',
//       dist() {
//         false
//       },
//       dist: function() {
//         false
//       },
//       [Symbol('id') ]: 12,
//     },
//   {dog: 'dog',}]

//     expect(transferDate(data) ).toEqual([{
//       name: 'carl',
//       age: 23,
//       address: {
//         city: 'Paris',
//       },
//     },
//   {dog: 'dog',}])
//   })
// })

// //* equal except Date instances but equal dateStamp
// describe('Imitation of: DataBase.send(JSON) -> Client.recieve(JSON) -> Client.parse(JSON) ', () => {
//   const workerRecordsArr = workerRecordsFabric()

//   test('deserialize(serialize() )', () => {
//     expect(transferDate(workerRecordsArr) ).toEqual(workerRecordsArr)
//   })
// })