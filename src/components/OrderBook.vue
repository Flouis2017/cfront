<template>
	<div>
		<el-form label-width="80px">
			<!-- 行情时间 -->
			<el-form-item>
				<h4 style="color: #909399">行情时间：{{marketTime}}</h4>
			</el-form-item>

			<!-- 五档行情 -->
			<el-form-item>

				<!-- 卖 -->
				<div class="orderBook">
					<el-row>
						<el-col :span="6">档位</el-col>
						<el-col :span="10">报价</el-col>
						<el-col :span="6">数量</el-col>
					</el-row>
					<el-row v-for="item in sellList" :key="item.name">
						<!-- 档位名称 -->
						<el-col :span="6">{{item.name}}</el-col>
						<!-- 报价 -->
						<el-col :span="10">{{item.price | filterEmpty}}</el-col>
						<!-- 量 -->
						<el-col :span="6">{{item.count | filterEmpty}}</el-col>
					</el-row>
				</div>

				<!-- 买 -->
				<div class="orderBook">
					<el-row v-for="item in buyList" :key="item.name">
						<!-- 档位名称 -->
						<el-col :span="6">{{item.name}}</el-col>
						<!-- 报价 -->
						<el-col :span="10">{{item.price | filterEmpty}}</el-col>
						<!-- 量 -->
						<el-col :span="6">{{item.count | filterEmpty}}</el-col>
					</el-row>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "OrderBook",
		data(){
			return {
				marketTime: '--:--:--',
				sellList: [
					{name: '卖五', price: 1, count: 100},
					{name: '卖四', price: 2, count: 100},
					{name: '卖三', price: 3, count: 100},
					{name: '卖二', price: 4, count: 100},
					{name: '卖一', price: 5, count: 100}
				],
				buyList: [
					{name: '买一', price: 5, count: 100},
					{name: '买二', price: 4, count: 100},
					{name: '买三', price: 3, count: 100},
					{name: '买四', price: 2, count: 100},
					{name: '买五', price: 1, count: 100}
				]
			}
		},
		filters: {
			filterEmpty(value){
				return value <= -1 ? "-" : value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderBook {
		border: 1px solid #909399;;
		margin-left: 5%;
		margin-right: 5%;

		.el-row {
			.el-col {
				height: 35px;
				line-height: 35px;
			}
		}

		.volumeratio {
			margin: 10px auto;
			border: none;

			.sell {
				height: 10px;
				background: #67C23A;
			}

			.buy {
				height: 10px;
				background: #F56C6C;
			}
		}
	}
</style>