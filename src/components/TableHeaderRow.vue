<template> 
   <div class="table-header__row">
    <div class="row__header" id="tableHeaderRow">{{rowHeader}}</div>
    <div class="row__body">
      <table-ceil
        v-for="date in $store.getters.datesInCurrentMonth" :key="date"
        
        :data-date="date.getTime()"
      >{{date.getDate()}}</table-ceil>
    </div>
   </div>
</template>
 
<script>
import TableCeil from '@/components/TableCeil.vue'

// Helpers
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    TableCeil,
  },
  props: {
    rowHeader: String,
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