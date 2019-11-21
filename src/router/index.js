import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('../views/Wallet.vue'),
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import('../views/Transaction.vue'),
  },
  {
    path: '/history/:id',
    name: 'history',
    props: true,
    component: () => import('../views/History.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
