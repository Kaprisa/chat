const path = require('path')

const plugins = {
    progress: require('webpackbar'),
    clean: require('clean-webpack-plugin'),
    extractText: require('extract-text-webpack-plugin'),
    vue: require('vue-loader/lib/plugin'),
    sync: require('browser-sync-webpack-plugin'),
    html: require('html-webpack-plugin'),
    copy: require('copy-webpack-plugin'),
    sri: require('webpack-subresource-integrity')
}

module.exports = (env = {}, argv) => {
    const isProduction = argv.mode === 'production'

    return {
        context: path.resolve(__dirname, 'src'),

        entry: {
            app: [
                './sass/app.sass',
                'babel-polyfill',
                './js/app.js'
            ]
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '',
            filename: 'src/js/[name].js',
            crossOriginLoading: 'anonymous'
        },

        module: {
            rules: [
                {
                    test: /\.(sass)$/,
                    use: plugins.extractText.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: ! isProduction
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: ! isProduction,
                                    plugins: (() => {
                                        return isProduction ? [
                                            require('autoprefixer')({
                                                browsers: ['last 2 versions']
                                            }),
                                            require('cssnano')({
                                                discardComments: {
                                                    removeAll: true
                                                }
                                            })
                                        ] : []
                                    })()
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    outputStyle: 'expanded',
                                    sourceMap: ! isProduction
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader'
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                'transform-class-properties'
                            ]
                        }
                    }
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: /fonts/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                publicPath: '..'
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: ! isProduction,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: false
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false
                                }
                            }
                        }
                    ]
                },
                {
                    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    exclude: /images/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '../fonts/'
                        }
                    }]
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true,
                            removeScriptTypeAttributes: true,
                            removeStyleTypeAttributes: true
                        }
                    },
                }
            ]
        },

        devServer: {
            contentBase: path.join(__dirname, 'src'),
            port: 8080,
            overlay: {
                warnings: true,
                errors: true
            },
            quiet: true
        },

        plugins: (() => {
            let common = [
                new plugins.extractText({
                    filename: 'styles/[name].css'
                }),
                new plugins.html({
                    template: 'index.html',
                    filename: 'index.html',
                    minify: {
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }),
                new plugins.vue(),
                new plugins.progress({
                    color: '#5C95EE'
                })
            ]

            const production = [
                new plugins.clean(['public']),
                new plugins.sri({
                    hashFuncNames: ['sha384'],
                    enabled: true
                })
            ]

            const development = [
                new plugins.sync(
                    {
                        host: 'localhost',
                        port: 9090,
                        proxy: 'http://localhost:8080/'
                    },
                    {
                        reload: false
                    }
                )
            ]

            return isProduction
                ? common.concat(production)
                : common.concat(development)
        })(),

        devtool: (() => {
            return isProduction
                ? ''
                : 'source-map'
        })(),

        resolve: {
            extensions: ['.vue', '.js'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            alias: {
                '~': path.resolve(__dirname, 'src/src/'),
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    }
};
