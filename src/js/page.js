
require('./main')
import '../sass/page.scss'
import {
  docTitle,
  getUrlParams
} from './libs/utils'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'

docTitle('Page')
console.log(getUrlParams())
