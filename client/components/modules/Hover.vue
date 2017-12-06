<template>
    <component :is="tag" @mouseover="mouseOver" @mouseleave="mouseLeave" :href="href" :target="href ? '_blank' : false">
        <slot/>
    </component>
</template>

<script>
    export default {
        name: 'module-hero',

        // Props
        props: {
            slug: {
                required: true,
                type: String,
            },
            href: String,
        },

        // Data
        computed: {
            tag() {
                return this.href ? 'a' : 'span';
            },
        },

        // Methods
        methods: {
            mouseOver() {
                this.$store.commit('setHover', this.slug);
            },
            mouseLeave() {
                this.$store.commit('setHover', '');
            },
        },
    };
</script>

<!--  -->