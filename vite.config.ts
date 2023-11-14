import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc // 文件系统路径别名
    }
  },
  plugins: [
    UnoCSS(),
    vue(),
    vueJsx(), // 支持jsx、tsx的写法
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc + '/autoImport', 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep', 'carbon', 'noto']
        })
      ],
      dts: path.resolve(pathSrc + '/autoImport', 'components.d.ts')
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    })
  ],
  server: {
    host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址
    port: 9527, // 指定开发服务器端口
    strictPort: true, // 若端口已被占用则会直接退出
    https: false, // 启用 TLS + HTTP/2
    open: false // 启动时自动在浏览器中打开应用程序
  }
})
