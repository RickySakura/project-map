var timeout = null

/**
 * 防抖函数
 * @param {Function} fn 
 * @param {number} delay 
 * @returns 
 */
export function debounce(fn, delay = 500) {
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(fn, delay)
  }
}