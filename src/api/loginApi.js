import {reqWithCallbackAsync} from './axiosCommon'

import {config} from './frontConfig'

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

// 修改密码
export const pwdUpdate = (params, callback) => {
    return reqWithCallbackAsync("post", config.real_domain, '/login/pwdupdate', params, callback);
};








