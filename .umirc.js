export default {
  plugins: [
    'umi-plugin-dva',
    'umi-plugin-polyfill'
  ],
  proxy: {
    "/api": {
      target: "http://jsonplaceholder.typicode.com/",
      changeOrigin: true,
      pathRewrite: { "^/api" : "" }
    }
  },
}
