import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development';

    const scssLoader = {
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
