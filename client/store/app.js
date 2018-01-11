'use strict';

import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        page: {

        },
        bg: {
            src: '',
            pos: '',
            loaded: false,
        },
    },
    mutations: {
        setBg(state, payload) {
            const isStr = typeof(payload) === 'string';

            const src = isStr ? payload : payload.src;
            const pos = isStr ? '' : payload.pos;

            Vue.set(state.bg, 'src', src);
            Vue.set(state.bg, 'pos', pos);
        },
        showBg(state, payload) {
            Vue.set(state.bg, 'loaded', true);
        },
    },
    actions: {
        loadPage(context) {
            console.log(context);
            context.commit('showBg');
        },
    },
};
