<template>
	<div class="orderForm">
		<el-form label-width="80px">
			<!-- 提示栏 -->
			<el-form-item>
				<h3 :style="direction === 0 ? 'color.#F56C6C' : 'color.#67C23A'">
					{{direction === 0 ? '买入' : '卖出'}}股票
				</h3>
			</el-form-item>

			<!-- 股票自动提示框 -->
			<el-form-item label="委托对象">
				<auto-complete-input/>
			</el-form-item>

			<!-- 可买/可卖数量 -->
			<el-form-item :label="'可' + (direction === 0 ? '买' : '卖') + '(股)'">
				<el-input readonly v-model="affordCount"/>
			</el-form-item>

			<!-- 报价 -->
			<el-form-item label="委托报价">
				<el-input-number v-model="price" @change="handlePrice" controls-position="right" :step="0.01" :min="0.01"/>
			</el-form-item>

			<!-- 数量 -->
			<el-form-item label="委托数量">
				<el-input-number v-model="count" controls-position="right" :step="100" :min="0" :max="affordCount"/>
			</el-form-item>

			<!-- 按钮 -->
			<el-form-item>
				<el-button style="float: right" @click="onOrder">
					{{direction === 0 ? '买入' : '卖出'}}
				</el-button>
			</el-form-item>

		</el-form>
	</div>
</template>

<script>

	import AutoCompleteInput from '../components/AutoCompleteInput'

	import {sendOrder} from '../api/orderApi'
	import {constants} from '../api/constants'

	export default {
		name: "OrderForm",
		data(){
			return {
				affordCount: undefined,
				price: undefined,
				count: undefined,
				code: ''
			}
		},
		props: {
			direction: {types: Number, required: true}
		},
		components: {
			AutoCompleteInput
		},
		methods: {
			handlePrice(){
				if (this.direction === constants.SELL){
					let posiArr = this.$store.state.posiList;
					for (let i = 0, len = posiArr.length; i < len; i++){
						if (posiArr[i].code === this.code){
							this.affordCount = posiArr[i].count;
						}
					}
				} else {
					// 总资金除以委托价格
					this.affordCount = parseInt(this.$store.state.balance/this.price);
				}
			},
			updateAutoInfo(item){
				this.code = item.code;
				this.price = undefined;
				this.count = undefined;
			},
			onOrder(){
				sendOrder({
					uid: sessionStorage.getItem('uid'),
					cmdType: constants.NEW_ORDER,
					code: this.code,
					direction: this.direction,
					price: this.price,
					count: this.count,
					orderType: constants.LIMIT,
					status: constants.ORDERED
				}, (code, msg, data)=>{
					if (code != 2000){
						this.$message.error(msg);
					} else {
						this.$message.success("委托成功");
					}
				});
			}
		},
		created(){
			this.$bus.on("autoinput-selected", this.updateAutoInfo);
		},
		beforeDestroy(){
			this.$bus.off("autoinput-selected", this.updateAutoInfo);
		}

	}
</script>

<style lang="scss">
	.orderForm {
		input {
			text-align: center;
		}
		.el-input-number {
			width: 100%;
		}
	}
</style>