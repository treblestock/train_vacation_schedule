<template> 
  <select :name='selectName'>
    <option 
      v-for="(optionText, optionValue) in options" :key='optionValue'
      :value='optionValue'
      >{{optionText}}</option>
  </select>
</template> 
 
<script> 
export default { 
  name: 'app-select',
  props: {
    selectName: String,
    options: Object,
  },
}
</script>
   
<style scoped> 
select {
  display: block;
}
option {
  background-color: #fff;
}
</style>