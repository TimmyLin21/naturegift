import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Front',
    component: () => import('@/views/front/Front.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/Login.vue'),
        meta: {
          title: 'Login',
        },
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/front/Shop.vue'),
        meta: {
          title: 'Shop',
        },
      },
      {
        path: 'checkout',
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
        path: 'product',
        name: 'Product',
        component: () => import('@/views/admin/Product.vue'),
        meta: {
          title: 'Admin Product',
        },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('@/views/admin/Coupon.vue'),
        meta: {
          title: 'Admin Coupon',
        },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/admin/Order.vue'),
        meta: {
          title: 'Admin Order',
        },
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/admin/Article.vue'),
        meta: {
          title: 'Admin Article',
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
