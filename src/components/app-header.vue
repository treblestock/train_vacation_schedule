<template> 
  <header class="header">
    <div class="header__new-data-btns">
      <button class="btn__save">Сохранить</button>
      <button class="btn__reset">Отмена</button>
    </div>

    <table-sort-filter :periodTypes='periodTypes'></table-sort-filter>
  </header>
</template> 
 
<script> 
import TableSortFilter from '@/components/table-sort-filter.vue'
export default { 
  components: {
    TableSortFilter,
  },
  props: {
    periodTypes: {
      type: Object,
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