import { arrAdd, arrDiff, arrMult } from "../../helpers"

export default {
  modules: {
    
  },
  
  
  state: () => ({
    // cells operations
    markedDates: [],
    markedWorkerIds: [],
    
    unmarkedWorkerIds: [],
    unmarkedDates: [],
    
    chozenCells: [],

    isStartHighlighting: false,
    currentOperation: null,

    // new dateRecords or update existing ones form
    isShowNewDateRecordsFormPopup: false,
    newDateRecordsFormOptions: {
      dateType: null,
      cellsOptions: [],
    },

    
  }),
  getters: {
    markedCells: (state, getters) => (
      arrMult(state.markedWorkerIds, state.markedDates)
        .map( ([workerId, date]) => (
          document.querySelector(`[data-worker-id='${workerId}'][data-date='${date}']`) 
    ))),
    unmarkedCells: (state, getters) => (
      arrMult(state.unmarkedWorkerIds, state.unmarkedDates)
        .map( ([workerId, date]) => (
          document.querySelector(`[data-worker-id='${workerId}'][data-date='${date}']`) 
    ))),
    isShowNewDateRecordsFormPopup: (state) => state.isShowNewDateRecordsFormPopup,

    cellsOptionsFromChozenCells: (state, getters) =>  state.chozenCells.map(cell => ({
      workerId: cell.dataset.workerId, 
      date: cell.dataset.date, 
    })),
  },
  mutations: {
    // cells operations
    setIsStartHighlighting: (state, bool) => state.isStartHighlighting = bool,
    clearHiglighted: (state) => state.unmarkedDates.length = state.unmarkedWorkerIds.length =
                                state.markedDates.length = state.markedWorkerIds.length = 0,
    setCurrentOperation: (state, operation) => state.currentOperation = operation ? operation : null,

    chozenCellsSet: (state, cells) => (state.chozenCells = cells ),
    chozenCellsClear: (state) => (state.chozenCells = [] ),
    chozenCellsAdd: (state, cells) => (state.chozenCells = arrAdd(state.chozenCells, cells) ),
    chozenCellsRemove: (state, cells) => (state.chozenCells = arrDiff(state.chozenCells, cells) ),

    // new dateRecords or update existing ones form
    openNewDateRecordsFromPopup: (state) => state.isShowNewDateRecordsFormPopup = true,
    closeNewDateRecordsFromPopup: (state) => state.isShowNewDateRecordsFormPopup = false,


    updateNewDateRecordsFormOptions: (state, newOptions) => Object.assign(state.newDateRecordsFormOptions, newOptions),
  },
  actions: {
    // Mutations
    openNewDateRecordsFromPopup: ({state, commit, dispatch}, evnt) => {
      evnt.target.classList.contains('marked') ? commit('openNewDateRecordsFromPopup') : false
    },
    closeNewDateRecordsFromPopup: () => {},


    // API

    //* Highlight
    startHighlighting: ({commit, dispatch}, {evnt, operation}) => {
      commit('setIsStartHighlighting', true)
      commit('setCurrentOperation', operation)
      dispatch('highlight', evnt)
    },
    stopHighlighting: ({state, commit}) => {
      commit('setIsStartHighlighting', false)
      commit('clearHiglighted')
      commit('setCurrentOperation', null)
    },
    highlight({state, dispatch}, evnt) {
      const currentOperation = state.currentOperation
      if (!state.isStartHighlighting || !currentOperation) return

      if ( evnt.target.id == 'tableHeaderRow' ) dispatch(currentOperation + 'Table')
      
      const date = evnt.target.dataset.date
      const workerId = evnt.target.dataset.workerId
      
      if ( !date && workerId) dispatch(currentOperation + 'WorkerIdLine', workerId) 
      if ( date && !workerId ) dispatch(currentOperation + 'DateLine', date)
      if ( date && workerId ) dispatch(currentOperation + 'Rect', {workerId, date} )
    },
    


    //* Operations with cells 
    markRect({state, getters, commit}, {workerId, date} ) {
      if (!state.markedDates.includes(date) ) state.markedDates.push(date)
      if (!state.markedWorkerIds.includes(workerId) ) state.markedWorkerIds.push(workerId)
      getters.markedCells.forEach(cell => cell.classList.add('marked'))

      commit('chozenCellsAdd', getters.markedCells)
    },
    unmarkRect({state, getters, commit}, {workerId, date}) {
      if (!state.unmarkedDates.includes(date) ) state.unmarkedDates.push(date)
      if (!state.unmarkedWorkerIds.includes(workerId) ) state.unmarkedWorkerIds.push(workerId)
      getters.unmarkedCells.forEach(cell => cell.classList.remove('marked'))

      commit('chozenCellsRemove', getters.markedCells)
    },


    markDateLine({state, getters, commit}, date) {
      const markedDates = document.querySelectorAll(`[data-worker-id][data-date='${date}']`)
      markedDates.forEach(cell => cell.classList.add('marked'))

      commit('chozenCellsAdd', [...markedDates])
    },
    markWorkerIdLine({state, getters, commit}, workerId) {
      const markedWorkerIds = document.querySelectorAll(`[data-worker-id='${workerId}'][data-date]`)
      
      if (!state.markedWorkerIds.includes(workerId) ) state.markedWorkerIds.push(workerId)
      markedWorkerIds.forEach(cell => cell.classList.add('marked'))

      commit('chozenCellsAdd', [...markedWorkerIds])
    },
    unmarkDateLine({state, getters, commit}, date) {
      const unmarkedDates = document.querySelectorAll(`[data-worker-id][data-date='${date}']`)
      unmarkedDates.forEach(cell => cell.classList.remove('marked'))

      commit('chozenCellsRemove', [...unmarkedDates])
    },
    unmarkWorkerIdLine({state, getters, commit}, workerId) {
      const unmarkedWorkerIds = document.querySelectorAll(`[data-worker-id='${workerId}'][data-date]`)
      
      if (!state.unmarkedWorkerIds.includes(workerId) ) state.unmarkedWorkerIds.push(workerId)
      unmarkedWorkerIds.forEach(cell => cell.classList.remove('marked'))

      commit('chozenCellsRemove', [...unmarkedWorkerIds])
    },

  
    markTable({state, getters, commit}) {
      const allcells = document.querySelectorAll(`[data-worker-id][data-date]`)
      allcells.forEach(cell => cell.classList.add('marked'))

      commit('chozenCellsAdd', [...allcells])
    },
    unmarkTable({state, getters, commit}) {
      const allcells = document.querySelectorAll(`[data-worker-id][data-date]`)
      allcells.forEach(cell => cell.classList.remove('marked'))

      commit('chozenCellsClear')
    },
    //  =====================================================================

    //* state-api logic
    createAndMergeNewDateRecords({state, getters, commit, dispatch, rootGetters}, evnt) {
      const form = evnt.target
      const dateType = form.elements.dateType.selectedOptions[0].value
      const cellsOptions = getters.cellsOptionsFromChozenCells

      dispatch('updateDateRecords', {dateType, cellsOptions} )
    },
    
  },
}
// The aim is to provide ability to mark not only one record at a time or a line of worker's records at a time, but to provide ability to mark some rectangle of workerRecords no matter they exist or not (exist -> find, not -> create empty)
// So marking a line or a cell will be a particular case of marking rectangle
// The same concerns unMarking

// markDateInMonth = (date) => markedDates.add(date)
// markWorker = (worker) => markedWorkers.add(worker)
// markedDatesAndWorkers = (markedDates, markedWorkers) => [markedDates X markedWorkers] 
// 
// unmarkDateInMonth = (date) => unmarkedDates.add(date)
// unmarkWorker = (worker) => unmarkedWorkers.add(worker)
// unmarkedDatesAndWorkers = (unmarkedDates, unmarkedWorkers) => [unmarkedDates X unmarkedWorkers] 
// 
// Chozen = Marked1 - Unmarked1 + Marked2
// 
// User.markDates = (Dates, Workers) => [Dates X Workers].forEach(mark)
// User.markDate = (date) =>  { date.isExists ? find(date) -> update(type, 'marked') : createMarked() }
// 
// user.changeType = (chozen, newType) => newType == 'delete' ? records.forEach(remove) : recrods.forEach(changeType() )
// 
// 
// @NATIVE EVENTS
// @mousedown.left       ="currentOperation = 'marking' "
// @mousedown.left.shift ="currentOperation = 'unmarking' "
// @mouseup 1)      ="currentOperation = null "

// @mousemoove="pushingCurrentOperationArray() "

// @mouseup 2)      ="chozen (+= marked / -= unmarked), unmarked/marked = []" 
//  - 1) The idea is we want marked dates to exist till we press 'choose type',
//    but unmarkeds are supposed to be only excluding pressed dates,
//    but at the same time we want exclude by 'rectangles',
//    so there should be array too. After excluding (marked -= unmarked) 
//    we want either exclude again, or add new, the first option doesn't
//    require previous array, the second option may have some problems
//    if unmarkeds exist: We won't be able to mark already unmarked. That's an application bug

//  - 2) We aren't allowed to keep alive previouse marked, because 
//    marked = markedWorkers X MarkedDates
//    if we push new date in next itterration (markening)
//    previous workers will affect, and instead of cell marked
//    we'll get rectangle marked
//    
//    
//? Afterwards user chose dates and we create dateRecords options (workerId, date, type = Marked)
//?   Should we initialize dateRecords immediatly and renew state or 
//?   pass cells special prop: type = marked in oreder to decorate and wait user 'choose type' -> 'submit' 
//  1) The more initializing and renewing real state expencive, 
//      the more new dateRecords removing, the more we should avoid these actinos and use imitation of it
//      with further initialization, when we sure there are no changes
//  2) Mutation state in the moment is an easier arcitechture version, due to reactivity. 
//      We don't have to pass some special fake instance prop or develop some flags, default values
//      to imitate the same behavior if we are avoiding real creation, especially if there are small changes during
//      all the time (especially, in the light of unescapble initializing, it is better to devide *calculation costs* on parts)
//      The less initializing/removing cost the worth it
// 
// 