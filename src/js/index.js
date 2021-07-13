require('./main')
import '../sass/index.scss'
import {
  getUrlParams,
  phoneNumber
} from './libs/utils'

import 'bootstrap-datepicker/dist/js/bootstrap-datepicker'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'

import {
  join
} from 'lodash'

const str = join(['Hello', 'webpack index.html'], ' ')
console.log(str)
const obj = {
  'a': 1,
  'b': 2
}

const key = _.mapKeys(obj, function (value, key) {
  return key + value
})
import logo from '../asset/logo.png'
import large from '../asset/large.jpg'
$('.logo-import img').attr('src', logo)
$('.large-import img').attr('src', large)
console.log(key)
$('.datepicker').datepicker({
  language: 'zh-CN'
})

$('#sweetalert2').on('click', function () {

  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
})

console.log(getUrlParams())
console.log(phoneNumber('15528081788'))
