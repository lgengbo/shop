/* eslint-disable */
import axios from 'axios';
import { Toast } from 'vant'
import 'vant/lib/index.css'
import store from '../store/index';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 拦截器
axios.interceptors.response.use(
  res => {
    // console.log(res)
    // res.headers.authorization && store.state.user.token !== res.headers.authorization && (store.state.user.token = res.headers.authorization,sessionStorage.setItem('token', res.headers.authorization))
    // console.log(res.headers.authorization)
    return res
  },
  (error) => {
    if (error.response) {
      if(error.response.status){
        switch (error.response.status) {
          case 302:
            window.vm.$util.logout(window.vm)
            break;
          case 400:
          switch (error.response.data.code){
            case 0: 
            errorModal('请注意！', `${error.response.data.data}`, 1);
            break;
          }
            break;
          case 401:
          sessionStorage.clear();
          window.vm.$store.commit('logout');
          location.reload();
            break
          case 402:
          sessionStorage.clear();
          window.vm.$store.commit('logout');
          location.reload();
            break;
          case 404:
            window.vm.$router.push({path: '/notFound'})
            break;
          case 500:
            switch (error.response.data.code) {
              case 1:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 500:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 1001:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 1002:
                errorModal('请注意！', `参数格式错误`, 1);
                break;
              case 1004:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 1005:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2003:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2004:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2005:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2006:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2007:
                window.vm.$util.logout(window.vm)
              //   errorModal('请注意！', `系统非法访问`, 2);
                break;
              case 2008:
                errorModal('请注意！', `${error.response.data.message.name}`, 2008);
                break;
              case 2009:
                errorModal('请注意！', `${error.response.data.message.name}`, 2);
                break;
              case 2011:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2012:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2013:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case 2014:
                Toast.fail(`请注意！${error.response.data.message.name}`)
                break;
              case undefined:
                break;
              default:
                Toast.fail('请注意异常')
                break;
            }
            break;
          default:
            break;
        }
      }
      
    }
    return Promise.resolve(error.response);
  },
);

export default {
  post: (apiurl, data, responseType) => new Promise((resolve, reject) => {
    axios({ method: 'post', url: apiurl, data, responseType })
      .then((res) => {
        store.commit('setLoadingFlag', false);
        if ( res.status === 200 ) { resolve( res ) } else if ( res.status === 500 ) { reject( res.data ) };
      }).catch(() => {
        store.commit('setLoadingFlag', false);
      })
  }),
  get: (apiurl, params)  => new Promise((resolve, reject) => {
      axios({
        method: 'get', url: apiurl, params,
      }).then((res) => {
        store.commit('setLoadingFlag', false);
        if ( res.status === 200 ) { resolve( res );} else if ( res.status === 500 ) { reject( res.data ) };
      }).catch(() => {
        store.commit('setLoadingFlag', false);
      })
  }),
};
