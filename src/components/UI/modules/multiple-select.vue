<template>
  
    <select id='select' :name='selectName'  multiple v-show='false'>
      <option
      v-for="(optionText, optionValue) in options" :key='optionValue'
      :optionValue='optionValue'
      :value='optionValue'
      >{{optionText}}</option>
    </select>

    <with-popup v-show='true' :="$attrs">
      <template v-slot:element>
        <button type="button" @click='isShowOptions = !isShowOptions'>Что-то v</button>
      </template>
      <template v-slot:popup >
        <div class='grid' v-show='isShowOptions'
          v-pos:absolute="{bottom: '-10px', left: '0px'}"
          v-translate="{x: '-50%', y: '100%'}"
        >
          <button type='button' 
            v-for="(optionText, optionValue) in options" :key="optionValue"
            @click='toggleActive'
          >{{optionText}}</button>
        </div>
      </template>
    </with-popup>
  
</template> 
 
<script>
import WithPopup from '@/components/UI/modules/with-popup.vue'

// directives
import relativePosition from '@/components/directives/relativePosition.js'
import translate from '@/components/directives/translate.js'

export default { 
  name: 'multiple-select',
  components: {
    WithPopup,
  },
  directives: {
    pos: relativePosition,
    translate,
  },
  props: {
    columns: {
      type: Number,
      validator(value) {
        return (value > 0) && (value % 1 === 0) ? true : false
      }
    },
    selectName: {
      type: String,
    },
    options: {
      type: Object,
    }
  },
  data() {
    return {
      isShowOptions: false,
      selected: '',
    }
  },
  methods: {
    toggleActive() {
      const target = event.target
      target.classList.toggle('_active')
    }
  },
  mounted() { 
    const grid = document.querySelector('.grid')
    grid.style.setProperty('--columns', this.columns)
  }
} 
</script> 
   
<style scoped> 

.grid {
  --columns: 1;
  display: grid;
  grid-template-columns: repeat( var(--columns), auto);

}

._active{
  background-color: coral;
}
</style>