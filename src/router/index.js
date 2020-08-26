import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import('../views/Dashboard.vue')
			},
			{
				path: '/pwdsetting',
				name: 'PwdSetting',
				component: () => import('../views/PwdSetting.vue'),
				// meta: {requiredAuth: true}
			},
			{
				path: '/transfer',
				name: 'Transfer',
				component: () => import('../views/Transfer.vue'),
				// meta: {requiredAuth: true}
			},
			{
				path: '/orderquery',
				name: 'OrderQuery',
				component: () => import('../views/OrderQuery.vue')
			},
			{
				path: '/dealquery',
				name: 'DealQuery',
				component: () => import('../views/DealQuery.vue')
			},
			{
				path: '/hisorderquery',
				name: 'HisOrderQuery',
				component: () => import('../views/HisOrderQuery.vue')
			},
			{
				path: '/hisdealquery',
				name: 'HisDealQuery',
				component: () => import('../views/HisDealQuery.vue')
			}
		]
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404.vue')
	},
	{
		path: '*',
		redirect: '/404'
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

// 路由拦截器
router.beforeEach((to, from, next) =>{
	if (to.meta.requiredAuth){
		if (Boolean(sessionStorage.getItem('uid'))){
			next();
		} else {
			next({
				path: '/'
			});
		}
	} else {
		next();
	}
});

export default router
