import { getReps } from "../../helpers"
import { monthNumber } from "../../helpers"

export default {
  modules: {
    
  },
  
  
  state: () => ({
    workerRecords: [],
  }),
  getters: {
    // state copy
    workerRecords: (state, getters) => state.workerRecords,


    // 
    findWorkerRecordGlobal:(state, getters) => workerId => getters.workerRecords.find(wr => wr._id == workerId),
    findDateRecordGlobal: (state, getters) => ({workerId, date }) => {
      const wr = getters.workerRecords.find(wr => wr._id == workerId)
      return wr.dateRecords.find( dr => dr.date.getTime() == date )
    },

    findFilteredDateRecordLocal: (state, getters) => ({dateRecords, date }) => {
      return dateRecords.find( dr => dr.date.getTime() == date )
    },


  },
  mutations: {
    replaceWorkerRecords: (state, newWorkerRecords) => state.workerRecords = newWorkerRecords,
  },
  actions: {
    // STORE PARTS INTERACTION:
    // remove/find -> *elem exists* -> *id exists*
    // add === find + insert
    // create( {options} )
    // Create -> add (find(), created) ->

    // INNER REALIZATION
    // Creation elements implies uid, so there should be constructor and curren uid

    // API FOR VUE COMPONENTS:
    // Creation of a record is senseless by itself:
    //  (it may exists in application only being integrated in the state)
    //  So, every time: create(opitons) -> add(created) 
    // 

    // arrays api 
    addWorkerRecord: ({getters, dispatch}, {workerRecord}) => {},
    removeWorkerRecord: ({getters, dispatch}, {workerId}) => {},

    addDateRecord: ({getters, dispatch}, {workerId, dateRecord}) => {},
    removeDateRecord: ({getters, dispatch}, {workerId, dateId}) => {},

    // instances api (records)
    createWorkerRecord: ({getters, dispatch}, {workerOptions}) => {},
    createDateRecord: ({getters, dispatch}, {deteOptions}) => {},
    
    updateWorkerRecord: ({getters, dispatch}, {prop, newVaue}) => {},
    updateDateRecord: ({getters, dispatch}, {prop, newVaue}) => {}, // update dateType

    // API
    validateWorkerRecords: ({state, dispatch}, workerRecords) => {
      const repsOfWorkerId = dispatch('getReps', {
        arr: workerRecords,
        prop: '_id'
      })
      if(repsOfWorkerId.length) {
        console.log(repsOfWorkerId)
        throw new Error('non non-unic worker IDs')
      }

      for (const wRec of workerRecords) {
        const repsOfDate = dispatch('getReps', {
          arr: wRec.dateRecords, 
          prop: 'date'
        })
        if(repsOfDate.length) {
          console.log(repsOfDate)
          throw new Error('non non-unic worker IDs')
        }

        for (const dRec of wRec.dateRecords) {
          dRec.date = new Date(dRec.date)
          dRec.date.setHours(0)
        }
      }
    },

    
    // helpers
    datestampToStringFormat: (ctx, datestamp) => {
      const date = new Date(datestamp)
      return '' + date.getDate() + (date.getMonth() + 1)
    },
    workerIdToName: ({}, workerId) => {

    },
    getReps: (ctx, {arr, prop}) => getReps(arr, prop),
  },
}