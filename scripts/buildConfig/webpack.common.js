const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Mustache = require('mustache');


const paths = require('../paths')
const readContent = require('../readContent')

const content = readContent();

console.log(JSON.stringify(content.languages, null, 2));

const createPluginsConfig = (content) => {
  return content.languages.items.map((language) => {
    const isDefaultLanguage = language.code === content.languages.defaultLanguageCode;

    return new HtmlWebpackPlugin({
      favicon: paths.src + '/images/favicon.ico',
      template: paths.src + '/template.html', // template file
      filename: `${isDefaultLanguage ? 'index' : language.code}.html`, // output file
    });
  });
};

const htmlFilesPlugins = createPluginsConfig(content);

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    ...htmlFilesPlugins,
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          preprocessor: async (template, loaderContext) => {
            let result;
            try {
              // @TODO: pass current language into template for interpolation
              result = Mustache.render(template, content);
            } catch (error) {
              await loaderContext.emitError(error);
              return process.exit(1);
            }
            return result;
          },
        },
      },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
