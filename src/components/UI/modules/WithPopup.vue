<template> 
  <div class="with-popup">
    <slot name='element' :='$attrs'></slot>
    <slot name='popup'></slot>
  </div> 
</template> 
 
<script> 
export default {
  name: 'with-popup',
  props: {
    
  },
} 
</script> 
   
<style scoped> 
.with-popup {
  position: relative;

}
.element{ 

}
.popup {
  position: absolute;
  bottom: -10px;
  left: 0;
}
</style>