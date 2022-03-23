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
        ? workerRecords.find(wr => wr.id == workerId ) 
        : state._workerRecords.find(wr => wr.id == workerId)
    ),
    findDateRecord: (state, getters) => ({dateRecords, workerId, date}) => {
      const dateRecs = dateRecords 
        ? dateRecords
        : getters._workerRecords.find(wr => wr.id == workerId).dateRecords
        
      return dateRecs.find( dr => dr.date.getTime() == date )
    },

    // records initialization
    createWorkerRecord: () => ({workerName, workerRecords = []}) => ({workerName, workerRecords}),
    createDateRecord: (state) => ({dateType, date}) => ({
      id: state.lastDateRecordId,
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
      state.lastWorkerRecordId = lastWorkerRecord.id
      const dateRecords = lastWorkerRecord.dateRecords
      state.lastDateRecordId = dateRecords[dateRecords.length - 1].id
    },
    
    //* recordsApi api 
    // TODO: add/remove + Record/s () ...Array.isArray(item) ? item : [item]
    // TODO: unified updateRecord({record: {}, props: {workerName/dateType, } })  // for in
    // worker
    addWorkerRecord: (state, workerRecord) => state._workerRecords.push(workerRecord),
    removeWorkerRecords: (state, {workerRecordsToRemove}) => {
      state._workerRecords = state._workerRecords.filter(wr => !workerRecordsToRemove.includes(wr) )
    },
    updateWorkerRecord: (state, {workerRecord, workerName} ) => {
      workerRecord.savedValue ??= {}
      workerRecord.savedValue.workerName = workerRecord.workerName
      workerRecord.workerName = workerName
      workerRecord.isUpdated = true
    },
    
    // date
    addDateRecord: (state, {dateRecords, dateRecord}) => dateRecords.push(dateRecord),
    removeDateRecord: (state, {workerRecord, dateRecord}) => {
      workerRecord.dateRecords = workerRecord.dateRecords.filter(dr => !dateRecord)
    },
    updateDateRecord: (state, {dateRecord, dateType}) => {
      dateRecord.savedValue ??= {}
      dateRecord.savedValue.dateType = dateRecord.dateType 
      dateRecord.dateType = dateType
      dateRecord.isUpdated = true
    },


    //* Save and revoke 
    // dateRecords
    saveUpdatedWorkerRecord: (state, workerRecord) => {
      delete workerRecord.savedValue
      delete workerRecord.isNew
      delete workerRecord.isUpdated
    }, 
    saveNewWorkerRecord: (state, workerRecord) => delete workerRecord.isNew, 
    
    revokeWorkerRecordUpdate: (state, workerRecord) => {
      workerRecord.workerName = workerRecord.savedValue.workerName
      delete workerRecord.isNew
      delete workerRecord.isUpdated
    },
    deleteNewWorkerRecords: (state) => state._workerRecords = state._workerRecords.filter(wr => !wr.isNew), 

    // dateRecords
    saveUpdatedDateRecord: (state, dateRecord) => {
      delete dateRecord.savedValue
      delete dateRecord.isNew
      delete dateRecord.isUpdated
    }, 
    saveNewDateRecord: (state, dateRecord) => delete dateRecord.isNew, 
    
    revokeDateRecordUpdate: (state, dateRecord) => {
      dateRecord.dateType = dateRecord.savedValue.dateType
      delete dateRecord.isNew
      delete dateRecord.isUpdated
    },

    //? very strange case: passing 'wr' and accessing wr.dateRecrods
    //? enables mutations rather than passing wr.dateRecords directly
    deleteNewDateRecords: (state, wr) => wr.dateRecords = wr.dateRecords.filter(dr => !dr.isNew), 

    //* record initialization
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
    
    
    // app state api
    addWorkerRecord: ({getters, commit}, {workerName}) => {
      commit('incWorkerRecordId')
      const newWorkerRecord = getters.createWorkerRecord({workerName})
      commit('addWorkerRecord', {workerRecord: newWorkerRecord})
    },

    updateDateRecords: {
      root: true,
      handler: ({getters, commit, dispatch}, {dateType, cellsOptions}) => {
        cellsOptions.forEach( ({workerId, date}) => {
          const dateRecords = getters.findWorkerRecord({workerId}).dateRecords
          const foundDateRecord = getters.findDateRecord({dateRecords, date})
          
          foundDateRecord
            ? commit('updateDateRecord', {dateRecord: foundDateRecord, dateType})
            : dispatch('addDateRecord', {dateRecords, dateType, date})
        })
      },
    },
    addDateRecord: ({getters, commit}, {dateRecords, date, dateType}) => {
      commit('incDateRecordId')
      const newDateRecord = getters.createDateRecord({date, dateType})
      commit('addDateRecord', {dateRecords, dateRecord: newDateRecord})
    },


    //* save and revoke changes
    _affectChanges: ({state, dispatch}, {operation}) => {
      state._workerRecords.forEach(wr => {
        dispatch(operation + 'WorkerRecordChanges', {workerRecord: wr})
        wr.dateRecords.forEach(dr => dispatch(operation + 'DateRecordChanges', {dateRecord: dr}) )
      })
    },
    saveChanges: ({dispatch}) => dispatch('_affectChanges', {operation: 'save'}),
    revokeChanges: ({dispatch}) => dispatch('_affectChanges', {operation: 'revoke'}),


    saveWorkerRecordChanges: ({commit}, {workerRecord}) => {
      commit('saveNewWorkerRecord', workerRecord)
    },
    revokeWorkerRecordChanges: ({commit}, {workerRecord}) => {
      commit('deleteNewDateRecords', workerRecord)
    },
    saveDateRecordChanges: ({commit}, {dateRecord}) => {
      if (dateRecord.isUpdated) commit('saveUpdatedDateRecord', dateRecord)
      if (dateRecord.isNew) commit('saveNewDateRecord', dateRecord)
    },
    revokeDateRecordChanges: ({commit}, {dateRecord}) => {
      if (dateRecord.isUpdated) commit('revokeDateRecordUpdate', dateRecord)
    },
    
    
    // App initialization
    validateWorkerRecords: ({state, dispatch, commit}, workerRecords) => {
      const repsOfWorkerId = getReps(workerRecords, 'id')
      
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

    //* debug
    showDateRecord: ({getters}, evnt) => {
      const target = evnt.target
      if (!target.classList.contains('cell') ) return

      const date = target.dataset.date
      const workerId = target.dataset.workerId

      const dr = getters.findDateRecord({workerId, date})
      console.log(dr)
    }
  },
}