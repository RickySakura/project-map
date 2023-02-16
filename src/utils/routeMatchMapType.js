// 将路由与状态中的mapType连接起来
import router from "@/router/index";
import { useMapStore } from "@/stores/mapStore";

router.beforeEach((to) => {
  // ✅ 这将起作用，因为路由器在之后开始导航
  // 路由已安装，pinia 也将安装
  let store = useMapStore()
  if (to.path.includes('/map') && to.name) {
    store.mapType = to.name
  }
})