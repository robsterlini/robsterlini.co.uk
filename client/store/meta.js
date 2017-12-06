'use strict';

export default {
    namespaced: true,
    state: {
        base: 'Rob Sterlini',
        separator: ' • ',
        root: 'https://robsterlini.co.uk',
        meta: [],
        title: '',
    },
    mutations: {
        updateMeta(state, payload) {
            state.meta = payload;
        },
        updateTitle(state, payload) {
            state.title = payload;
        },
    },
};
