<template> 
   <div class="header-row">
    <table-row
      :rowHeader='rowHeader'
      :workerId='workerId'
      :dates='dates'
      :searchQueries='searchQueries'
    ></table-row>
  </div>
</template> 
 
<script>
import TableRow from '@/components/table-row.vue'

export default {
  components: {
    TableRow,
  },
  props: {
    rowHeader: {
      type: String,
    },
    workerId: {
      type: Number,
    },
    dates: {
      type: Array,
    },
    searchQueries: {
      type: Object,
    },
  },
} 
</script> 
   
<style scoped> 
.header-row {
  font-weight: 700;
}
</style>