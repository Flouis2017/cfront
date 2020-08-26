<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-s-order"/> 查询
				</el-breadcrumb-item>
				<el-breadcrumb-item>当日成交</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<el-card shadow="hover" class="container">
			<deal-list/>
		</el-card>
	</div>
</template>

<script>
	import DealList from '../components/DealList'

	export default {
		name: "DealQuery",
		components: {
			DealList
		}
	}
</script>

<style scoped>

</style>