<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
		unique-opened router :collapse="collapse" :default-active="onRoutes">

			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"/>
							<span slot="title">{{item.title}}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-menu-item :index="subItem.index" :key="subItem.index">
								{{subItem.title}}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"/>
						<span slot="title">{{item.title}}</span>
					</el-menu-item>
				</template>
			</template>

		</el-menu>

	</div>
</template>

<script>
	export default {
		name: "Sidebar",
		data(){
			return {
				collapse: false,
				items: [
					{
						icon: 'el-icon-pie-chart',
						index: 'dashboard',
						title: '资金股份'
					},
					{
						icon: 'el-icon-s-order',
						index: 'buy',
						title: '买入'
					},
					{
						icon: 'el-icon-sell',
						index: 'sell',
						title: '卖出'
					},
					{
						icon: 'el-icon-search',
						index: '3',
						title: '查询',
						subs: [
							{
								index: 'orderquery',
								title: '当日委托'
							},
							{
								index: 'dealquery',
								title: '当日成交'
							},
							{
								index: 'hisorderquery',
								title: '历史委托'
							},
							{
								index: 'hisdealquery',
								title: '历史成交'
							},
						]
					},

					{
						icon: 'el-icon-bank-card',
						index: '4',
						title: '银证业务',
						subs: [
							{
								index: 'transfer',
								title: '银证转账'
							},
							{
								index: 'transferquery',
								title: '转账查询'
							},
						]
					},
					{
						icon: 'el-icon-user',
						index: '5',
						title: '个人中心',
						subs: [
							{
								index: 'pwdsetting',
								title: '修改密码'
							}
						]
					},
				]
			}
		},
		computed: {
			onRoutes(){
				return this.$route.path.replace('/', '')
			}
		},
		methods: {
			collapseChange(msg){
				this.collapse = msg;
				this.$bus.emit("collapse-content", msg);
			}
		},
		created(){
			// 订阅collapse消息
			this.$bus.on("collapse", msg =>{
				this.collapseChange(msg);
			});
		},
		beforeDestroy(){
			// 取消订阅
			this.$bus.off("collapse", msg =>{
				this.collapseChange(msg);
			});
		}
	}
</script>

<style lang="scss">
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;

		.el-menu-item {
			min-width: 150px;
		}

		li {
			text-align: left;
			.el-tooltip {
				width: auto ! important;
			}
		}

		/*下拉导航菜单多出1px*/
		.el-menu {
			border-right-width: 0;
		}

		.el-menu--collapse {
			width: auto ! important;
		}
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 150px;
	}

	.sidebar > ul {
		height: 100%;
	}
</style>