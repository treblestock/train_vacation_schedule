<template>
  <div>
    <select v-show='false' :name='selectName' multiple>
      <option 
        v-for="(optionText, optionValue) in options"
        :optionValue='optionValue'
        :key='optionValue'
        :value='optionValue'
        >{{optionText}}</option>
    </select>

    <div class="custom-select">
      {{selected}}
    </div>
  </div>
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
  data() {
    return {
      selected: '',
    }
  }
} 
</script> 
   
<style scoped> 

</style>