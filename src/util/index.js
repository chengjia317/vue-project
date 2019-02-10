import filter from './filter'
import validate from './validate'
import { Toast } from 'vant'

function install(Vue){
  Vue.prototype.$op={
    'loading':(msg='加载中...')=>{
      Toast.loading({
        type:'loading',
        message:msg,
        duration:0
      })
    },
    filter,
    validate
  }
}

export default install
