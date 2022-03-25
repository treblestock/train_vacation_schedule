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
  },
} 
</script> 
   
<style scoped> 

.cell { 
  width: 60px;
  
  border-left: 1px solid #000;

  padding: 5px 10px;
  background: #fff;
}

.vacation {
  background-color: #006E4A	;
}
.illness {
  background-color: #35D4A0;
}
.marked {
  background-color: #666;
}


</style>