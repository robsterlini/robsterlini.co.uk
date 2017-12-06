<template>
    <section class="hero">
        <div class="hero-bg">
            <b class="hero-bg__image">
                <b
                    class="hero-bg__random"
                    :style="{
                        backgroundImage: 'url(' + bg + ')',
                    }"
                />
                <b
                    :class="[
                        'hero-bg__slide',
                        'hero-bg__slide--' + slug,
                        {
                            'is--active': slug === $store.state.hover,
                        },
                    ]"
                    v-for="(hover, slug) in hovers"
                    :key="slug"
                    :style="{
                        backgroundImage: 'url(' + hover + ')'
                    }"
                />
            </b>
        </div>
        <div class="group">
            <h1 class="hero__title h1">
                <span>I’m Rob Sterlini, I build things for the&nbsp;internet.</span>
            </h1>
            <div class="hero__subtitle">
                <p class="huge">I’m a Senior Frontend Developer at&nbsp;<module-hover slug="fueled" href="https://fueled.com" target="_blank">Fueled</module-hover>, based remotely in&nbsp;Bristol.</p>
                <p class="large">At Fueled, I’ve created web experiences for <module-hover slug="apple" href="https://fueled.com/decks/web/#junction">Apple</module-hover>, Vanity Fair, <module-hover slug="bigpoint" href="https://bigpoint.net">Bigpoint</module-hover> and more. In 2013 I redesigned and build the <module-hover slug="reading">University of Reading</module-hover> website in my first job. I’ve freelanced for amazing agencies like&nbsp;<module-hover href="https://kickpush.co" slug="kickpush">Kickpush</module-hover>.</p>
                <p class="large">I’m am <module-hover slug="lycra">lycra enthusiast</module-hover>, an <module-hover slug="wetsuit">amateur triathlete</module-hover>, <module-hover slug="ironman"><abbr title="Ironman" class="sc">IM</abbr> 70.3 finisher</module-hover>, and one-day Ironman&nbsp;conqueror.
                <p class="large">Outside of work and triathlon I love <module-hover class="sc" slug="lego">LEGO</module-hover>, <module-hover slug="spurs">Tottenham Hotspur</module-hover>, and&nbsp;typography.</p>
            </div>
            <a class="hero__cta large" href="mailto:hi@robsterlini.co.uk">Fancy a chat? Say&nbsp;hi!</a>
        </div>
    </section>
</template>

<script>
    import { randomArray } from 'services/array';

    import ModuleHover from 'modules/hover';

    export default {
        name: 'module-hero',

        // Props
        props: {
            title: String,
            subtitle: String,
        },

        // Components
        components: {
            ModuleHover,
        },

        // Data
        data() {
            return {
                bg: '',
                images: [
                    require('images/glastonbury.jpg'),
                    require('images/rdc.jpg'),
                    require('images/shades.jpg'),
                    require('images/camping-hat.jpg'),
                    require('images/tri.jpg'),
                ],
                hovers: {
                    wetsuit: require('images/wetsuit.jpg'),
                    spurs: require('images/spurs.jpg'),
                    fueled: require('images/wetsuit.jpg'),
                    ironman: require('images/ironman.jpg'),
                    lego: require('images/lego.jpg'),
                    reading: require('images/reading.jpg'),
                    kickpush: require('images/kickpush.jpg'),
                    fueled: require('images/fueled.jpg'),
                    lycra: require('images/lycra.jpg'),
                },
            };
        },
        computed: {
            titles() {
                const title = this.$slots.title ? '_slot' : (this.title || '');
                const subtitle = this.$slots.subtitle ? '_slot' : (this.subtitle || '');

                return {
                    title,
                    subtitle,
                };
            },
            hover() {
                return this.$store.state.hover;
            },
        },

        // Lifecycle
        created() {
            this.bg = randomArray(this.images);
        },
    };
</script>
