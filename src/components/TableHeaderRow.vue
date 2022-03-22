<template> 
   <div class="table-header__row">
    <div class="row__header" id="tableHeaderRow">{{rowHeader}}</div>
    <div class="row__body">
      <table-cell
        v-for="date in $store.getters.datesInCurrentMonth" :key="date"
        
        :data-date="date.getTime()"
      >{{toStringFormat(date)}} </table-cell>
    </div>
   </div>
</template>
 
<script>
import TableCell from '@/components/TableCell.vue'

// Helpers
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import { toStringFormat } from '@/helpers'


export default {
  components: {
    TableCell,
  },
  props: {
    rowHeader: String,
  },
  methods: {
    toStringFormat,
  },
} 
</script> 
   
<style scoped>  
.table-header__row {
  font-weight: 700;
  display: flex;
  height: 25px;
}
.row__header {
  flex: 0 0 220px;
  border-bottom: 1px solid #000;
}

.row__body {
  display: flex;
  height: 100%;
}
.row__body>* {

} 
</style>