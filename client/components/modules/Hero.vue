<template>
    <section class="hero grid">
        <span class="hero-image"><b class="hero-image__inner"/></span>
        <h1 class="h1 hero-title">{{ title }}</h1>
        <slot name="subtitle"/>
    </section>
</template>

<script>
    import ModuleHover from 'modules/hover';

    export default {
        name: 'module-hero',

        // Props
        props: {
            title: String,
            start: String,
        },
    };
</script>
