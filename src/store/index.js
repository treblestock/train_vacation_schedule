// import * as helpers from '@/helpers/index' 

import { createStore } from 'vuex'

import workerRecords from './modules/workerRecords.js'
import userInteraction from './modules/userInteraction.js'
import searchQueries from './modules/searchQueries.js'

export default createStore({
  modules: {
    workerRecords,
    userInteraction,
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