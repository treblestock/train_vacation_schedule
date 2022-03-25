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
        : state._workerRecords.find(wr => wr.id == workerId && !wr.isRemoved)
    ),
    findDateRecord: (state, getters) => ({dateRecords, workerId, date}) => {
      const dateRecs = dateRecords 
        ? dateRecords
        : getters._workerRecords.find(wr => wr.id == workerId).dateRecords
        
      return dateRecs.find( dr => dr.date.getTime() == date && !dr.isRemoved)
    },

    // records initialization
    _createWorkerRecord: (state) => ({workerName, division, dateRecords = []}) => ({
      id: state.lastWorkerRecordId,
      workerName,
      division,
      dateRecords,
      isNew: true,
      isProven: false,
    }),
    _createDateRecord: (state) => ({dateType, date}) => ({
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
    _addWorkerRecord: (state, {workerRecord}) => state._workerRecords.push(workerRecord),
    _updateWorkerRecord: (state, {workerRecord, workerName} ) => {
      workerRecord.savedValue ??= {}
      workerRecord.savedValue.workerName = workerRecord.workerName
      workerRecord.workerName = workerName
      workerRecord.isUpdated = true
    },
    _removeWorkerRecord: (state, {workerRecord}) => workerRecord.isRemoved = true,
    
    // date
    _addDateRecord: (state, {dateRecords, dateRecord}) => dateRecords.push(dateRecord),
    _updateDateRecord: (state, {dateRecord, dateType}) => {
      dateRecord.savedValue ??= {}
      dateRecord.savedValue.dateType = dateRecord.dateType 
      dateRecord.dateType = dateType
      dateRecord.isUpdated = true
    },
    _removeDateRecord: (state, {dateRecord}) => dateRecord.isRemoved = true,

    
    
    //* Save and revoke 
    // save
    _saveRemovingWorkerRecords: (state) => {
      state._workerRecords = state._workerRecords.filter(wr => !wr.isRemoved )
    },
    // wr
    _saveUpdateWorkerRecord: (state, workerRecord) => {
      delete workerRecord.savedValue
      delete workerRecord.isNew
      delete workerRecord.isUpdated
    }, 
    _saveNewWorkerRecord: (state, {workerRecord}) => delete workerRecord.isNew, 
    _saveRemovingDateRecords: (state, {workerRecord}) => {
      workerRecord.dateRecords = workerRecord.dateRecords.filter(dr => !dr.isRemoved)
    },
    // dr
    _saveUpdatedDateRecord: (state, {dateRecord}) => {
      delete dateRecord.savedValue
      delete dateRecord.isNew
      delete dateRecord.isUpdated
    }, 
    _saveNewDateRecord: (state, {dateRecord}) => delete dateRecord.isNew, 
    
    // revoke
    _revokeNewWorkerRecords: (state) => {
      state._workerRecords = state._workerRecords.filter(wr => !wr.isNew)
    }, 
    // wr
    _revokeUpdateWorkerRecord: (state, {workerRecord}) => {
      workerRecord.workerName = workerRecord.savedValue.workerName
      delete workerRecord.isNew
      delete workerRecord.isUpdated
    },
    _revokeRemovingWorkerRecord: (state, {workerRecord}) => {
      workerRecord.isRemoved ? delete workerRecord.isRemoved : false
    },
    _revokeNewDateRecords: (state, {workerRecord}) => {
      workerRecord.dateRecords = workerRecord.dateRecords.filter(dr => !dr.isNew)
    }, 
    // dr
    _revokeRemovingDateRecord: (state, {dateRecord}) => {
      dateRecord.isRemoved ? delete dateRecord.isRemoved : false
    },
    _revokeUpdateDateRecord: (state, {dateRecord}) => {
      dateRecord.dateType = dateRecord.savedValue.dateType
      delete dateRecord.isNew
      delete dateRecord.isUpdated
    },

    //* record initialization
    _incWorkerRecordId: (state) => state.lastWorkerRecordId++,
    _incDateRecordId: (state) => state.lastDateRecordId++,    
  },
  actions: {
    removeDateRecords: {
      root: true,
      handler({getters, commit}, {cellsOptions}) {
        cellsOptions.forEach( ({workerId, date}) => {
          const foundDateRecord = getters.findDateRecord({workerId, date}) 
          if (foundDateRecord) commit('_removeDateRecord', {dateRecord: foundDateRecord})
        })
      },
    },
    
    removeWorkerRecord: {
      root: true,
      handler({getters, commit}, {workerId}) {
        const workerRecordToRemove = getters.findWorkerRecord({workerId})
        commit('_removeWorkerRecord', {workerRecord: workerRecordToRemove} )
      },
    },
    addWorkerRecord: {
      root: true,
      handler({dispatch}, {workerName, division}) {
        dispatch('_addWorkerRecord', {workerName, division})
      },
    },

    _addWorkerRecord: ({getters, commit}, {workerName, division}) => {
      commit('_incWorkerRecordId')
      const newWorkerRecord = getters._createWorkerRecord({workerName, division})
      commit('_addWorkerRecord', {workerRecord: newWorkerRecord})
    },

    updateDateRecords: {
      root: true,
      handler: ({getters, commit, dispatch}, {dateType, cellsOptions}) => {
        cellsOptions.forEach( ({workerId, date}) => {
          const dateRecords = getters.findWorkerRecord({workerId}).dateRecords
          const foundDateRecord = getters.findDateRecord({dateRecords, date})
          
          foundDateRecord
            ? commit('_updateDateRecord', {dateRecord: foundDateRecord, dateType})
            : dispatch('_addDateRecord', {dateRecords, dateType, date})
        })
      },
    },
    _addDateRecord: ({getters, commit}, {dateRecords, date, dateType}) => {
      commit('_incDateRecordId')
      const newDateRecord = getters._createDateRecord({date, dateType})
      commit('_addDateRecord', {dateRecords, dateRecord: newDateRecord})
    },


    //* save and revoke changes
    _affectChanges: ({state, dispatch}, {operation}) => {
      dispatch(operation + 'WorkerRecordsChanges')
      state._workerRecords.forEach(wr => {
        dispatch(operation + 'WorkerRecordChanges', {workerRecord: wr})
        wr.dateRecords.forEach(dr => dispatch(operation + 'DateRecordChanges', {dateRecord: dr}) )
      })
    },
    saveChanges: ({dispatch}) => dispatch('_affectChanges', {operation: '_save'}),
    revokeChanges: ({dispatch}) => dispatch('_affectChanges', {operation: '_revoke'}),



    _saveWorkerRecordsChanges: ({commit}) => {
      commit('_saveRemovingWorkerRecords')
    },
    _revokeWorkerRecordsChanges: ({commit}) => {
      commit('_revokeNewWorkerRecords')
    },

    _saveWorkerRecordChanges: ({commit}, {workerRecord}) => {
      if (workerRecord.isUpdated) commit('_saveUpdateWorkerRecord', {workerRecord})
      if (workerRecord.isNew) commit('_saveNewWorkerRecord', {workerRecord})
      commit('_saveRemovingDateRecords', {workerRecord})
    },
    _revokeWorkerRecordChanges: ({commit}, {workerRecord}) => {
      if (workerRecord.isUpdated) commit('_revokeUpdateWorkerRecord', {workerRecord})
      if (workerRecord.isRemoved) commit('_revokeRemovingWorkerRecord', {workerRecord})
      commit('_revokeNewDateRecords', {workerRecord})
    },

    _saveDateRecordChanges: ({commit}, {dateRecord}) => {
      if (dateRecord.isUpdated) commit('_saveUpdatedDateRecord', {dateRecord})
      if (dateRecord.isNew) commit('_saveNewDateRecord', {dateRecord})
    },
    _revokeDateRecordChanges: ({commit}, {dateRecord}) => {
      if (dateRecord.isUpdated) commit('_revokeUpdateDateRecord', {dateRecord})
      if (dateRecord.isRemoved) commit('_revokeRemovingDateRecord', {dateRecord})
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