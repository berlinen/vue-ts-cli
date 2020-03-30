import webpack from 'webpack'
import symbol from 'log-symbols';
import chalk from 'chalk'
const config = require('./webpack.build.js');

let build = () => {
    webpack(config, () => {
        console.log(symbol.success, chalk.green('打包完成'));
        process.exit(1);
    });
}

module.exports = build;