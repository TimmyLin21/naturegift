import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/front/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/front/Login.vue'),
        meta: {
          title: 'Login',
        },
      },
      {
        path: '/shop',
        name: 'Shop',
        component: () => import('@/views/front/Shop.vue'),
        meta: {
          title: 'Shop',
        },
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/front/Checkout.vue'),
        meta: {
          title: 'Checkout',
        },
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Admin.vue'),
    meta: {
      title: 'Admin',
    },
    children: [
      {
        path: '/admin/product',
        name: 'Product',
        component: () => import('@/views/admin/Product.vue'),
        meta: {
          title: 'Admin Product',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
