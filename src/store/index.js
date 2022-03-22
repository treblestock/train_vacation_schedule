import { createStore } from 'vuex'

import workerRecords from './modules/workerRecords.js'
import userLogic from './modules/userLogic.js'
import searchQueries from './modules/searchQueries.js'

export default createStore({
  modules: {
    workerRecords,
    userLogic,
    searchQueries,
  },
  
  
  state: () => ({
    
  }),
  getters: {
    
  },
  mutations: {
    
  },
  actions: {

  },
})