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
    addWorkerRecord(ctx, {workerRecord}) {},
    removeWorkerRecord(ctx, {workerId}) {},
    findWorkerRecord(ctx, {workerId}) {},

    addDateRecord(ctx, {workerId, dateRecord}) {},
    removeDateRecord(ctx, {workerId, DateId}) {},
    findDateRecord(ctx, {workerId, DateId}) {},

    // instances api (records)
    createWorkerRecord(ctx, {workerOptions}) {},
    createDateRecord(ctx, {deteOptions}) {},
    
    updateWorkerRecord(ctx, {prop, newVaue}) {},
    updateDateRecord(ctx, {prop, newVaue}) {}, // update dateType
    
  },
}