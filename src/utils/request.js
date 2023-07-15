
import axios from "axios";

// import store from '@/store'

let request = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

//添加请求拦截器
request.interceptors.request.use((config) => {
    // if(store.state.user.token){
    //     config.headers.token = store.state.user.token;
    // }

    return config;
});
//添加响应拦截器
request.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(error);
});
//对外暴露二次封装的axios
export default request;