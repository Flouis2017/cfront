import {reqWithCallbackAsync} from './axiosCommon'

import {config} from './frontConfig'
import router from '../router'

// 获取验证码
export const queryCaptcha = (callback) => {
    return reqWithCallbackAsync("post", config.real_domain, "/login/captcha", {}, callback);
};

// 登录
export const login = (params, callback) => {
    return reqWithCallbackAsync("post", config.real_domain, "/login/doLogin", params, callback);
};

// 退出登录
export const logout = (params, callback) => {
    reqWithCallbackAsync("post", config.real_domain,'/login/logout', params, callback);
};

// 退出登录回调=>清除sessionStorage中的uid和token
export const logoutCallback = (code, msg, data) => {
    debugger;
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
};

// 修改密码
export const pwdUpdate = (params, callback) => {
    return reqWithCallbackAsync("post", config.real_domain, '/user/password', params, callback);
};










