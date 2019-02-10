import { Toast } from 'vant'

export default{
  'tel':(value)=>{
    if (value && !/^1\d{10}$/g.test(value)) {
      Toast('请输入正确的手机号格式')
      return false
    } else {
      return true
    }
  }
}
