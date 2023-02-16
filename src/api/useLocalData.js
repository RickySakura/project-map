import mapInfos from '@/assets/mapInfos.json'
import axios from 'axios'


// let { data: mapInfos } = await axios.get('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/ec18df70-f18a-4929-8f73-171464742bf9.json')
/**
 * 从本地的 mapInfos.json 文件中获取数据
 * @param {string | string[]} keys 需要获取的key或key值数组,如果不传则获取整个数据对象
 * @returns {*} 获取的数据结果
 */
export function useLocalData(keys) {
  if (!keys) {
    return mapInfos
  }
  if (typeof keys === 'string') {
    return mapInfos[keys]
  }
  if (Array.isArray(keys)) {
    let result = {}
    keys.forEach(key => {
      result[key] = mapInfos[key]
    })
    return result
  }
  return {
    errorMessage: '类型错误: 参数keys的类型必须是string或string[]！'
  }
}