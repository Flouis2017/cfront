<template>
	<div>
		<!-- 可用资金 -->
		<el-row>
			<el-col :span="5">
				可用资金：{{balance}}
			</el-col>
		</el-row>

		<!-- 持仓列表 -->
		<el-table :data="tableData.slice((query.currentPage - 1)*query.pageSize, query.currentPage*query.pageSize)"
				  border :cell-style="cellStyle" @sort-change="handleTableSort">
			<el-table-column align="center" prop="code" label="股票代码" sortable :sort-orders="['ascending', 'descending']"/>
			<el-table-column align="center" prop="name" label="股票名称"/>
			<el-table-column align="center" prop="count" label="持有数量"/>
			<el-table-column align="center" prop="cost" label="成本价"/>
			<!--<el-table-column align="center" label="成本"/>-->
		</el-table>

		<!-- 分页控件和刷新按钮 -->
		<div class="pagination">
			<el-button round type="primary" size="mini" style="margin-top: 2px; float: right" icon="el-icon-refresh" @click="refresh">
				刷新
			</el-button>
			<el-pagination background layout="total, prev, pager, next" :current-page="query.currentPage"
						   :page-size="query.pageSize" :total="total" @current-change="handlePageChange"/>
		</div>
	</div>
</template>

<script>

	import {queryBalance, queryPosiList} from '../api/orderApi'

	export default {
		name: "PosiList",
		created(){
			this.balance = this.initBalance;
			this.tableData = this.initPosiList;
		},
		computed: {
			initBalance(){
				return this.$store.state.balance;
			},
			initPosiList(){
				return this.$store.state.posiList;
			}
		},
		watch: {
			initBalance: function(val){
				this.balance = val;
			},
			initPosiList: function (val) {
				this.tableData = val;
				this.total = val.length;
			}
		},
		data(){
			return {
				balance: 0,
				tableData: [
					/*{code: '600025', name: '华能水电', count: 100, cost: 20},
					{code: '600000', name: '浦发银行', count: 100, cost: 12},
					{code: '600001', name: '平安银行', count: 100, cost: 22},
					{code: '600886', name: '国投电力', count: 100, cost: 26},*/
				],
				total: 0,
				query: {
					currentPage: 1, // 当前页
					pageSize: 4 // 每页显示几条
				}
			}
		},
		methods: {
			refresh(){
				queryBalance();
				queryPosiList({isRefresh: true});
			},
			cellStyle({row, column, rowIndex, columnIndex}){
				// return "padding: 2px";
			},
			handlePageChange(val){
				this.$set(this.query, 'currentPage', val);
			},
			handleTableSort(column){
				if (column.order == 'descending'){
					this.tableData = this.tableData.sort(
							(a, b) => b[column.prop] - a[column.prop]
					);
				} else {
					this.tableData = this.tableData.sort(
							(a, b) => a[column.prop] - b[column.prop]
					);
				}
			}
		}
	}
</script>

<style scoped>

</style>