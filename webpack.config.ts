import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ProgressPlugin, Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    const config: Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            isProd &&
                new MiniCssExtractPlugin({
                    filename: 'css/[name].[contenthash:8].css',
                    chunkFilename: 'css/[name].[contenthash:8].css',
                }),
            isDev && new ProgressPlugin(), // в проде как правило не юзают, т.к. может сильно замедлять сборку
        ].filter(Boolean),
        module: {
            rules: [
                // порядок лоадеров важен!
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                            },
                        },
                    ],
                },
                // ts-loader умеет работать с jsx
                // если бы мы не юзали тайпскрипт, то пришлось бы настраивать babel-loader
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev
            ? {
                  port: env.port ?? 3000,
                  open: true,
              }
            : undefined,
    };

    return config;
};
