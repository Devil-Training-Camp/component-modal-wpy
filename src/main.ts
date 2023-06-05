import { createApp } from 'vue'
import './style.css'
import './assets/model.css'
import App from './App.vue'
import {confirm1} from './utils/model'
import {Coordinate} from './utils/config'
import { store } from './store'
const app = createApp(App);
app.config.globalProperties.$confirm = confirm1
app.config.globalProperties.$moveModel = Coordinate
app.use(store).mount('#app')


