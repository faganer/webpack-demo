require('./main')
// utils
import {
  docTitle,
  formatNumber,
  getUrlParams,
  listTree,
  phoneNumber
} from './libs/utils'

// datepicker
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'

// bootstrap-plugins
import 'bootstrap-plugins/dist/js/pagination.min.js'

// image
import logo from '../asset/logo.png'
import large from '../asset/large.jpg'

// lodash
import {
  join,
  forEach
} from 'lodash'

// css
import '../sass/index.scss'

// title
docTitle('Index')

// test lodash join
const str = join(['Hello', 'webpack index.html'], ' ')
console.log(str)
const obj = {
  'a': 1,
  'b': 2
}

// test _.mapKeys
const key = _.mapKeys(obj, function (value, key) {
  return key + value
})
console.log(key)

// image
$('.logo-import img').attr('src', logo)
$('.large-import img').attr('src', large)

// datepicker
$('.datepicker').datepicker({
  language: 'zh-CN'
})

// sweetalert2
$('#sweetalert2').on('click', function () {

  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
})

// test utils
console.log(getUrlParams())
console.log(phoneNumber('15528081788'))

const listTreeData = [{
  id: 1,
  parent: 0,
  name: 'a'
}, {
  id: 2,
  parent: 1,
  name: 'b'
}, {
  id: 3,
  parent: 1,
  name: 'c'
}, {
  id: 4,
  parent: 2,
  name: 'd'
}, {
  id: 5,
  parent: 2,
  name: 'e'
}, {
  id: 6,
  parent: 0,
  name: 'f'
}, {
  id: 7,
  parent: 0,
  name: 'g'
}, {
  id: 8,
  parent: 7,
  name: 'h'
}, {
  id: 9,
  parent: 8,
  name: 'i'
}, {
  id: 10,
  parent: 0,
  name: 'j'
}]
const treeData = listTree(listTreeData, 'id', 'parent', 'children', false)

// 树形结构
var treeMenu = ''

function appednMenu(data) {
  forEach(data,function (item) {
    if (item.children) {
      treeMenu += '<li>' + item.name + '<ul>'
      appednMenu(item.children)
      treeMenu += '</ul></li>'
    } else {
      treeMenu += '<li>' + item.name + '</li>'
    }
  })
}
appednMenu(treeData)
$('#tree').append(treeMenu)

// 格式化数字
console.log(formatNumber('1234567890'))
console.log(formatNumber(1234567890))

// eslint-disable-next-line no-undef
new Pagination($('#paginationId'), {
  length: 100,
  current: 1,
  every: 15,
  mode: 'long',
  onClick: function (e) {
    console.log(e.num)
  }
})
