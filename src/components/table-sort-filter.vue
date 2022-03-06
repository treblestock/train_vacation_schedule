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
    <multiple-select
      selectName="month"
      :options='months'
      :columns='3'
      @change='onSelectMonth'
    ></multiple-select>
  </form> 
</template> 
 
<script>
// import {months} from '@/database/index.js' // local component database query 


export default { 
  components: {
    
  },
  props: {

  },
  data() {
    return {
      periodTypes: {},
      months: {},
    }
  },
  methods: {
    onSelectMonth() {
      // filler
      const select = event.target
      const selectedMonthValue = select.selectedOptions[0].value
      const selectedMonthRu = select.selectedOptions[0].text
      const selectedMonthInd = select.selectedOptions[0].index
      console.log(selectedMonthInd, selectedMonthValue, selectedMonthRu)
    },
    onSelectPeriodType() {
      // filler
      const select = event.target
      const selectedPeriodType = select.value
      const selectedPeriodTypeRu = select.selectedOptions[0].text
      console.log(selectedPeriodTypeRu)
    },
  },
  mounted() {
    import('@/database/index.js')
      .then(modules => {
        this.periodTypes = modules.periodTypes
        this.months = modules.months
      })
      .catch(e => console.log(e) )
  }
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