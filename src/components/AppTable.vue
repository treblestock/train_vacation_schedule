<template> 
  <div class="table" :="$attrs">
    <div class="table__body"
      @mousedown.exact.left.ctrl="openNewWorkerRecordsFromPopup($event)"
      @mousedown.exact.left.ctrl.shift="userRemoveWorkerRecord($event)"

      @mousedown.exact.left="
        startHighlighting({
          evnt: $event,
          operation: 'mark',
        })"
      @mousedown.exact.left.shift="
        startHighlighting({
          evnt: $event,
          operation: 'unmark',
        })"
      @mouseup="stopHighlighting($event)"
      @mouseover="highlight($event)"
      @dblclick.exact.left="openNewDateRecordsFromPopup($event)"
      @mousedown.exact.left.alt="userRemoveDateRecords($event)"
    >
      <table-header-row
        :rowHeader="'Работники / ' + $store.getters.searchMonth"
      ></table-header-row>

      <table-row
        v-for="workerRecord in records" :key="workerRecord"

        :rowHeader="workerRecord.workerName"
        :workerId="workerRecord.id"
        :dateRecords="dateRecords(workerRecord.dateRecords)"
      ></table-row>

    </div>
  </div>

  
  <new-date-records-form-popup />
  <new-worker-records-form-popup />

  
</template> 
 
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import TableHeaderRow from '@/components/TableHeaderRow.vue'
import TableRow from '@/components/TableRow.vue'

import NewDateRecordsFormPopup from '@/components/NewDateRecordsFormPopup.vue'
import NewWorkerRecordsFormPopup from '@/components/NewWorkerRecordsFormPopup.vue'

export default { 
  components: {
    TableHeaderRow,
    TableRow,

    NewDateRecordsFormPopup,
    NewWorkerRecordsFormPopup,
  },
  props: {
    records: [Array, Object],
  },
  computed: {
    ...mapGetters([
      'dateRecords',
    ]),
  },
  methods: {
    ...mapActions([
      'highlight',
      'startHighlighting',
      'stopHighlighting',
      'openNewDateRecordsFromPopup',
      'openNewWorkerRecordsFromPopup',
      'userRemoveWorkerRecord',
      'userRemoveDateRecords',
      // debug
      'showDateRecord',
    ]),
  },
} 
</script> 
   
<style scoped> 

.table {
  overflow: auto;
  user-select: none;
}


</style>