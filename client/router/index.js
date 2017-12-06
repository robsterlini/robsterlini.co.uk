import Vue from 'vue';
import Router from 'vue-router';

import NotFound from 'views/404';

import Home from 'views/Home';

import store from 'root/store';

Vue.use(Router);

const routes = [
    {
        path: '*',
        name: 'home',
        component: Home,
    },
];

const router = new Router({
    mode: 'history',
    routes,
});

export default router;
