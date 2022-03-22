<template> 
  <form class="table-sort-and-filter">
    <app-select v-if="false" 
      class="form__select"
      :options="$store.getters.MONTHS"
      selectName="month"
      @change="$store.dispatch('updateSearchMonth', $event)"
    ></app-select>
    <app-select v-if="false" 
      class="form__select"
      :options="$store.getters.DATE_TYPES"
      selectName="dateType"
    ></app-select>
    
    <custom-select 
      class="form__select"
      :options="$store.getters.DATE_TYPES"
      selectName="тип даты"
      :columns='1'
      @change="$store.dispatch('updateSearchDateType', $event[0].value)"
    ></custom-select>
    <custom-select 
      class="form__select"
      :options="$store.getters.DIVISIONS"
      selectName="отделы"
      :columns='1'
      multiple
      @change="$store.dispatch('updateSearchDivisions', $event)"
    ></custom-select>
    <custom-select 
      class="form__select"
      :options="$store.getters.MONTHS"
      selectName="Месяц"
      :columns='3'
      @change="$store.dispatch('updateSearchMonth', $event[0].value)"
    ></custom-select>
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