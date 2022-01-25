const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api',createProxyMiddleware({
        target: "https://locahost:8001",
        changeOrigin: true
    }))
}