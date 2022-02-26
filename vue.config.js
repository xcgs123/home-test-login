const path = require("path");
// const HotHashWebpackPlugin = require("hot-hash-webpack-plugin");
const resolve = (dir) => path.join(__dirname, ".", dir);

const edRe = /[?&](?:ed)\b/i;

function needMock(req) {
  return edRe.test(req.headers.referer);
}

module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  devServer: {
    port: 9999,
    host: "0.0.0.0",
    https: false,
    open: true,
    before(app) {
      app.use((req, res, next) => {
        if (needMock(req)) {
          require("body-parser").urlencoded({
            extended: true,
          })(req, res, next);
        } else {
          next();
        }
      });
      app.get(/^\/data\//, mockupHandler);
      app.post(/^\/data\//, mockupHandler);
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/apis"))
      .set("components", resolve("src/components"));

    config.module
      .rule("svg")
      .test(/\.svg$/)
      .include.add(resolve("src/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader");

    // 生产环境配置
    if (process.env.NODE_ENV === "production") {
      config.output.filename("./js/[name].[chunkhash:8].js");
      config.output.chunkFilename("./js/[name].[chunkhash:8].js");
      config.plugin("extract-css").tap(() => [
        {
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].css",
        },
      ]);
      // config
      //   .plugin("hotHash")
      //   .use(HotHashWebpackPlugin, [{ version: "1.0.0" }]);

      config.optimization
        .minimize(true)
        .minimizer("terser")
        .tap((args) => {
          let { terserOptions } = args[0];
          terserOptions.compress.drop_console = true;
          terserOptions.compress.drop_debugger = true;
          return args;
        });
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: "common",
            chunks: "all",
            minSize: 1,
            minChunks: 2,
            priority: 1,
          },
          vendor: {
            name: "chunk-libs",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      });
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/style/params.less")],
    },
  },
};
