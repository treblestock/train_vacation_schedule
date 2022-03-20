import { arrAdd, arrDiff, arrMult } from "../../helpers"

export default {
  modules: {
    
  },
  
  
  state: () => ({
    markedDates: [],
    markedWorkerIds: [],
    
    unmarkedWorkerIds: [],
    unmarkedDates: [],
    
    chozenCeils: [],

    isStartMouseEnter: false,
    currentOperation: null,
  }),
  getters: {
    markedCeils: (state, getters) => arrMult(state.markedWorkerIds, state.markedDates)
                                      .map( ([workerId, date]) => (
                                        document.querySelector(`[data-worker-id='${workerId}'][data-date='${date}']`) 
                                      )),
    unmarkedCeils: (state, getters) => arrMult(state.unmarkedWorkerIds, state.unmarkedDates)
                                      .map( ([workerId, date]) => (
                                        document.querySelector(`[data-worker-id='${workerId}'][data-date='${date}']`) 
                                      )),

  },
  mutations: {
    setIsStartMouseEnter: (state, bool) => state.isStartMouseEnter = bool,
    clearHiglighted: (state) => state.unmarkedDates.length = state.unmarkedWorkerIds.length =
                                state.markedDates.length = state.markedWorkerIds.length = 0,
    setCurrentOperation: (state, operation) => state.currentOperation = operation ? operation : null,

    chozenCeilsSet: (state, ceils) => (state.chozenCeils = ceils ),
    chozenCeilsClear: (state) => (state.chozenCeils = [] ),
    chozenCeilsAdd: (state, ceils) => (state.chozenCeils = arrAdd(state.chozenCeils, ceils) ),
    chozenCeilsRemove: (state, ceils) => (state.chozenCeils = arrDiff(state.chozenCeils, ceils) ),
  },
  actions: {
    // API

    //* Highlight
    stopHighlighting: ({state, commit}) => {
      commit('setIsStartMouseEnter', false)
      commit('clearHiglighted')
      commit('setCurrentOperation', null)
    },

    startHighlighting: ({commit, dispatch}, {evnt, operation}) => {
      commit('setIsStartMouseEnter', true)
      commit('setCurrentOperation', operation)
      dispatch('highlight', evnt)
    },

    // TODO: Currently there are some issues with calculation (freezes), check it again a bit later
    highlight({state, dispatch}, evnt) {
      const currentOperation = state.currentOperation
      if (!state.isStartMouseEnter || !currentOperation) return

      if ( evnt.target.id == 'tableHeaderRow' ) dispatch(currentOperation + 'Table')

      const date = evnt.target.dataset.date
      const workerId = evnt.target.dataset.workerId

      if ( !date && workerId) dispatch(currentOperation + 'WorkerIdLine', workerId) 
      if ( date && !workerId ) dispatch(currentOperation + 'DateLine', date)
      if ( date && workerId ) dispatch(currentOperation + 'Rect', {workerId, date} )
    },
    


    //* Operations
    markRect({state, getters, commit}, {workerId, date} ) {
      if (!state.markedDates.includes(date) ) state.markedDates.push(date)
      if (!state.markedWorkerIds.includes(workerId) ) state.markedWorkerIds.push(workerId)
      getters.markedCeils.forEach(ceil => ceil.classList.add('marked'))

      commit('chozenCeilsAdd', getters.markedCeils)
    },
    unmarkRect({state, getters, commit}, {workerId, date}) {
      if (!state.unmarkedDates.includes(date) ) state.unmarkedDates.push(date)
      if (!state.unmarkedWorkerIds.includes(workerId) ) state.unmarkedWorkerIds.push(workerId)
      getters.unmarkedCeils.forEach(ceil => ceil.classList.remove('marked'))

      commit('chozenCeilsRemove', getters.markedCeils)
    },


    markDateLine({state, getters, commit}, date) {
      const markedDates = document.querySelectorAll(`[data-worker-id][data-date='${date}']`)
      markedDates.forEach(ceil => ceil.classList.add('marked'))

      commit('chozenCeilsAdd', [...markedDates])
    },
    markWorkerIdLine({state, getters, commit}, workerId) {
      const markedWorkerIds = document.querySelectorAll(`[data-worker-id='${workerId}'][data-date]`)
      
      if (!state.markedWorkerIds.includes(workerId) ) state.markedWorkerIds.push(workerId)
      markedWorkerIds.forEach(ceil => ceil.classList.add('marked'))

      commit('chozenCeilsAdd', [...markedWorkerIds])
    },
    unmarkDateLine({state, getters, commit}, date) {
      const unmarkedDates = document.querySelectorAll(`[data-worker-id][data-date='${date}']`)
      unmarkedDates.forEach(ceil => ceil.classList.remove('marked'))

      commit('chozenCeilsRemove', [...unmarkedDates])
    },
    unmarkWorkerIdLine({state, getters, commit}, workerId) {
      const unmarkedWorkerIds = document.querySelectorAll(`[data-worker-id='${workerId}'][data-date]`)
      
      if (!state.unmarkedWorkerIds.includes(workerId) ) state.unmarkedWorkerIds.push(workerId)
      unmarkedWorkerIds.forEach(ceil => ceil.classList.remove('marked'))

      commit('chozenCeilsRemove', [...unmarkedWorkerIds])
    },

  
    markTable({state, getters, commit}) {
      const allCeils = document.querySelectorAll(`[data-worker-id][data-date]`)
      allCeils.forEach(ceil => ceil.classList.add('marked'))

      commit('chozenCeilsAdd', [...allCeils])
    },
    unmarkTable({state, getters, commit}) {
      const allCeils = document.querySelectorAll(`[data-worker-id][data-date]`)
      allCeils.forEach(ceil => ceil.classList.remove('marked'))

      commit('chozenCeilsClear')
    },

    
  },
}
// The aim is to provide ability to mark not only one record at a time or a line of a worker's records at a time, but to provide ability to mark some rectangle of workerRecords no matter they exist or not (exist -> find, not -> create empty)
// So markig a line or a ceil will be a particular case of marking rectangle
// The same concerns unMarking

// markDateInMonth = (date) => markedDates.add(date)
// markWorker = (worker) => markedWorkers.add(worker)
// markedDatesAndWorkers = (markedDates, markedWorkers) => [markedDates X markedWorkers] 
// 
// unmarkDateInMonth = (date) => unmarkedDates.add(date)
// unmarkWorker = (worker) => unmarkedWorkers.add(worker)
// unmarkedDatesAndWorkers = (unmarkedDates, unmarkedWorkers) => [unmarkedDates X unmarkedWorkers] 
// 
// Chozen = Marked1 - Unmarked1 + Marked2 ()
// 
// User.markDates = (Dates, Workers) => [Dates X Workers].forEach(mark)
// User.markDate = (date) =>  { date.isExists ? find(date) -> update(type, 'marked') : createMarked() }
// 
// user.changeType = (chozen, newType) => newType == 'delete' ? records.forEach(remove) : recrods.forEach(changeType() )
// 
// 
// @NATIVE EVENTS
// @keydown       ="currentOperation = 'marking' "
// @keydown.shift ="currentOperation = 'unmarking' "
// @keyup 1)      ="currentOperation = null "

// @mousemoove="pushingCurrentOperationArray() "

// @keyup 2)      ="chozen (+= marked / -= unmarked), unmarked/marked = []" 
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
//    previous workers will affect, and instead of ceil marked
//    we'll get rectangle marked
//    
//    
//? Afterwards user chose dates and we create dateRecords options (workerId, date, type = Marked)
//?   Should we initialize dateRecords immediatly and renew state or 
//?   pass ceils special prop: type = marked in oreder to decorate and wait user 'choose type' -> 'submit' 
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