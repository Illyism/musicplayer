import App from './App.vue';
import router from './router';
import store from './store';
import pace from '@/utils/pace.ts'
import setupVueInstance from './setupVueInstance'
import './styles/style.css';
import './registerServiceWorker';

import { installSentry, installVueErrorHandler } from '@/utils/errorHandler'

installSentry()
installVueErrorHandler()

const Vue = setupVueInstance()
pace.install()

new Vue({
  router,
  store,
  render: (h) => h(App),
  mq: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  },
}).$mount('#app');
