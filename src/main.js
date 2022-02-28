import { createApp } from 'vue'
import App from './App.vue'
import UI from '@/components/UI/index.js'

const app = createApp(App)
UI.forEach(comp => app.component(comp.name, comp) )



app.mount('#app')
