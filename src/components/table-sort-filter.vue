<template> 
  <form class="table-sort-and-filter">
    <app-select
      selectName="month"
      :options='months'
      @change='onSelectMonth'
      ></app-select>
    <app-select
      selectName="periodType"
      :options='periodTypes'
      @change='onSelectPeriodType'
      ></app-select>
    
  </form> 
</template> 
 
<script> 
import {months} from '@/database/months.js'
export default { 
  components: {
    
  },
  props: {
    periodTypes: {
      type: Object,
    },
  },
  data() {
    return {
      
    }
  },
  methods: {
    onSelectMonth() {
      const select = event.target
      const selectedMonthValue = select.selectedOptions[0].value
      const selectedMonthRu = select.selectedOptions[0].text
      const selectedMonthInd = select.selectedOptions[0].index
      console.log(selectedMonthInd, selectedMonthValue, selectedMonthRu)
    },
    onSelectPeriodType() {
      const select = event.target
      const selectedPeriodType = select.value
      const selectedPeriodTypeRu = select.selectedOptions[0].text
      console.log(selectedPeriodTypeRu)
    },
  },
  beforeMount() {
    console.log(months)
    this.months = months
  }
} 
</script> 
   
<style scoped> 

</style>