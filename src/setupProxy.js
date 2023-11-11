const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        "/getToken",
        createProxyMiddleware({
            target:"http://localhost:8080",
            changeOrigin:true,
        })
    )
    // app.use(
    //     "/api/board/listUnReplied/0",
    //     createProxyMiddleware({
    //         target:"http://localhost:8080",
    //         changeOrigin:true,
    //     })
    // )
}