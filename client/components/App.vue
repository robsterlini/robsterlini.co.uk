<template>
    <div :class="['page', { 'page--is-loaded': $store.state.loaded }]">
        <transition
            name="component-fade"
            mode="out-in"
            @appear="onLoad()"
            @enter="onLoad()"
            @before-leave="onBeforeLeave()"
            @leave="onLeave()"
        >
            <router-view
                :key="$route.fullPath"
                :class="[
                    'main',
                    `main--${$route.name}`
                ]"
            />
        </transition>
    </div>
</template>

<style lang="scss">
    ._debug { margin: 20px 0; font-size: 14px; min-height: 0; position: relative; z-index: 99; }
    ._debug--fixed { border: 0; position: fixed; top: 0; right: 0; padding: 5px 10px; background: rgba(0,0,0,0.5); color: white; z-index: 9999; white-space: pre-wrap; white-space: normal; margin: 0; width: 100%; pointer-events: none; white-space: pre2; }
    @import '../main.scss';
</style>

<script>
// Vue(x)
import Vue from 'vue';

// Services
import { createMeta } from 'services/meta.js';

// Export
export default {
    name: 'app',

    // Meta info
    metaInfo() {
        return {
            titleTemplate(titleChunk) {
                return (titleChunk ? titleChunk + this.$store.state.meta.separator : '') + this.$store.state.meta.base;
            },
            htmlAttrs: {
                prefix: 'og: http://ogp.me/ns#',
            },
            meta: createMeta({
                type: 'website',
                url: this.$store.state.meta.root,
                title: this.$store.state.meta.title,
                twitterHandle: '@robsterlini',
                twitterCard: 'summary',
                company: 'Rob Sterlini',
                image: 'https://robsterlini.co.uk/assets/images/logo.png',
                generator: 'Rob Sterlini VueJS – https://github.com/robsterlini/robsterlini.co.uk',
                viewport: 'width=device-width, initial-scale=1',
            }),
            // title: meta.home.title,
            // meta: createMeta(meta.home.meta),

            changed(metaInfo/*, added, removed*/) {
                if(metaInfo.title !== this.$store.state.meta.title) {
                    this.$store.commit('meta/updateTitle', metaInfo.title);
                }

                this.$store.commit('meta/updateMeta', metaInfo);
            },
        };
    },

    // Components
    components: {

    },

    // Methods
    methods: {
        onLoad() {
            setTimeout(() => {
                this.$store.dispatch('app/loadPage');
            }, 500);
        },
        onLeave() {

        },
        onBeforeLeave() {

        },
    },

    // Lifecycle
    mounted() {
        setTimeout(() => {
            this.$store.commit('setLoaded');
        }, 500);
    },
};
</script>
