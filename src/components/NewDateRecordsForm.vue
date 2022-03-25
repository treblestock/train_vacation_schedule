<template>
  <div class="newWorkerRecordsForm">
    <h3 class="newWorkerRecordsForm__title">Выберите тип даты для создания новых записей или обновления существующих</h3>
    <form action="" class="newWorkerRecordsForm__form"
      @submit.prevent="$store.dispatch('userAddDateRecords', $event), $emit('formSubmit')"
    >
      <div class="form__body">
        <app-select
          selectName="dateType"
          :options="this.$store.getters.NEW_DATE_RECORD_FORM_DATE_TYPES"
        ></app-select>
      </div>

      <div class="form__btns">
        <button class="form__submit">Создать</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
}
</script>


<style scoped>
.newWorkerRecordsForm {
  max-width: 600px;
  min-height: 300px;

  display: flex;
  flex-direction: column;
}
.newWorkerRecordsForm__title {
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 15px;

  border-bottom: 1px solid #333;
}

.newWorkerRecordsForm__form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.form__body {
  flex: 1 1 auto;
  border-bottom: 1px solid #333;
  margin-bottom: 15px;
}
.form__btns {
  flex: 0 0 auto;
}

</style>