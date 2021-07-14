import {
  assign,
  split,
  isArray,
  isEmpty
} from 'lodash'
const currency = require('currency.js')
import {
  config
} from './config'
const listToTree = require('list-to-tree')

/**
 * 页面标题
 * @author 谢德旭
 * @date 2021-07-14
 * @param {string} str 页面标题，默认为config.title
 * @returns {string}
 */
function docTitle(str) {
  if (!isEmpty(str)) {
    return $('title').html(str + ' - ' + config.title)
  }
  return $('title').html(config.title)
}

/**
 * 格式化数字
 * @author 谢德旭
 * @date 2021-07-14
 * @param {any} str 数字或字符串
 * @param {number} precision 保留多少位小数
 * @param {string} separator 三位相隔的分隔符，默认三位一逗号，即“,”
 * @returns {string}
 */
function formatNumber(str, precision, separator) {
  const options = {
    precision: 2,
    separator: ',',
    symbol: '',
  }
  const params = assign({
    precision: precision,
    separator: separator
  }, options)
  return currency(str, params).format()
}

/**
 * 获取URL传参
 * @author 谢德旭
 * @date 2021-07-13
 * @returns {string} location.search
 */
function getUrlParams() {
  const url = location.search
  let theRequest = new Object()
  if (url.indexOf('?') != '-1') {
    const strs = split(url.substr(1), '&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[split(strs[i], '=')[0]] = unescape(split(strs[i], '=')[1])
    }
  }
  return theRequest
}

/**
 * 身份证号
 * @author 谢德旭
 * @date 2021-07-13
 * @param {string} str
 * @returns {boolean}
 */
function identityNumber(str) {
  const pattern = /\d{17}[\d|x]|\d{15}/
  if (pattern.test(str)) {
    return true
  }
  return false
}

/**
 * 树形机构
 * @author 谢德旭
 * @date 2021-07-14
 * @param {array} array 平行数据
 * @param {string} keyId  (string) Field name for id item. Default: 'id'.
 * @param {string} keyParent (string) Field name for parent id. Default: 'parent'.
 * @param {string} keyChild (string) Field name for children of item. Default 'child'.
 * @param {boolean} emptyChildren (boolean) Flag for allow empty children property in item. Default: false.
 * @returns {array}
 */
function listTree(array, keyId, keyParent, keyChild, emptyChildren) {
  if (isArray(array) && !isEmpty(array)) {
    const options = {
      key_id:'id',
      key_parent:'parent',
      key_child:'child',
      empty_children:false
    }
    const params = assign({
      key_id: keyId,
      key_parent: keyParent,
      key_child: keyChild,
      empty_children: emptyChildren
    },options)
    const ltt = new listToTree(array,params)
    const tree = ltt.GetTree()
    return tree
  }
}

/**
 * 国内手机号
 * @author 谢德旭
 * @date 2021-07-13
 * @param {string} str
 * @returns {boolean}
 */
function phoneNumber(str) {
  const pattern = /0?(13|14|15|17|18|19)[0-9]{9}/
  if (pattern.test(str)) {
    return true
  }
  return false
}

/**
 * QQ
 * @author 谢德旭
 * @date 2021-07-13
 * @param {string} str
 * @returns {boolean}
 */
function qq(str) {
  const pattern = /[1-9]([0-9]{5,11})/
  if (pattern.test(str)) {
    return true
  }
  return false
}

/**
 * 电话号码
 * @author 谢德旭
 * @date 2021-07-13
 * @param {string} str
 * @returns {boolean}
 */
function teleNumber(str) {
  const pattern = /[0-9-()（）]{7,18}/
  if (pattern.test(str)) {
    return true
  }
  return false
}

/**
 * 邮政编码
 * @author 谢德旭
 * @date 2021-07-13
 * @param {string} str
 * @returns {boolean}
 */
function zipCode(str) {
  const pattern = /\d{6}/
  if (pattern.test(str)) {
    return true
  }
  return false
}

export {
  docTitle,
  formatNumber,
  getUrlParams,
  listTree,
  identityNumber,
  phoneNumber,
  qq,
  teleNumber,
  zipCode
}
