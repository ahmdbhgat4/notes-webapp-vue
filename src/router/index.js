import { createRouter, createWebHistory } from 'vue-router';
import HomeWiew from '@/views/HomeWiew.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/notes',
            name: 'home',
            component: HomeWiew,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        } else {
            const mainElement = document?.querySelector('#main');
            if (mainElement) {
                const marginTop = parseFloat(getComputedStyle(mainElement).scrollMarginTop);
                return { el: mainElement, top: marginTop };
            }
            return { top: 0, behavior: 'smooth' };
        }
    },
});

export default router;
