<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-s-order"/> 委托
				</el-breadcrumb-item>
				<el-breadcrumb-item>买入</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<el-card shadow="hover" class="container">
			<el-row>
				<!-- 委托组件 -->
				<el-col :span="12">
					<order-form :direction="0"/>
				</el-col>

				<!-- 订单簿组件 -->
				<el-col :span="12">
					<order-book/>
				</el-col>
			</el-row>

			<!-- 资金持仓组件 -->
			<posi-list/>

		</el-card>
	</div>
</template>

<script>

	import PosiList from '../components/PosiList'
	import OrderForm from '../components/OrderForm'
	import OrderBook from '../components/OrderBook'

	export default {
		name: "Buy",
		components: {PosiList, OrderForm, OrderBook}
	}
</script>

<style scoped>

</style>