<template> 
   <div class="cell"
    :class='currentClass'
    >
    <slot></slot>
   </div>
</template> 
 
<script> 
export default { 
  props: {
    dateType: String,
  },
  computed: {
    currentClass() { return this.dateType },
  }
} 
</script> 
   
<style scoped> 

.cell {
  width: 60px;
  height: 100%;
  border: 1px solid #000;

  padding: 0 5px;
}

.vacation {
  background-color: green;
}
.illness {
  background-color: skyblue;
}
.marked {
  background-color: #666;
}


</style>