<template>
	<div>
		<!-- 页面信息的提示文字 -->
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-baseball"/> 银证转账
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<el-card shadow="hover" class="container">
			<el-row style="padding: 0 15%;">
				<el-form label-width="80px">
					<!-- 转账方式 -->
					<el-form-item label="转账方式">
						<el-select style="width: 100%" v-model="defaultType">
							<el-option v-for="item in form.typeArr" :key="'type_' + item.id" :label="item.name" :value="item.id"/>
						</el-select>
					</el-form-item>

					<!-- 银行 -->
					<el-form-item label="银行">
						<el-select style="width: 100%" v-model="defaultBank">
							<el-option v-for="item in form.bankArr" :key="'bank_' + item.id" :label="item.name" :value="item.id"/>
						</el-select>
					</el-form-item>

					<!-- 银行密码 -->
					<el-form-item label="银行密码">
						<el-input type="password" v-model="form.password"/>
					</el-form-item>

					<!-- 选择币种 -->
					<el-form-item label="币种">
						<el-select style="width: 100%" v-model="defaultCurrency">
							<el-option v-for="item in form.currencyArr" :key="'currency_' + item.id" :label="item.name" :value="item.id"/>
						</el-select>
					</el-form-item>

					<!-- 金额 -->
					<el-form-item label="金额">
						<el-input v-model="form.amount"/>
					</el-form-item>

					<el-form-item>
						<el-button style="float: right" size="small" type="primary" @click="transferSubmit">转账</el-button>
					</el-form-item>
				</el-form>
			</el-row>
		</el-card>
	</div>
</template>

<script>

	import encryptMD5 from 'js-md5'
	import {transfer} from '../api/transferApi'

	export default {
		name: "Transfer",
		data(){
			return {
				form: {
					typeArr: [{id: 0, name: "转出"}, {id: 1, name: "转入"}],
					bankArr: [{id: 0, name: "建设银行"}, {id: 1, name: "农业银行"}, {id: 2, name: "招商银行"}],
					currencyArr: [{id: 0, name: "人民币"}], // , {id: 1, name: "美元"}, {id: 2, name: "日元"}
					password: '',
					amount: 0
				},
				defaultType: 0,
				defaultBank: 0,
				defaultCurrency: 0
			}
		},
		methods: {
			transferSubmit(){
				let params = {
					uid: sessionStorage.getItem("uid"), type: this.defaultType,
					bank: this.defaultBank, moneytype: this.defaultCurrency,
					password: encryptMD5(this.form.password), money: this.form.amount
				};
				transfer(params, (code, msg, data) => {
					if (code != 2000) {
						this.$message.error(msg);
					} else {
						this.$message.success(msg);
					}
				});
			}
		}
	}
</script>

<style scoped>

</style>