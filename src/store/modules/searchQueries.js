import { 
  DIVISIONS, 
  MONTHS,
  DATE_TYPES,
  NEW_DATE_RECORD_FORM_DATE_TYPES
} from '@/database/index.js'
import { getMonthDates, monthNumber } from '../../helpers'

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
    searchDivisions: [],
  }), 
  getters: {
    // state dublicates
    DIVISIONS: (state) => state.DIVISIONS,
    MONTHS: (state) => state.MONTHS,
    DATE_TYPES: (state) => state.DATE_TYPES,
    NEW_DATE_RECORD_FORM_DATE_TYPES: (state) => state.NEW_DATE_RECORD_FORM_DATE_TYPES,

    searchMonth: (state) => state.searchMonth,
    searchDateType: (state) => state.searchDateType,
    searchDivisions: (state) => state.searchDivisions,
    
    // 
    datesInCurrentMonth: (state) => getMonthDates(state.searchMonth),

    // * workerRecords
    // workerRecords modifications (filters, sorts, formatting)
    
    // public workerRecords  (prepeared for represantation)
    workerRecords: (_, getters) => (workerRecords) => {
      let p = workerRecords
      p = getters.searchDivisions.includes('all') || !getters.searchDivisions.length
        ? workerRecords : getters.filterWorkerRecordsByDivisions(workerRecords) 
      return p
    },
    
    
    
    // * dateRecords
    // dateRecords modifications (filters, sorts, formatting)
    filterWorkerRecordsByDivisions: (_, getters) => (workerRecords) => (
      workerRecords.filter(wr => getters.searchDivisions.includes(wr.division) )
    ),

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
    setSearchDivisions: (state, divisions) => state.searchDivisions = divisions,
    setSearchMonth: (state, newMonth) => state.searchMonth = newMonth,
    setSearchDateType: (state, dateType) => state.searchDateType = dateType,
  },
  actions: {
    updateSearchDivisions: ({getters, commit}, evnt) => {
      const divisions = [...evnt].map(option => option.value)
      commit('setSearchDivisions', divisions)
      console.log(getters.searchDivisions)
    },
    updateSearchMonth: ({commit}, evnt) => {
      evnt = evnt.isTrusted ? evnt.target.selectedOptions[0].value : evnt
      commit('setSearchMonth', evnt)
    },
    updateSearchDateType: ({commit}, evnt) => {
      evnt = evnt.isTrusted ? evnt.target.selectedOptions[0].value : evnt
      commit('setSearchDateType', evnt)
    },
  },
}