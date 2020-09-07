import {reqWithoutCallbackAsync, reqWithCallbackAsync} from './axiosCommon'

import {config} from './frontConfig'

import store from '../store/index'

//查资金
export const queryBalance = () => {
    reqWithCallbackAsync("post", config.real_domain, '/api/queryBalance',
        {uid: sessionStorage.getItem('uid')}, (code, msg, data) => {
            store.commit("updateBalance", data.balance);
        });
};

//查持仓
export const queryPosiList = (params) => {
    params.uid = sessionStorage.getItem('uid');
    reqWithCallbackAsync("post", config.real_domain, '/api/queryPosiList', params,
        (code, msg, data) => {
            // store.state.posiData = data;
            store.commit("updatePosi", data)
        });
};

//查股票代码-下拉选择框里面的数据
export const queryStocks = (params) => {
    return reqWithoutCallbackAsync("post", config.real_domain, '/api/stockSelect', params);
};

//查委托
export const queryOrder = () => {
    reqWithCallbackAsync("post", config.real_domain,
        '/api/orderinfo',
        {uid: sessionStorage.getItem('uid')},
        (code, msg, data) => {
            store.commit("updateOrder", data)
        })
};

//查成交
export const queryTrade = () => {
    reqWithCallbackAsync("post", config.real_domain,
        '/api/tradeinfo',
        {uid: sessionStorage.getItem('uid')},
        (code, msg, data) => {
            store.commit("updateTrade", data)
        })
};

//发送委托
export const sendOrder = (params, callback) => {
    return reqWithCallbackAsync("post", config.real_domain, '/api/order', params, callback);
};

// 委托
export const cancelOrder = (params,callback) => {
    return reqWithCallbackAsync("post", config.real_domain, '/api/cancelorder', params, callback);
};