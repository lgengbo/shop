import { Toast } from 'vant'
import 'vant/lib/index.css'
const util = {}

// 成功弹框
util.toastSuccess = function (text) {
  Toast.success(text)
}
// 失败弹框
util.toastFail = function (text) {
  Toast.fail(text)
}
// loding弹框
util.toastLoading = function (text = '', duration = 2000, loadingType = '') {
  Toast.loading({
    message: text,
    forbidClick: true,
    duration: duration,
    loadingType: loadingType
  })
}

export default util
