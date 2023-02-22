// 将路由与状态中的mapType连接起来,即 mapType 的改变同时也会改变路由地址，路由地址改变也会改变 mapType
import router from "@/router/index";
import { useMapStore } from "@/stores/mapStore";

router.beforeEach((to) => {
  // ✅ 这将起作用，因为路由器在之后开始导航
  // 路由已安装，pinia 也将安装
  const store = useMapStore()
  if (to.path.includes('/map') && to.name) {
    // 当路由改变时，改变 mapType 状态
    store.mapType = to.name
  }
})