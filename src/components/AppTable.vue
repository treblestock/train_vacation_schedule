<template> 
  <div class="table">

    <div class="table__body"
        @mousedown.left="
          startHighlighting({
            evnt: $event,
            operation: 'mark',
          })"
        @mousedown.left.shift="startHighlighting({
          evnt: $event,
          operation: 'unmark',
        })"
        @mouseup="stopHighlighting($event)"
        @mouseover="highlight($event)"
        @click.left="openNewDateRecordsFromPopup($event)"
    >
      <table-header-row
        :rowHeader="'Работники / ' + $store.getters.searchMonth"
      ></table-header-row>

      <table-row
        v-for="workerRecord in records" :key="workerRecord"

        :rowHeader="workerRecord.workerName"
        :workerId="workerRecord._id"
        :dateRecords="dateRecords(workerRecord.dateRecords)"
      ></table-row>
    </div>
  </div>

  
  <new-date-records-form-popup />

  
</template> 
 
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import TableHeaderRow from '@/components/TableHeaderRow.vue'
import TableRow from '@/components/TableRow.vue'

import NewDateRecordsForm from '@/components/NewDateRecordsForm.vue'
import NewDateRecordsFormPopup from '@/components/NewDateRecordsFormPopup.vue'

export default { 
  components: {
    TableHeaderRow,
    TableRow,

    NewDateRecordsForm,
    NewDateRecordsFormPopup,
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
    ]),
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