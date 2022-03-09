<template> 
   <div class="table__row">
    <div class="row__header" :id='workerId'>{{rowHeader}}</div>
    <div class="row__body">
      <table-ceil
        v-for="date in datesInMonth" :key="date"
        :dateType="findDateRecord(date, workerId)?.dateType"
        
        :id='`${workerId} ${date.getTime()}`'
      >{{date.getDate()}}</table-ceil>
    </div>
   </div>
</template> 
 
<script>
import TableCeil from '@/components/table-ceil.vue'

// Helpers
import {monthNumber} from '@/helpers/date.js'

export default {
  components: {
    TableCeil,
  },
  props: {
    datesInMonth: {
      type: Array,
    },
    rowHeader: {
      type: String,
    },
    workerId: {
      type: Number,
    },
    workerDates: {
      type: Array,
    },
    searchQueries: {
      type: Object,
    },
  },
  data() {
    return {
      month: this.searchQueries.month,
      type: this.searchQueries.type,

      dateDate: {},
    }
  },
  methods: {
    findDateRecord(dateInMonth, workerId) {
      return this.workerDates.find(dateRecord => dateRecord.date.getTime() === dateInMonth.getTime() &&
       dateRecord.workerId === workerId)
    }
  },
  computed: {
    datesFilteredMonth() {
      if(!this.month) this.workerDates
      const requiredMonth = this.month
      const requiredMonthNumber = monthNumber[requiredMonth]
      return this.workerDates.filter(dateObj => dateObj.date.getMonth() == requiredMonthNumber)
    },
  },
  mounted() {
  }
} 
</script> 
   
<style scoped>  
.table__row {
  display: flex;
  height: 25px;
}
.row__header {
  flex: 0 0 150px;
  border-bottom: 1px solid #000;
}

.row__body {
  display: flex;
  height: 100%;
}
.row__body>* {

} 
</style>