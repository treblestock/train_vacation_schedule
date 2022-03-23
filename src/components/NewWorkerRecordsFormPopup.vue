<template>
  <global-popup
    :isShow="$store.getters.isShowNewWorkerRecordsFormPopup"
    @close-popup="$store.commit('closeNewWorkerRecordsFromPopup')"
  >
    <new-worker-records-form 
      @form-submit="$store.commit('closeNewWorkerRecordsFromPopup')"
    />
  </global-popup>
</template>


<script> 
import NewWorkerRecordsForm from '@/components/NewWorkerRecordsForm.vue'
export default { 
  components: {
    NewWorkerRecordsForm,
  },
} 
</script>
   
<style scoped>

</style>