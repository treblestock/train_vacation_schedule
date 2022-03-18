import { PERIOD_TYPES, MONTHS } from '@/database/index.js'
import { getMonthDates, monthNumber } from '../../helpers'

export default {
  modules: {
    
  },
  
  
  state: () => ({
    searchMonth: 'january',
    searchDateType: 'all',
    PERIOD_TYPES: PERIOD_TYPES,
    MONTHS: MONTHS,
  }), 
  getters: {
    searchMonth: (state) => state.searchMonth,
    searchDateType: (state) => state.searchDateType,
    PERIOD_TYPES: (state) => state.PERIOD_TYPES,
    MONTHS: (state) => state.MONTHS,
    
    datesInCurrentMonth: (state) => getMonthDates(state.searchMonth),

    dateRecordsFilteredByDateType: (state, getters) => ({dateRecords, dateType}) => (
      dateRecords.filter(dr => dr.dateType == dateType)
    ),
    dateRecordsFilteredByMonth: (state, getters) => ({dateRecords, month}) => (
      dateRecords.filter(dr => dr.date.getMonth() == monthNumber[month] ) 
    ),
    filteredDateRecords: (state, getters) => dateRecords => {
      const filteredByMonth = getters.searchMonth  ? getters.dateRecordsFilteredByMonth({ 
        dateRecords: dateRecords,
        month: getters.searchMonth,
      }) : (console.log('here'), dateRecords )

      const filteredByDateType = getters.searchDateType != 'all' ? getters.dateRecordsFilteredByDateType({ 
        dateRecords: filteredByMonth,
        dateType: getters.searchDateType,
      }) : filteredByMonth
      
      return filteredByDateType
    },
  },
  mutations: {
    updateSearchMonth: (state, newMonth) => state.searchMonth = newMonth,
    updateSearchDateType: (state, newDateType) => state.searchDateType = newDateType,
  },
  actions: {
    updateSearchMonth: ({commit}, evnt) => {
      commit('updateSearchMonth', evnt.target.selectedOptions[0].value)
    },
    updateSearchDateType: ({commit}, evnt) => {
      commit('updateSearchDateType', evnt.target.selectedOptions[0].value)
    },
  },
}