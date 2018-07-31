export default {
  plugins: [
    'umi-plugin-dva',
    'umi-plugin-polyfill'
  ],
  hashHistory: true
  // proxy: {
  //   "/api": {
  //     target: "http://jsonplaceholder.typicode.com/",
  //     changeOrigin: true,
  //     pathRewrite: { "^/api" : "" }
  //   }
  // },
}
