<template> 
   <div class="table__row">
    <div class="row__header" :id='workerId'>{{rowHeader}}</div>
    <div class="row__body">
      <table-ceil
        v-for="date in $store.getters.datesInCurrentMonth" :key="date"
        :date-type="findDateRecord({
          dateRecords, 
          date: date.getTime(),
        })?.dateType"
        
        :data-worker-id="workerId"
        :data-date="date.getTime()"
      >{{date.getDate()}}</table-ceil>
    </div>
   </div>
</template> 
 
<script>
import TableCeil from '@/components/table-ceil.vue'

// Helpers
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    TableCeil,
  },
  props: {
    rowHeader: String,
    workerId: Number,
    dateRecords: Array,
  },
  computed: {
    ...mapGetters([
      'findDateRecord',
    ]),
  },
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