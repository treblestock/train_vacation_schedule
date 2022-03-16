export default {
  modules: {
    
  },
  
  
  state: () => ({
    
  }),
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    // API
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