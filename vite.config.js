/*
 * @Author: 熊浩翔
 * @Date: 2022-11-28 10:33:15
 * @LastEditTime: 2022-11-28 10:33:15
 * @LastEditors: XiongHaoXiang
 * @Description: Vite的配置文件
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import topLevelAwait from 'vite-plugin-top-level-await';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import externalGlobals from 'rollup-plugin-external-globals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components', 'src/components/ui', 'src/views', 'src/layouts'],
    }),
    // 允许打包中使用JS文件顶级async await
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    // 开启打包体积可视化面板
    visualizer({ open: true }),
    // 在打包时自动创建 cdn 引入，来代替打包引入，优化打包体积
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          vueESM: `<script type="importmap">{"imports":{"vue":"https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.js"} }</script>`,
          vueGlobal: `<script src="//unpkg.com/vue@3.2.45"></script>`,
          elementPlusScript: `<script src="//unpkg.com/element-plus@2.2.25"></script><script src="https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js"></script>`,
          elementPlusCSS: `<link rel="stylesheet" href="//unpkg.com/element-plus@2.2.25/dist/index.css" />`,
        },
      },
    }),
  ],
  build: {
    // target: 'es2015'
    // 自定义底层的 Rollup 打包配置, 查看 Rollup 选项文档 获取更多细节 https://rollupjs.org/configuration-options/
    rollupOptions: {
      // 告诉打包工具 在external配置的 都是外部依赖项  不需要打包
      external: ['vue', 'element-plus', 'echarts'],
      plugins: [
        externalGlobals({
          'element-plus': 'ElementPlus',
          echarts: 'echarts',
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://sjcj.gzedu.gov.cn/edumap/jeecg-system',
        ws: false,
        changeOrigin: true, // 允许跨域
        // 以下配置rewrite表示，将开发中网络请求的 xxx/api 全部替换为空字符串，并输出target中的地址作为代替
        // 比如 http://localhost/api 将转为 https://sjcj.gzedu.gov.cn/edumap/jeecg-system
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
