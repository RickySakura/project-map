import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import router from './router'
import App from './App.vue'
import '@/utils/mediaQuery'
import '@/utils/routeMatchMapType'
import './style.less'
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate)).use(router).use(ElementPlus).use({
  // 对 el-loading 样式的全局修改
  install(app) {
    let loadingFn = app.config.globalProperties.$loading
    app.config.globalProperties.$loading = (options) => {
      return loadingFn({
        ...options,
        lock: true,
        text: "数据加载中...",
        background: "rgba(0, 0, 0, 0.7)",
      })
    }
    // let service = ElLoading.service
    // ElLoading.service = (options) => { 
    //   return service({
    //     ...options,
    //     lock: true,
    //     text: "数据加载中...",
    //     background: "rgba(0, 0, 0, 0.7)",
    //   })
    // }
    document.body.style.setProperty('--el-mask-color', 'rgba(0, 0, 0, 0.7)')
  }
})
app.mount('#app')