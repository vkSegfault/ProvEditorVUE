import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import YourAssetsView from "@/views/YourAssetsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import OneAssetView from "@/views/OneAssetView.vue";
import AddAssetView from "@/views/AddAssetView.vue";
import EditAssetView from "@/views/EditAssetView.vue";

const router = createRouter({
    // we can use back button with history
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/assets',
            name: 'assets',
            component: YourAssetsView
        },
        {
            path: '/asset/:type/:id',
            name: 'asset-id',
            component: OneAssetView
        },
        {
            path: '/asset/add',
            name: 'asset-add',
            component: AddAssetView,
            children: [
                {
                    path: '',
                    name: 'asset-add-generic',
                    component: AddAssetView
                },
                {
                    path: ':type',
                    name: 'asset-add-particular',
                    component: AddAssetView
                }
            ]
        },
        {
            path: '/asset/edit/:type/:id',
            name: 'asset-edit',
            component: EditAssetView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        }
    ],
});

export default router;