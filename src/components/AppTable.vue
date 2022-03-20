<template> 
  <div class="table">

    <div class="table__body"
        @mousedown="startHighlighting({
          evnt: $event,
          operation: 'mark',
        })"
        @mousedown.shift="startHighlighting({
          evnt: $event,
          operation: 'unmark',
        })"
        @mouseup="stopHighlighting($event)"
        @mouseover="highlight($event)"
    >
      <table-header-row
        :rowHeader="'Работники / ' + $store.getters.searchMonth"
      ></table-header-row>

      <table-row
        v-for="workerRecord in records" :key="workerRecord"

        :workerId="workerRecord._id"
        :rowHeader="workerRecord.name"
        :dateRecords="dateRecords(workerRecord.dateRecords)"

      ></table-row>
    </div>
  </div>
</template> 
 
<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import TableHeaderRow from '@/components/TableHeaderRow.vue'
import TableRow from '@/components/TableRow.vue'

export default { 
  components: {
    TableHeaderRow,
    TableRow,
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