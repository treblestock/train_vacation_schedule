import { 
  DIVISIONS, 
  MONTHS,
  DATE_TYPES,
  NEW_DATE_RECORD_FORM_DATE_TYPES
} from '@/database/index.js'
import { getMonthDates, monthNumber } from '../../helpers'
console.log(NEW_DATE_RECORD_FORM_DATE_TYPES)

export default {
  modules: {
    
  },
  
  
  state: () => ({
    DIVISIONS,
    MONTHS,
    DATE_TYPES,
    NEW_DATE_RECORD_FORM_DATE_TYPES,

    searchMonth: 'january',
    searchDateType: 'all',
  }), 
  getters: {
    // state dublicates
    DIVISIONS: (state) => state.DIVISIONS,
    MONTHS: (state) => state.MONTHS,
    DATE_TYPES: (state) => state.DATE_TYPES,
    NEW_DATE_RECORD_FORM_DATE_TYPES: (state) => state.NEW_DATE_RECORD_FORM_DATE_TYPES,

    searchMonth: (state) => state.searchMonth,
    searchDateType: (state) => state.searchDateType,
    
    // 
    datesInCurrentMonth: (state) => getMonthDates(state.searchMonth),

    // * workerRecords
    // workerRecords modifications (filters, sorts, formatting)
    
    // public workerRecords  (prepeared for represantation)
    workerRecords: (_, getters) => (workerRecords) => {
      let p = workerRecords
      return p
    },
    
    
    
    // * dateRecords
    // dateRecords modifications (filters, sorts, formatting)
    filterDateRecordsByDateType: (_, getters) => (dateRecords) => (
      dateRecords.filter(dr => dr.dateType == getters.searchDateType)
    ),
    filterDateRecordsByMonth: (_, getters) => (dateRecords) => (
      dateRecords.filter(dr => dr.date.getMonth() == monthNumber[getters.searchMonth] ) 
    ),

    // public dateRecords  (prepeared for represantation)
    dateRecords: (state, getters,) => dateRecords => {
      let p = dateRecords
      p = getters.searchMonth             ? getters.filterDateRecordsByMonth(p) : p
      p = getters.searchDateType != 'all' ? getters.filterDateRecordsByDateType(p) : p
      return p
    },
  },
  mutations: {
    setSearchMonth: (state, newMonth) => state.searchMonth = newMonth,
    setSearchDateType: (state, newDateType) => state.searchDateType = newDateType,
  },
  actions: {
    updateSearchMonth: ({commit}, evnt) => {
      commit('setSearchMonth', evnt.target.selectedOptions[0].value)
    },
    updateSearchDateType: ({commit}, evnt) => {
      commit('setSearchDateType', evnt.target.selectedOptions[0].value)
    },
  },
}