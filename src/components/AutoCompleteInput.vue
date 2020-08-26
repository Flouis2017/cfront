<template>
	<!--
		v-model：自动提示框最终显示的内容
		fetch-suggestions：获取自动提示的数据的接口（关键）
		trigger-on-focus：是否得到焦点后立马进行自动提示
		debounce：停顿多少毫秒后开始进行自动提示
		@select：自动提示框发出的消息
	 -->
	<el-autocomplete style="width: 100%" size="small" placeholder="代码/简称" :fetch-suggestions="querySearchAsync"
		:trigger-on-focus="false" v-model="content" :debounce=100 @select="updateInput"/>
</template>

<script>
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
				let list = [
					{code:'000001', name: '平安银行', value: '000001-平安银行'},
					{code:'600000', name: '浦发银行', value: '600000-浦发银行'}
				];

				callback(list);
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