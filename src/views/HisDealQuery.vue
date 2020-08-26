<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-s-order"/> 查询
				</el-breadcrumb-item>
				<el-breadcrumb-item>历史成交</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<el-card shadow="hover" class="container">
			<his-deal-list/>
		</el-card>
	</div>
</template>

<script>

	import HisDealList from '../components/HisDealList'

	export default {
		name: "HisDealQuery",
		components: {
			HisDealList
		}
	}
</script>

<style scoped>

</style>