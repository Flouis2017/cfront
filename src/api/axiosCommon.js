import router from '../router'

//let a = {name: hello , age : 10}
//qs.Stringfy(a)
//name=hello&age=13
import Qs from 'qs';

//包装了ajax，方便http调用
import axios from 'axios';

//通用公共方法(包含回调)
/*参数说明：baseUrl：域名+端口号*/
export const reqRealEndAsync = (method, baseUrl, url, params, callback) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),
        //false -- split
        //true -- List<String>
        traditional: true,
    }).then(res => {
        let result = res.data;
        if (result.flag == false) {
            // 请求失败
            router.replace({
                path: "login",
                query: {
                    msg: result.message
                }
            });
        } else {
            // 成功回调
            if (callback != undefined) {
                callback(result.code, result.message, result.data);
            }
        }
    });
};

//通用公共方法(不包含回调)
export const reqRealEnd = (method, baseUrl, url, params) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),
        //false -- split
        //true -- List<String>
        traditional: true,
    });
};