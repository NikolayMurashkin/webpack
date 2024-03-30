import { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer({ port }: BuildOptions): Configuration {
    return {
        port: port ?? 3000,
        open: true,
        // если развадать статикучерез NGinxто надо делать проксирование на index.html
        historyApiFallback: true,
        hot: true,
    };
}
