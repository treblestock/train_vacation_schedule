import { getReps } from "../../helpers"
import { monthNumber } from "../../helpers"

export default {
  modules: {
    
  },
  
  
  state: () => ({
    _workerRecords: [],

    lastWorkerRecordId: null,
    lastDateRecordId: null,
  }),
  getters: {
    // state getters
    _workerRecords: (state) => state._workerRecords,

    // records api
    findWorkerRecord: (state) => ({workerRecords, workerId}) => (
      workerRecords 
        ? workerRecords.find(wr => wr._id == workerId ) 
        : state._workerRecords.find(wr => wr._id == workerId)
    ),
    findDateRecord: (state, getters) => ({dateRecords, workerId, date}) => {
      const dateRecs = dateRecords 
        ? dateRecords
        : getters._workerRecords.find(wr => wr._id == workerId).dateRecords
        
      return dateRecs.find( dr => dr.date.getTime() == date )
    },

    // records initialization
    createWorkerRecord: () => ({workerName, workerRecords = []}) => ({workerName, workerRecords}),
    createDateRecord: (state) => ({dateType, date}) => ({
      _id: state.lastDateRecordId,
      date: new Date(+date),
      dateType,
      isNew: true,
      isProven: false,
    }),

  },
  mutations: {
    setWorkerRecords: (state, newWorkerRecords) => state._workerRecords = newWorkerRecords,

    setLastWorkerRecordDateRecordIds: (state, workerRecords) => {
      const lastWorkerRecord = workerRecords[workerRecords.length - 1]
      state.lastWorkerRecordId = lastWorkerRecord._id
      const dateRecords = lastWorkerRecord.dateRecords
      state.lastDateRecordId = dateRecords[dateRecords.length - 1]._id
    },
    
    // arrays api 
    addWorkerRecord: (state, arg) => {},
    removeWorkerRecord: (state, arg) => {},
    
    addDateRecord: (state, {dateRecords, dateRecord}) => {
      console.log(dateRecord)
      dateRecords.push(dateRecord)
    },
    removeDateRecord: (state, arg) => {},

    updateWorkerRecord: (state, newProp) => {},
    updateDateRecord: (state, {dateRecord, dateType}) => {
      dateRecord.savedValue = dateRecord.dateType
      dateRecord.dateType = dateType
      dateRecord.isUpdated = true
    },
    
    // records initialization
    incWorkerRecordId: (state) => state.lastWorkerRecordId++,
    incDateRecordId: (state) => state.lastDateRecordId++,
    
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
    updateDateRecords: {
      root: true,
      handler: ({getters, commit, dispatch}, {dateType, cellsOptions}) => {
        cellsOptions.forEach( ({workerId, date}) => {
          const dateRecords = getters.findWorkerRecord({workerId}).dateRecords
          const foundDateRecord = getters.findDateRecord({dateRecords, date})
          
          if (foundDateRecord) {
            commit('updateDateRecord', {dateRecord: foundDateRecord, dateType})
            console.log('foundDateRecord.isUpdated: ', foundDateRecord.isUpdated)
            console.log('foundDateRecord.isNew: ', foundDateRecord.isNew)
            return
          }
          
          dispatch('addDateRecord', {dateRecords, dateType, date})
        })
      },
    },
    addDateRecord: ({getters, commit}, {dateRecords, date, dateType}) => {
      commit('incDateRecordId')
      const newDateRecord = getters.createDateRecord({date, dateType})
      console.log('newDateRecord.isUpdated: ', newDateRecord.isUpdated)
      console.log('newDateRecord.isNew: ', newDateRecord.isNew)
      commit('addDateRecord', {dateRecords, dateRecord: newDateRecord})
    },
    
    
    // API
    validateWorkerRecords: ({state, dispatch, commit}, workerRecords) => {
      const repsOfWorkerId = getReps(workerRecords, '_id')
      
      if(repsOfWorkerId.length) {
        console.log(repsOfWorkerId)
        throw new Error('non non-unic worker IDs')
      }

      for (const wRec of workerRecords) {
        const repsOfDate = getReps(wRec.dateRecords, 'date')
        
        if (repsOfDate.length) {
          console.log(repsOfDate)
          throw new Error('non non-unic worker IDs')
        }

        for (const dRec of wRec.dateRecords) {
          dRec.date = new Date(dRec.date)
          dRec.date.setHours(0)
        }
      }

      commit('setLastWorkerRecordDateRecordIds', workerRecords)
    },

    
  },
}