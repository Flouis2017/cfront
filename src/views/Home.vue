<template>

	<div>
		<!-- 引入头部导航栏 -->
		<v-header/>

		<!-- 引入侧边导航栏 -->
		<v-sidebar/>

		<!-- 主页面业务 -->
		<div class="content-box" :class="{'content-collapse':collapse}">
			<div class="content">
				<router-view/>
			</div>
		</div>
	</div>

</template>

<script>

	import vHeader from '../components/Header'
	import vSidebar from '../components/Sidebar'

	export default {
		name: 'Home',
		data(){
			return{
				collapse: false
			}
		},
		components: {
			vHeader,
			vSidebar
		},
		created(){
			this.$bus.on("collapse-content", msg =>{
				this.collapse = msg;
			});
		},
		beforeDestroy(){
			this.$bus.off("collapse-content", msg =>{
				this.collapse = msg;
			});
		}
	}

</script>
