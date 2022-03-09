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
        path: 'products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/front/Product.vue'),
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
        component: () => import('@/views/admin/Product.vue'),
        meta: {
          title: 'Admin Product',
        },
      },
      {
        path: 'coupon',
        component: () => import('@/views/admin/Coupon.vue'),
        meta: {
          title: 'Admin Coupon',
        },
      },
      {
        path: 'order',
        component: () => import('@/views/admin/Order.vue'),
        meta: {
          title: 'Admin Order',
        },
      },
      {
        path: 'article',
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
