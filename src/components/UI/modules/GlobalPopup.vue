<template>
  <div class="popup"
    v-if="isShow"
  >
    <div class="popup__bg"
      @click="$emit('closePopup')"
    ></div>
    <div class="popup__body">
      <slot></slot>
    </div>
  </div>
</template>


<script> 
export default { 
  name: 'global-popup',
  props: {
    isShow: {
      default: false,
    },
  },
} 
</script>
   

<style scoped>

.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

.popup__bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
}

.popup__body {
  min-width: 400px;
  min-height: 200px;

  max-width: 80%;
  max-height: 80%;

  z-index: 1001;

  border-radius: 10px;
  padding: 20px;
  background-color: palegreen;
}




</style>