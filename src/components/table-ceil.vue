<template> 
   <div class="ceil" 
    :style='{backgroundColor: currentColor}'>
    <slot></slot>
   </div>
</template> 
 
<script> 
export default { 
  props: {
    date: {
      type: Date
    },
    dateType: {
      type: String,
    },
    workerId: {
      type: Number || String,
    }
  },
  computed: {
    currentColor() {
      return this.dateType === 'vacation' ? 'green' :
        this.dateType === 'illness' ? 'skyblue' :
        this.dateType === 'marked' ? '#eee' : 'none'
    }
  }
} 
</script> 
   
<style scoped> 

.ceil {
  border-radius: 8px;
  width: 60px;
  height: 100%;
  border: 1px solid #000;

  padding: 0 5px;
}
</style>