import 'root/promise-polyfill';
import { app } from 'root/app';

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') { // eslint-disable-line no-undef
    require('./pwa');
}

app.$mount('#app');
