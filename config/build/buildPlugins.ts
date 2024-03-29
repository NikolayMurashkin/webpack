import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';
import { Configuration, ProgressPlugin } from 'webpack';
import { BuildOptions } from './types/types';

export function buildPlugins({
    mode,
    paths,
}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
    ];

    if (isDev) {
        plugins.push(new ProgressPlugin()); // в проде как правило не юзают, т.к. может сильно замедлять сборку
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        );
    }

    return plugins;
}
