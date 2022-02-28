<template>
  <app-header
    :periodTypes='periodTypes'></app-header>
  <app-table></app-table>
</template>

<script>
import AppHeader from '@/components/app-header.vue'
import AppTable from '@/components/app-table.vue'

export default {
  components: {
    AppHeader,
    AppTable,
  },
  data() {
    return {
      periodTypes: {
        illnes: 'Больничный',
        vacation: 'Отпуск',
      },
    }
  },
  methods: {
    
  }
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
input,button,textarea{font-family:inherit;}

input::-ms-clear{display: none;}
button{background: transparent; cursor: pointer; font-size: inherit;color: inherit}
button::-moz-focus-inner {padding:0;border:0;}
a, a:visited{text-decoration: none;color: inherit}
a:hover{text-decoration: none;color: inherit}
ul li{list-style: none;}
img{vertical-align: top;}

h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: 400;}
/*--------------------*/

button,
select {
  min-width: 100px;
  padding: 10px 20px;
}
button {
  background-color: #eee;
}
button:hover,
button:focus {
  background-color: #666;
}

select {
  border: 1px solid #000;
}

select:hover,
select:active,
select:focus {
  background-color: #eee;
}


</style>