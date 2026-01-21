import { createRouter, createWebHistory } from 'vue-router';

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
      {
        path: 'payment/:id',
        name: 'Payment',
        component: () => import('@/views/front/Payment.vue'),
        meta: {
          title: 'Payment',
        },
      },
      {
        path: 'finish/:id',
        name: 'Finish',
        component: () => import('@/views/front/Finish.vue'),
        meta: {
          title: 'Finish',
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/front/NotFound.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: '',
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        top: 100,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
