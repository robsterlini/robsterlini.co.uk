<template>
    <div :class="['loader', { 'is--active': active }]">

    </div>
</template>

<script>
    export default {
        name: 'ui-loader',

        // Components
        components: {
            
        },

        // Data
        computed: {
            active() {
                return this.$store.state.app.state.loading || false;
            },
        },
    };
</script>
