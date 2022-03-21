<template> 
  <form class="table-sort-and-filter">
    <app-select 
      class="form__select"
      :options="this.$store.getters.MONTHS"
      selectName="month"
      @change="this.$store.dispatch('updateSearchMonth', $event)"
    ></app-select>
    <app-select 
      class="form__select"
      :options="this.$store.getters.DATE_TYPES"
      selectName="dateType"
      @change="this.$store.dispatch('updateSearchDateType', $event)"
    ></app-select>
    <multiple-select 
      class="form__select"
      :options="this.$store.getters.MONTHS"
      selectName="month"
      :columns='3'
    ></multiple-select>
    <multiple-select 
      class="form__select"
      :options="this.$store.getters.DIVISIONS"
      selectName="Отделы"
      :columns='2'
    ></multiple-select>
  </form> 
</template> 
 
<script>
export default {

} 
</script> 
   
<style scoped> 
form {
  display: flex;
}
form>* {
  margin-right: 5px;
}
form>*:last-of-type {
}
</style>