import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development';

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                mode: 'local',
                localIdentName: isDev
                    ? '[name]__[local]_[hash:base64:5]'
                    : '[hash:base64:8]',
            },
        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                },
            },
        ],
    };

    const tsLoader = {
        // ts-loader умеет работать с jsx
        // если бы мы не юзали тайпскрипт, то пришлось бы настраивать babel-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [
        // порядок лоадеров важен!
        scssLoader,
        tsLoader,
    ];
}
