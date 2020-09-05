<template>
	<!--
		v-model：自动提示框最终显示的内容
		fetch-suggestions：获取自动提示的数据的接口（关键），默认参数两个：第一个搜索关键字，第二个回调方法用于展示下拉列表
		trigger-on-focus：是否得到焦点后立马进行自动提示
		debounce：停顿多少毫秒后开始进行自动提示
		@select：自动提示框发出的消息
	 -->
	<el-autocomplete style="width: 100%" size="small" placeholder="代码/简称" :fetch-suggestions="querySearchAsync"
		:trigger-on-focus="false" v-model="content" :debounce=100 @select="updateInput"/>
</template>

<script>

	import {queryStocks} from '../api/orderApi'

	export default {
		name: "AutoCompleteInput",
		data(){
			return {
				content: ""
			}
		},
		methods: {
			querySearchAsync(queryString, callback){
				// 从后台获取数据，目前只是模拟
				/*{code:'000001', name: '平安银行', value: '000001-平安银行'},
				{code:'600000', name: '浦发银行', value: '600000-浦发银行'}*/
				// let list = [];
				queryStocks({uid: sessionStorage.getItem("uid"), key: queryString})
				.then( res => {
					// console.log(res);
					let jsonResult = res.data;
					if (jsonResult.flag){
						if (jsonResult.code != 2000){
							this.$message.error(jsonResult.msg);
						} else {
							let tmpList  = jsonResult.data;
							for (let i of tmpList){
								i.value = i.code + "--" + i.name;
							}
							// 特别要注意——大坑！
							// 上面处理list时，必须对每个元素加上value，否则el-autocomplete无法识别就无法补全下拉框！！
							callback(tmpList);
						}
					} else {
						this.$message.error(jsonResult.msg);
					}
				});
			},
			updateInput(item){
				this.content = item.value;
				this.$bus.emit('autoinput-selected', item);
			}
		}
	}
</script>

<style lang="scss">
	.wide-dropdown {
		width: 600px !important;
	}
</style>