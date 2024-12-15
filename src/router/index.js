import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import ConfirmMailView from "@/views/ConfirmMailView.vue";
import ProvinceListView from "@/views/ProvinceListView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import OneAssetView from "@/views/OneAssetView.vue";
import AddProvinceView from "@/views/AddProvinceView.vue";
import EditAssetView from "@/views/EditAssetView.vue";
import CountryAddView from "@/views/CountryAddView.vue";

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
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/confirmmail',
            name: 'confirmmail',
            component: ConfirmMailView
        },
        {
            path: '/provinces',
            name: 'provinces',
            component: ProvinceListView
        },
        {
            path: '/asset/:type/:id',
            name: 'asset-id',
            component: OneAssetView
        },
        {
            path: '/province/add',
            name: 'province-add',
            component: AddProvinceView,
            children: [
                {
                    path: '',
                    name: 'province-add-generic',
                    component: AddProvinceView
                },
                {
                    path: ':type',
                    name: 'province-add-particular',
                    component: AddProvinceView
                }
            ]
        },
        {
            path: '/asset/edit/:type/:id',
            name: 'asset-edit',
            component: EditAssetView,
        },
        {
            path: '/country/add',
            name: 'country-add',
            component: CountryAddView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        }
    ],
});

export default router;