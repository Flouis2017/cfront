<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChange">
			<i v-if="collapse" class="el-icon-s-fold"/>
			<i v-else class="el-icon-s-unfold"/>
		</div>

		<!-- Logo -->
		<div class="logo">XX证券交易系统</div>

		<!-- 用户信息+下拉菜单 -->
		<div class="header-right">
			<div class="header-user-con">
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{username}}
						<i class="el-icon-caret-bottom"/>
					</span>

					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="logoutClick">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>

	</div>
</template>

<script>

import {logout, logoutCallback} from '../api/loginApi'
// import router from '../router'

export default {
	name: "Header",
	data(){
		return {
			collapse: true
		}
	},
	computed: {
		username(){
			let acc = sessionStorage.getItem("uid");
			return acc ? acc : 'guest';
		}
	},
	methods: {
		/*logoutCallback(code, msg, data){
			if (code != 2000){
				this.$message.error(msg);
			} else {
				//移除登录信息
				sessionStorage.removeItem("uid");
				sessionStorage.removeItem("token");
				//跳转登录页面
				router.replace({
					path: "/",
					query: {
						msg: "成功退出"
					}
				});
			}
		},*/
		// 账号下拉菜单事件响应
		handleCommand(command){
			if (command == 'logoutClick'){
				logout({token: sessionStorage.getItem("token")}, logoutCallback);
			}
		},
		collapseChange(){
			this.collapse = !this.collapse;
			this.$bus.emit("collapse", this.collapse);
		}
	}
}
</script>

<style scoped>
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
	}

	.collapse-btn {
		float: left;
		padding: 0 21px;
		cursor: pointer;
		line-height: 70px;
	}

	.header .logo {
		float: left;
		width: 250px;
		line-height: 70px;
	}

	.header-right {
		float: right;
		padding-right: 50px;
	}

	.header-user-con {
		display: flex;
		height: 70px;
		align-items: center;
	}

	.btn-bell .el-icon-bell {
		color: #fff;
	}

	.user-name {
		margin-left: 10px;
	}

	.user-avator {
		margin-left: 20px;
	}

	.user-avator img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.el-dropdown-link {
		color: #fff;
		cursor: pointer;
	}

	.el-dropdown-menu__item {
		text-align: center;
	}

</style>