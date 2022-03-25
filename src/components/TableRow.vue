<template> 
   <div class="table__row">
    <div class="row__header" 
      :data-worker-id="workerId"
    >{{rowHeader}}</div>
    <div class="row__body">
      <transition-group name="list-animation">
        <table-cell
          v-for="date in $store.getters.datesInCurrentMonth" :key="date"
          :date-type="findDateRecord({
            dateRecords, 
            date: date.getTime(),
          })?.dateType"
          
          :data-worker-id="workerId"
          :data-date="date.getTime()"
          :id="'' + workerId + date.getTime()"
        ></table-cell>
      </transition-group>
    </div>
   </div>
</template>
 
<script>
import TableCell from '@/components/TableCell.vue'

// Helpers
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    TableCell,
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
  flex: 1 0 220px;
  border-bottom: 1px solid #000;
}

.row__body {
  display: flex;
  height: 100%;
}
.row__body>* {

}
</style>