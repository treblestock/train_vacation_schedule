<template> 
  <select :name='selectName'>
    <option 
      v-for="(optionText, optionValue) in options"
      :optionValue='optionValue'
      :key='optionValue'
      :value='optionValue'
      >{{optionText}}</option>
  </select>
</template> 
 
<script> 
export default { 
  name: 'app-select',
  props: {
    selectName: {
      type: String,
    },
    options: {
      type: Object,
    }
  },
} 
</script> 
   
<style scoped> 

</style>