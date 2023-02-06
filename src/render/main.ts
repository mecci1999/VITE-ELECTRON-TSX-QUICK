import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@/styles/index.scss';

window.$store = store;

createApp(App).use(router).use(store).mount('#app');
