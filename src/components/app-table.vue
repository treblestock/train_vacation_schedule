<template> 
  <div class="table">

    <div class="table__body">
      <table-row
        v-for="record in recordsFilteredWorkers" :key="record"
        :datesInMonth='datesInMonth'
        :workerId='record._id'
        :rowHeader='record.name'
        :workerDates='record.dates'
        :searchQueries='searchQueries'

        @mousedown='onCeilCliked'
      ></table-row>
    </div>
  </div>
</template> 
 
<script>
    // <header-row
    //   :rowHeader='"Рабочие / " + searchQueries.month + ":"'
    //   :workerId='1'
    //   :dates=''
    //   :searchQueries='searchQueries'
    // ></header-row>
import HeaderRow from '@/components/header-row.vue'
import TableRow from '@/components/table-row.vue'
import {monthNumber, getMonthDates} from '@/helpers/date.js'

export default { 
  components: {
    HeaderRow,
    TableRow,
  },
  props: {
    records: {
      type: Object,
    },
    searchQueries: {
      type: Object,
    },
  },
  computed: {
    recordsFilteredWorkers() {
      const workerQuery = this.searchQueries.workersQuery
      if(!workerQuery) this.records
      return this.records
    },
    datesInMonth() {
      return getMonthDates(monthNumber[this.searchQueries.month] )
    },
  },
  methods: {
    onCeilCliked(evnt) {
      const [workerId, dateStamp] = event.target.id.split(' ')
      this.$emit('onCeilClicked', {workerId, dateStamp})
    },
  },
  mounted() {
  }
} 
</script> 
   
<style scoped> 

.table {
  border: 1px solid #000;
  overflow: auto;
}
</style>