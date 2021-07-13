
require('./main')
import '../sass/page.scss'
import {
  getUrlParams
} from './libs/utils'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'

console.log(getUrlParams())
