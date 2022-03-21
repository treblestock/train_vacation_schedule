const DIVISIONS = {
  topManagment: 'топ менеджмент',
  sales: 'продажи',
  marketing: 'маркетинг',
  accounting: 'бухгалтерия',
  developers: 'разработчики',
}

const MONTHS = {
  january: 'Январь',
  february: 'Февраль',
  march: 'Март',
  april: 'Апрель',
  may: 'Май',
  june: 'Июнь',
  july: 'Июль',
  august: 'Август',
  september: 'Сентябрь',
  october: 'Октябрь',
  november: 'Ноябрь',
  december: 'Декабрь',
}


const NEW_DATE_RECORD_FORM_DATE_TYPES = {
  illness: 'Больничный',
  vacation: 'Отпуск',
}


const DATE_TYPES = Object.assign({}, {all: 'Все'}, NEW_DATE_RECORD_FORM_DATE_TYPES)


export {
  DIVISIONS,
  
  MONTHS,
  DATE_TYPES,
  NEW_DATE_RECORD_FORM_DATE_TYPES,
}