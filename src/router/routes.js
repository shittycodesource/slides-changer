import MainView from '../views/MainView.vue';
import AuthView from '../views/AuthView.vue';
import PanelView from '../views/PanelView.vue';

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainView
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView
    },
    {
        path: '/panel',
        name: 'panel',
        meta: { authOnly: true },
        component: PanelView
    },
    {
        path: '/upload',
        name: 'upload',
        meta: { authOnly: true },
        component: () => import('../views/UploadView.vue')
    }
]

export default routes;