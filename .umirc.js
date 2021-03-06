export default {
  plugins: [
    'umi-plugin-dva',
    'umi-plugin-polyfill',
  ],
  // hashHistory: true,
  // publicPath: '/static/',
  // proxy: {
  //   "/api": {
  //     target: "http://jsonplaceholder.typicode.com/",
  //     changeOrigin: true,
  //     pathRewrite: { "^/api" : "" }
  //   }
  // },
  externals: {
    'BMap': 'BMap',
    'BMapLib': 'BMapLib',
  },
  theme: './src/common/theme.js',
}
