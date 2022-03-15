const fs = require('fs')
const path = require('path')
const { workerRecords } = require('./workerRecordsGenerator')



let filePath = path.resolve('..','workerRecords.js')

data = `const workerRecords = ${JSON.stringify(workerRecords)}

export { worekerRecords }`

fs.writeFileSync(filePath, data)