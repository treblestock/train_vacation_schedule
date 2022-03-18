<template> 
  <div class="table">

    <div class="table__body">
      <table-row
        v-for="workerRecord in records" :key="workerRecord"

        :workerId='workerRecord._id'
        :rowHeader='workerRecord.name'
        :dateRecords='this.filteredDateRecords(workerRecord.dateRecords)'

        @mousedown='startMarking($event), showDateRecord($event)'
        @mouseup='stopMarking($event)'
        @mouseover="mark($event)"
      ></table-row>
    </div>
  </div>
</template> 
 
<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import HeaderRow from '@/components/header-row.vue'
import TableRow from '@/components/table-row.vue'

export default { 
  components: {
    HeaderRow,
    TableRow,
  },
  props: {
    records: [Array, Object],
  },
  computed: {
    ...mapGetters([
      'workerRecords',
      'findWorkerRecordGlobal',
      'filteredDateRecords',
      'findFilteredDateRecordLocal',
    ]),
  },

  methods: {
    ...mapActions([
      'startMarking',
      'stopMarking',
      'mark',
      'showDateRecord',
    ]),
  },
  mounted() {
  },
} 
</script> 
   
<style scoped> 

.table {
  border: 1px solid #000;
  overflow: auto;

  user-select: none;
}
</style>