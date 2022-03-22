<template> 
  <header class="header">
    <div class="header__new-data-btns">
      <button class="btn__save" type="button"
        @click="$store.dispatch('saveChanges')"
      >Сохранить</button>
      <button class="btn__reset" type="button"
        @click="$store.dispatch('revokeChanges')"
      >Отмена</button>
    </div>

    <table-sort-filter></table-sort-filter>
  </header>
</template> 
 
<script> 
import TableSortFilter from '@/components/TableSortFilter.vue'
export default { 
  components: {
    TableSortFilter,
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