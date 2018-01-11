<template>
    <main>
        <module-hero
            title="Rob Sterlini"
        >
            <p class="hero-subtitle large" slot="subtitle">Senior Frontend Developer at Fueled by day;  <br>amateur-triathlete and LEGO master builder by night.</p>
        </module-hero>

        <section
            :class="[
                'grid',
                'home-section',
                'home-work'
            ]"
        >
            <h2 class="h3 h--side">At work</h2>
            <div class="home-work__col">
                <h3 class="h2">Fueled</h3>
                <p class="p">At Fueled I’ve created sites for global business, tech startups, established brands, and the like. It has also afforded me the opportunity to push the boundaries of the web, with imaginative case studies, and novel user experiences.</p>
            </div>
            <div class="home-work__col">
                <h3 class="h2">Freelance</h3>
                <p class="p">As a freelance creative developer, and in past jobs, I’ve had the great pleasure of working with friends like the guys at Kickpush, reimagining the University of Reading site from the ground up, and making fledgeling companies’ early web prescences a reality.</p>
            </div>
        </section>
    </main>
</template>

<script>
// Models
import meta from 'models/global/meta.js';

// Services
import { createMeta } from 'services/meta.js';

// Modules
import ModuleHero from 'modules/hero';

// Export
export default {
    name: 'view-home',

    // Meta data
    metaInfo: {
        title: meta.home.title,
        meta: createMeta(meta.home.meta),
    },

    // Components
    components: {
        ModuleHero,
    },
};
</script>
