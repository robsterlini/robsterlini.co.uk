<template>
</template>

<script>
    import meta from 'models/global/meta.js';

    import { createMeta } from 'services/meta.js';

    export default {
        name: 'view-home',

        // Meta data
        metaInfo: {
            title: meta.home.title,
            meta: createMeta(meta.home.meta),
        },
    };
</script>
