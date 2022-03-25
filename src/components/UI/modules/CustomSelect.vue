<template>
  <div class="custom-select">
    <select ref='_select' :name='selectName' :multiple="multiple" v-show='false'>
      <option
      v-for="(optionText, optionValue) in options" :key='optionValue'
      :value='optionValue'
      >{{optionText}}</option>
    </select>

    <with-popup v-show="true">
      <template #element>
        <button type="button" 
          @click='isShowOptions = !isShowOptions'
          ref="select"
        >
          <span class='arrow'>{{selectName}}</span>
        </button>
      </template>
      <template #popup >
        <div
          ref="options" 
          class='grid' 
          v-show='isShowOptions'
          v-pos:absolute="{bottom: '-10px', left: '100%'}"
          v-translate="{x: '-100%', y: '100%'}"
          @click="onSelect()"
          
        >
          <div class='option' 
            v-for="(optionText, optionValue) in options" :key="optionValue"
            :data-option-value="optionValue"
          >{{optionText}}</div>
        </div>
      </template>
    </with-popup>
  </div>
  
</template> 
 
<script>
import WithPopup from '@/components/UI/modules/WithPopup.vue'

// directives
import relativePosition from '@/components/directives/relativePosition.js'
import translate from '@/components/directives/translate.js'


export default { 
  name: 'custom-select',
  components: {
    WithPopup,
  },
  directives: {
    pos: relativePosition,
    translate,
  },
  props: {
    columns: Number,
    selectName: String,
    options: Object,
    multiple: Boolean,
  },
  data() {
    return {
      isShowOptions: false,
    }
  },
  computed: {
    _select() { return this.$refs._select },
    _selectOptions() { return [...this._select.children] },
    select() { return this.$refs.select },
    selectOptions() { return [...this.$refs.options.children] },
  },
  methods: {
    onSelect() {
      !this.multiple 
        ? (this.setActive(), this.setSelected(), this.closePopup() )
        : (this.toggleActive(), this.toggleSelected() ) 
    },
    setActive() {
      this.selectOptions.forEach(option => option.classList.remove('active') )
      event.target.classList.add('active')
    },
    toggleActive() {
      event.target.classList.toggle('active')
    },
    setSelected() {
      const selectedValue = event.target.dataset.optionValue
      this._selectOptions.forEach(option => option.select = false)
      const _option = this._select.querySelector(`[value='${selectedValue}']`)
      _option.selected = true
      this.$emit('change', this._select.selectedOptions)
    },
    toggleSelected() {
      const selectedValue = event.target.dataset.optionValue
      const _option = this._select.querySelector(`[value='${selectedValue}']`)
      _option.selected = !_option.selected
      this.$emit('change', this._select.selectedOptions)
    },


    closePopup() {
      this.isShowOptions = false
    },
  },
  mounted() { 
    this.$refs.options.style.setProperty('--columns', this.columns)
  }
} 
</script> 
   
<style scoped> 

.grid {
  --columns: 1;
  display: grid;
  grid-template-columns: repeat( var(--columns), 1fr);

}
.option {
  padding: 5px 10px;
  background-color: #eee;

  white-space: nowrap;
}
.option:hover {
  background-color: #63AFD0;
}

.arrow:after {
  content: '\02C5';
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
}

.active{
  background-color: #3BA3D0;
}

</style>