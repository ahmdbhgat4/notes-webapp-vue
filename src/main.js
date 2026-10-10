import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueAwesomePaginate from 'vue-awesome-paginate';
import App from '@/App.vue';
import router from '@/router';
import 'vue-awesome-paginate/dist/style.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.use(VueAwesomePaginate);

app.mount('#app');
