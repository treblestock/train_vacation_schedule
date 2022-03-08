function toDateArray(period, workerId) {
  const res = []
  const periodDatesString = period.dates
  const [startString, endString] = periodDatesString.split('-')

  const endDate = toDateObject(endString)
  let dayNumber = startString.split('.')[0]
  let monthNumber = startString.split('.')[1] - 1

  while (true) {
    let newDate = new Date(2021, monthNumber, dayNumber++)
    res.push({
      date: newDate,
      dateType: period.type,
      isNew: period.isNew,
      isProven: period.isProven,
      workerId,
    })
    if (newDate.getTime() == endDate.getTime() ) break
  }
  
  return res
} 
function toDateObject(dateStr) {
  const [day, month] = dateStr.split('.')
  return new Date(2021, (month - 1), day )
}



function toStringFormat(dateObj) {
  return dateObj.getDate() + '.' + (dateObj.getMonth + 1)
}




const monthNumber = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}



function getMonthDates(monthNumber, dates = [], day = 1) {
  const newDate = new Date(2021, monthNumber, day++)

  if (newDate.getMonth() !== monthNumber) {
    return dates
  }

  dates.push(newDate)
  return getMonthDates(monthNumber, dates, day)
}


export {
  toDateArray,
  toStringFormat,
  monthNumber,
  getMonthDates,
}