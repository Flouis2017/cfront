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
				component: () => import('../views/PwdSetting.vue')
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

export default router
