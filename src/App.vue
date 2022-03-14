<template>
  <app-header
    @on-queries-changed='onQueriesChanged'
  ></app-header>
  <app-table
    :records='formatedWorkersRecords'
    :searchQueries='searchQueries'
    @on-ceil-clicked='onCeilCliked'
  ></app-table>
  
</template>

<script>
import AppHeader from '@/components/app-header.vue'
import AppTable from '@/components/app-table.vue'

// Directives
import relativePosition from '@/components/directives/relativePosition.js'
import translate from '@/components/directives/translate.js'

// Database 
import { workerRecords } from '@/database/index.js'
console.log(workerRecords)

// Helpers
import {getReps} from '@/helpers/mockData.js'
import {toDateArray} from '@/helpers/date.js'

export default {
  components: {
    AppHeader,
    AppTable,
  },
  directives: {
    pos: relativePosition,
    translate,
  },
  data() {
    return {
      workerRecords: workerRecords.records,
      searchQueries: {
        month: 'january',
        type: 'vacation',
      },
    }
  },
  computed: {
    formatedWorkersRecords() {
      // for (const workerRecord of this.workerRecords) {
      //   workerRecord.dates = workerRecord.dateRecords.map(period => toDateArray(period, workerRecord._id) ).flat()
      //   delete workerRecord.dateRecords

      // }
      return this.workerRecords
    },
  },
  watch: {
    formatedWorkersRecords: {
      deep: true,
      handler() {
        console.log('formatedWorkersRecords changed...')
      }
    }
  },
  methods: {
    onCeilCliked({workerId, dateStamp}) {
      const dateRecord = this.findDateRecord(workerId,dateStamp)
      if (!dateRecord) {
        workerRecords.addDateRecord()
        return 
      }
      console.log(
        dateRecord.date.getMonth(), 
        dateRecord.date.getDate(),
        dateRecord.dateType,
        this.formatedWorkersRecords.find(rec => rec._id == workerId).name
      )
      
    },
    modifyDate({workerId, dateStamp}) {
      const workerRecrord = this.workerRecords.find(workerRecrord => workerRecrord._id == workerId)
      // console.log(workerRecrord)
    },
    onQueriesChanged(newQueries) {
      this.searchQueries = newQueries
    },
    findDateRecord(workerId, dateStamp) {
      const workerRecord = this.formatedWorkersRecords.find(workerRecord => workerRecord._id == workerId)
      return workerRecord.dateRecords.find(dateRecord => dateRecord.date.getTime() == dateStamp)
    },

    globalRecordsCheck() {
      const repsOfWorkerId = getReps(workerRecords.records, '_id')
      if(repsOfWorkerId.length) {
        console.log(repsOfWorkerId)
        throw new Error('non non-unic worker IDs')
      }

      for (const rec of workerRecords.records) {
        console.log(rec.dateRecords)
        const repsOfDate = getReps(rec.dateRecords, 'date')
        if(repsOfDate.length) {
          console.log(repsOfDate)
          throw new Error('non non-unic worker IDs')
        }
      }
    },
  },
  beforeMount() {
    this.globalRecordsCheck()
  }
}
</script>


<style>
/* Обнуление */
*{
padding: 0;
margin: 0;
border: 0;
}
*,*:before,*:after{
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
box-sizing: border-box;
}
:focus,:active{outline: none;}
a:focus,a:active{outline: none;}

nav,footer,header,aside{display: block;}

html,body{
height: 100%;
width: 100%;
font-size: 100%;
line-height: 1;
font-size: 18px;
-ms-text-size-adjust: 100%;
-moz-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
input,button,textarea,select,option{display: inline-block; background: none; cursor: pointer; font-family:inherit; font-size: inherit; line-height: inherit; color: inherit}

input::-ms-clear{display: none;}
input[type=checkbox], input[type=radio] {cursor: pointer;}
label {cursor: pointer;}
button::-moz-focus-inner {padding:0;border:0;}
a {text-decoration: none;color: inherit}
a:hover{text-decoration: none;color: inherit}
ul li{list-style: none;}
img{vertical-align: top;}

h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: 400;}
/*--------------------*/

body {
  line-height: 1.2;
}

button,
select {
  min-width: 100px;
  padding: 5px 10px;
  background-color: #eee;
}

button:hover,
select:hover {
  background-color: coral;
}

button:active,
select:active {
  background-color: tomato;
}



</style>