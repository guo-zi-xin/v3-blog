import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'; // 自动引入组件
import Components from 'unplugin-vue-components/vite'; // 按需引入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'; // 按需引入element-plus组件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // 支持svg
import viteCompression from "vite-plugin-compression"; // gzip压缩
import requireTransform from "vite-plugin-require-transform"; // 支持require

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'VUE_APP_', // 环境变量前缀
  envDir: './env', // 环境变量目录
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css', 'less', '.vue'], // 自动解析的扩展名
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'), // 源文件根目录
      '@tests': path.resolve(__dirname, 'tests'), // 测试文件根目录
      '@config': path.resolve(__dirname, 'src/config'), // 配置文件根目录    
    }
  },
  // 服务
  server: {
    port: 9090, // 指定端口号
    open: true, // 
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端服务实际地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/mock/api': {
        target: 'http://localhost:3000', // mock 服务实际地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock\/api/, '')
      },
    }
  },
  // 构建
  build: {
    /**
     * @chunkSizeWarningLimit
     * @type number
     * @default 500
     * @description 设置最终构建的打包文件大小上限，超过此大小会在控制台中显示警告信息
     */
    chunkSizeWarningLimit: 1500,
    /**
     * @sourcemap
     * @type boolean
     * @default modules
     * @description 设置最终构建的浏览器兼容目标
     */
    sourcemap: false, // 生产环境是否生成 source map 文件
    /**
     * @target
     * @type string | string[]
     * @default modules
     * @description 设置最终构建的浏览器兼容目标
     */
    target: 'es2015',
    /**
     * @outDir
     * @type string
     * @default dist
     * @description 指定输出路径（相对于 项目根目录）
     */
    outDir: 'dist',
    /**
     * @assetsDir
     * @type string
     * @default assets
     * @description 指定生成静态资源（js、css、img、fonts）的存放路径（相对于 build.outDir）。
     */
    assetsDir: 'assets',
    /**
     * @cssCodeSplit
     * @type boolean
     * @default true
     * @description 启用/禁用 CSS 代码拆分。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
     */
    cssCodeSplit: true,
    /**
     * @rollupOptions
     * @type RollupOptions
     * @description 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
     */
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [],
      // 指定文件输出的配置
      output: {
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; //代码分割为第三方包
          }
        }
      }
    },
    terserOptions: {
      // 打包后移除console和注释
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    /**
     * minify 压缩格式
     * @param minify boolean | 'terser' | 'esbuild'
     */
    minify: 'terser'
  },
  // 插件
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // gzip压缩
    viteCompression({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: "gzip", //压缩算法
      ext: ".gz", //文件类型
    }),
    // 让vite支持require
    requireTransform({
      fileRegex: /.ts$|.vue$/,
    }),
    // svg
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
    }),
  ],
})
