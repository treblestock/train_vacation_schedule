<template> 
  <form class="table-sort-and-filter">
    <app-select
      selectName="month"
      :options='months'
      @change='onSelectedMonth'
      ></app-select>
    <app-select
      selectName="dateType"
      :options='dateTypes'
      @change='onSelectedPeriodType'
      ></app-select>
    <multiple-select
      selectName="month"
      :options='months'
      :columns='3'
    ></multiple-select>
  </form> 
</template> 
 
<script>


export default { 
  components: {
    
  },
  props: {

  },
  data() {
    return {
      dateTypes: {},
      months: {},
    }
  },
  methods: {
    onSelectedMonth() {
      const selectedMonth = event.target.selectedOptions[0].value
      this.$emit('onMonthQuery', selectedMonth)
    },
    onSelectedPeriodType() {
      const selectedPeriodType = event.target.selectedOptions[0].value
      this.$emit('onTypeQuery', selectedPeriodType)
    },
  },
  mounted() {
    import('@/database/index.js')
      .then(modules => {
        this.dateTypes = modules.periodTypes
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