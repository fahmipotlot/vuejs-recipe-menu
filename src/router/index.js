import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/category',
        name: 'category.index',
        component: () => import( /* webpackChunkName: "categoryindex" */ '../views/category/index.vue')
    },
    {
        path: '/category/create',
        name: 'category.create',
        component: () => import( /* webpackChunkName: "categorycreate" */ '../views/category/create.vue')
    },
    {
        path: '/category/edit/:id',
        name: 'category.edit',
        component: () => import( /* webpackChunkName: "categoryedit" */ '../views/category/edit.vue')
    },
    {
        path: '/recipe',
        name: 'recipe.index',
        component: () => import( /* webpackChunkName: "recipeindex" */ '../views/recipe/index.vue')
    },
    {
        path: '/recipe/create',
        name: 'recipe.create',
        component: () => import( /* webpackChunkName: "recipecreate" */ '../views/recipe/create.vue')
    },
    {
        path: '/recipe/edit/:id',
        name: 'recipe.edit',
        component: () => import( /* webpackChunkName: "recipeedit" */ '../views/recipe/edit.vue')
    },
    {
        path: '/menu',
        name: 'menu.index',
        component: () => import( /* webpackChunkName: "menuindex" */ '../views/menu/index.vue')
    },
    {
        path: '/menu/create',
        name: 'menu.create',
        component: () => import( /* webpackChunkName: "menucreate" */ '../views/menu/create.vue')
    },
    {
        path: '/menu/edit/:id',
        name: 'menu.edit',
        component: () => import( /* webpackChunkName: "menuedit" */ '../views/menu/edit.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router