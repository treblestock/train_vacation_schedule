<template>
  <global-popup
    :isShow="$store.getters.isShowNewDateRecordsFormPopup"
    @close-popup="$store.commit('closeNewDateRecordsFromPopup')"
  >
    <new-date-records-form 
      @form-submit="$store.commit('closeNewDateRecordsFromPopup')"
    />
  </global-popup>
</template>


<script> 
import NewDateRecordsForm from '@/components/NewDateRecordsForm.vue'
export default { 
  components: {
    NewDateRecordsForm,
  },
} 
</script>
   
<style scoped>

</style>