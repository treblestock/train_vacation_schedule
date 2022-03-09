<template> 
  <header class="header">
    <div class="header__new-data-btns">
      <button class="btn__save">Сохранить</button>
      <button class="btn__reset">Отмена</button>
    </div>

    <table-sort-filter
      @on-month-query='onSelectedMonth'
      @on-type-query='onSelectedPeriodType'
    ></table-sort-filter>
  </header>
</template> 
 
<script> 
import TableSortFilter from '@/components/table-sort-filter.vue'
export default { 
  components: {
    TableSortFilter,
  },
  props: {
    // dateTypes: {
    //   type: Object,
    // },
    // months: {
    //   type: Object,
    // },
  },
  data() {
    return {
      searchQueries: {
        month: 'january',
        type: 'vacation',
      },
    }
  },
  methods: {
    onSelectedMonth(monthSelected) {
      this.searchQueries.month = monthSelected
      this.$emit('onQueriesChanged', this.searchQueries)
    },
    onSelectedPeriodType(typeSelected) {
      this.searchQueries.type = typeSelected
      this.$emit('onQueriesChanged', this.searchQueries)
    },
  },
} 
</script> 
   
<style scoped> 
.header {
  padding: 10px;
  background-color: aqua;
  display: flex;
  justify-content: space-between;
}
</style>