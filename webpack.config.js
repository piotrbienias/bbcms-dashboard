/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TsImportPlugin = require('ts-import-plugin');




module.exports = {
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        filename: 'main.js',
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [
                            TsImportPlugin({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: 'css'
                            })
                        ]
                    }),
                    transpileOnly: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};