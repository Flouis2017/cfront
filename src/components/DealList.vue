<template>
	<div>
		<!-- 列表表格 -->
		<el-table :data="tableData.slice((query.currentPage - 1)*query.pageSize, query.currentPage*query.pageSize)"
				  border :cell-style="cellStyle" @sort-change="handleTableSort"
				  :default-sort="{prop: 'time', order: 'descending'}">
			<el-table-column align="center" prop="time" label="成交时间" sortable :sort-orders="['ascending', 'descending']"/>
			<el-table-column align="center" prop="code" label="股票代码" sortable :sort-orders="['ascending', 'descending']"/>
			<el-table-column align="center" prop="name" label="股票名称"/>
			<el-table-column align="center" prop="price" label="成交单价"/>
			<el-table-column align="center" prop="count" label="成交数量"/>
			<el-table-column align="center" prop="direction" label="方向"/>
			<el-table-column align="center" prop="status" label="状态"/>
			<!-- 撤单按钮 -->

		</el-table>

		<!-- 分页控件 -->
		<div class="pagination">
			<el-button round type="primary" size="mini" style="margin-top: 2px; float: right" icon="el-icon-refresh" @click="">
				刷新
			</el-button>
			<el-pagination background layout="total, prev, pager, next" :current-page="query.currentPage"
						   :page-size="query.pageSize" :total="total" @current-change="handlePageChange"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DealList",
		data(){
			return {
				tableData: [
					{time: '09:55:58', code: '000001', name: '平安银行', price: 32, count: 100, direction: 1, status: 3},
					{time: '09:50:04', code: '000001', name: '平安银行', price: 31, count: 100, direction: 1, status: 1},
					{time: '09:40:15', code: '600886', name: '国投电力', price: 26, count: 100, direction: 1, status: 3}
				],
				total: 3,
				query: {
					currentPage: 1, // 当前页
					pageSize: 5 // 每页显示几条
				}
			}
		},
		methods: {
			cellStyle({row, column, rowIndex, columnIndex}){
				// return "padding: 2px";
			},
			handlePageChange(val){
				this.$set(this.query, 'currentPage', val);
			},
			handleTableSort(column){
				let sortField = column.prop;
				let sortWay = column.order;
				if (sortWay == 'descending'){
					this.tableData = this.tableData.sort((a, b) =>{
							if (sortField == 'time'){
								return b[sortField] === a[sortField] ? 0 : (b[sortField] > a[sortField] ? 1 : -1);
							} else {
								return b[sortField] - a[sortField];
							}
						}
					);
				} else {
					this.tableData = this.tableData.sort((a, b) =>{
							if (sortField == 'time'){
								return b[sortField] === a[sortField] ? 0 : (b[sortField] > a[sortField] ? -1 : 1);
							} else {
								return b[sortField] - a[sortField];
							}
						}
					);
				}
			}
		}
	}
</script>

<style scoped>

</style>