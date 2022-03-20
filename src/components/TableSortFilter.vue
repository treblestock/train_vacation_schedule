<template> 
  <form class="table-sort-and-filter">
    <app-select
      selectName="month"
      :options="this.$store.getters.MONTHS"
      @change="this.$store.dispatch('updateSearchMonth', $event)"
      ></app-select>
    <app-select
      selectName="dateType"
      :options="this.$store.getters.PERIOD_TYPES"
      @change="this.$store.dispatch('updateSearchDateType', $event)"
      ></app-select>
    <multiple-select
      selectName="month"
      :options="this.$store.getters.MONTHS"
      :columns='3'
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