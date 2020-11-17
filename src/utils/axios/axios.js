/*  引入axios 核心库 */
import axios from 'axios';

//重新创建实例
const http = axios.create({
    baseURL:'/api'
});

/* 请求拦截 */
http.interceptors.request.use(req => {
    //登录成功之后得到token，并把token从离线存储中取出来赋值给authorization
    let userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : {};
    //我们的需求是在请求头加内容
    //后端要求的令牌名字叫 authorization
    req.headers.authorization = userInfo.token;
    //返回你的所有请求信息
    return req;
  });
  //响应拦截
  http.interceptors.response.use(res => {
    //全局拦截错误
    if (res.data.code == 403) {
      alert(res.data.msg);
      //全局拦截错误之后，跳转到登录
      router.push("/login");
      return res;
    } else if (res.data.code == 500) {
      alert(res.data.msg);
      //全局拦截错误之后，跳转到登录
      router.push("/login");
      return res;
    }else{
        return res
    }
  });
  
  //导出http实例
  export default http;
  