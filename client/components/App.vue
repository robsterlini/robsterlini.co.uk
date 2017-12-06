<template>
    <main :class="['page', { 'page--is-loaded': $store.state.loaded }]">
        <module-hero/>
    </main>
</template>

<style lang="scss">
    @import '../main.scss';
</style>

<script>

    // Imports
    import { createMeta } from 'services/meta.js';

    import ModuleHero from 'modules/Hero';

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
            ModuleHero,
        },

        mounted() {
            setTimeout(() => {
                this.$store.commit('setLoaded');
            }, 500);
        },
    };
</script>
