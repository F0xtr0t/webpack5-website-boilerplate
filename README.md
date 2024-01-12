# webpack5-website-boilerplate
Simple boilerplate for starting website project with webpack

## Installation

Fork or download this repository then :

- `npm install` to install all dependencies

Once installed the project is ready to used.

## Use

Using the following commands:

- `npm run watch` Observe the modifications in the `src` folder and directly compile your files in the `dist` directory in "development" mode.
- `npm run build` Generate a "production" version of the `main.css` and `main.js` files and save it in the `manifest.json` in the `dist` folder. This can be used to generate the correct urls to the assets of your site. (see `index.php` for the example)

## Customization

You can customize the input and output directories as well as the name of the output files directly in the `webpack.config.js` file:

- `entryDir` (Default : './src/') : input directory
- `outputDir` (Default : './dist/') : output directory

The following folders are automatically generated in `/ dist /`:

- `js/` : Contains `main.js` and a` modules` directory including all chunkFiles.
- `css/` : Contains `main.css`.
- `images/` : Contains the copy of the image files and folders in the `/src/images/` directory.
- `fonts/` :  Contains the copy of the image files and folders in the `/src/fonts/` directory.

The project is configured to use ES6 and modern browsers. You can use the `.browserslistrc` file to adjust your settings :

Default :
Chrome >= 100
Safari >= 12
IOS >= 12
Firefox >= 93
Edge >= 100
not OperaMini all

The project also uses `postcss-loader` which can be configured directly from the file `postcss.config.js` at the root

## Plugins/loaders used

Plugins : 
- [MiniCssExtractPlugin](https://www.npmjs.com/package/mini-css-extract-plugin)
- [CopyPlugin](https://www.npmjs.com/package/copy-webpack-plugin)
- [WebpackManifestPlugin](https://www.npmjs.com/package/webpack-manifest-plugin)
- [webpack-remove-empty-scripts](https://www.npmjs.com/package/webpack-remove-empty-scripts)

Loaders : 
- [css-loader](https://www.npmjs.com/package/css-loader)
- [postcss-loader](https://www.npmjs.com/package/postcss-loader)
- [sass-loader](https://www.npmjs.com/package/sass-loader)
- [babel-loader](https://www.npmjs.com/package/babel-loader)

## Others

This project uses `webpack5` and requires a `node` version greater than `14.10.x`!

## Questions ?

Don't hesitate to contact me or leave a comment on this repo.
