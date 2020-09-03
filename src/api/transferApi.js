import {reqWithCallbackAsync} from './axiosCommon';

import {config} from './frontConfig'

export const transfer  = (params, callback) =>{
    return reqWithCallbackAsync("post", config.real_domain, "/transfer/doTransfer", params, callback);
};

export const queryTransfer = (params, callback) =>{
    return reqWithCallbackAsync("post", config.real_domain, "/transfer/transferquery", params, callback);
};