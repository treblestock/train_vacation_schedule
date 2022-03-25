<template>

  <app-header></app-header>
  <app-table class="app__table"
    :records='workerRecords(_workerRecords)'
  ></app-table>
  
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
// Components
import AppHeader from '@/components/AppHeader.vue'
import AppTable from '@/components/AppTable.vue'

// Database 
import { workerRecordsJSON } from '@/database/index.js'


export default {
  components: {
    AppHeader,
    AppTable,

  },
  computed: {
    ...mapGetters([
      '_workerRecords',
      'workerRecords',
    ]),
  },
  beforeMount() {
    const parsedWorkerRecords = JSON.parse(workerRecordsJSON  )
    this.$store.dispatch('validateWorkerRecords', parsedWorkerRecords)
    this.$store.commit('setWorkerRecords', parsedWorkerRecords)
  },
}
</script>


<style>
/* Обнуление */
*{
padding: 0;
margin: 0;
border: 0;
}
*,*:before,*:after{
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
box-sizing: border-box;
}
:focus,:active{outline: none;}
a:focus,a:active{outline: none;}

nav,footer,header,aside{display: block;}

html,body{
height: 100%;
width: 100%;
font-size: 100%;
line-height: 1;
font-size: 18px;
-ms-text-size-adjust: 100%;
-moz-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
input,button,textarea,select,option{display: inline-block; background: none;font-family:inherit; font-size: inherit; line-height: inherit; color: inherit}
button,textarea,select,option {cursor: pointer; }

input::-ms-clear{display: none;}
input[type=checkbox], input[type=radio] {cursor: pointer;}
label {cursor: pointer;}
button::-moz-focus-inner {padding:0;border:0;}
a {text-decoration: none;color: inherit}
a:hover{text-decoration: none;color: inherit}
ul li{list-style: none;}
img{vertical-align: top;}

h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: 400;}
/*--------------------*/

body {
  line-height: 1.2;
  font-family: 'Raleway', sans-serif;
  background-color: palegreen;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app__table {
  flex: 1 0 auto;
}

button,
select
{
  min-width: 100px;
  padding: 5px 10px;
  background-color: #18a36b;
  
}

input {
  border: 1px solid #18a36b;
  min-width: 50px;
  padding: 5px 10px;
}
input:hover,
input:active {
  border: 1px solid #3BA3D0;
}

button:hover,
select:hover {
  background-color: #63AFD0;
}

button:active,
select:active {
  background-color: #3BA3D0;
}


</style>