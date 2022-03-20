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
        <button type="button" @click='isShowOptions = !isShowOptions'>
          <span class='arrow'>{{selectName}}</span>
        </button>
      </template>
      <template v-slot:popup >
        <div @click='toggleActive()' class='grid' v-show='isShowOptions'
          v-pos:absolute="{bottom: '-10px', left: '100%'}"
          v-translate="{x: '-100%', y: '100%'}"
        >
          <div class='option' 
            v-for="(optionText, optionValue) in options" :key="optionValue"
          >{{optionText}}</div>
        </div>
      </template>
    </with-popup>
  
</template> 
 
<script>
import WithPopup from '@/components/UI/modules/WithPopup.vue'

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
      event.target.classList.toggle('_active')
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
.option {
  min-width: 100px;
  padding: 5px 10px;
  background-color: #eee;
}
.option:hover {
  background-color: coral;
}

.arrow:after {
  content: '\02C5';
  font-weight: 700;
  margin-left: 10px;
}

._active{
  background-color: tomato;
}

</style>