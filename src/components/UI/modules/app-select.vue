<template> 
  <select :name='selectName'>
    <option 
      v-for="(optionText, optionValue) in options" :key='optionValue'
      :optionValue='optionValue'
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
option {
  background-color: #fff;
}
</style>