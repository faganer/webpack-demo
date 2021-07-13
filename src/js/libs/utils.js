import {
  split
} from 'lodash'

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
  const pattern =  /[1-9]([0-9]{5,11})/
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
  getUrlParams,
  identityNumber,
  phoneNumber,
  qq,
  teleNumber,
  zipCode
}
