import App from './App.vue';
import router from './router';
import store from './store';
import pace from '@/utils/pace.ts'
import setupVueInstance from './setupVueInstance'
import './styles/style.css';
import './registerServiceWorker';

const Vue = setupVueInstance()
pace.install()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
