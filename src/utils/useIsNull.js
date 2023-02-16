/**
 * 判断一个变量的值是否为空(空字符、null或undefined)
 * @param {*} value 
 * @returns {boolean}
 */
export function useIsNull(value) { 
  if (value === '' || value === null || value === undefined) {
    return true
  } else { 
    return false
  }
}