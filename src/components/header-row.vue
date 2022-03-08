<template> 
   <div class="header-row">
    <table-row
      :recordHeader='recordHeader'
      :workerId='workerId'
      :periods='periods'
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
    recordHeader: {
      type: String,
    },
    workerId: {
      type: Number,
    },
    periods: {
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