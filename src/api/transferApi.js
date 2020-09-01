import {reqWithCallbackAsync} from './axiosCommon';

import {config} from './frontConfig'

export const queryTransfer = (params,callback) =>{
    return reqWithCallbackAsync("post",config.real_domain,
        '/api/transferquery',params,callback);
};