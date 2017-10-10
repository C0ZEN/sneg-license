// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
// jshint ignore: start
'use strict';

module.exports = function (grunt) {

    // Required
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates  : 'grunt-angular-templates',
        cdnify       : 'grunt-google-cdn'
    });

    // Configurable paths
    var appPaths = {
        app    : require('./bower.json').appPath,
        release: require('./bower.json').releasePath
    };

    // Config
    var globalConfig = {
        browserslist: require('./package.json').browserslist,
        prettier    : require('./package.json').prettier
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Binding
        paths        : appPaths,
        config       : globalConfig,
        currentTarget: 'toDefine',

        watch: {
            targets   : {
                files: [
                    '<%= paths.app %>/config/targets/*.json'
                ],
                tasks: [
                    'preprocess:dev'
                ]
            },
            languages : {
                files: [
                    '<%= paths.app %>/languages/**/*.json',
                    '<%= paths.app %>/scripts/**/*.json',
                    '!<%= paths.app %>/languages/min/*.json'
                ],
                tasks: [
                    'languages:dev'
                ]
            },
            js        : {
                files: [
                    '<%= paths.app %>/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'jsMin:dev',
                    'notify:buildReady'
                ]
            },
            less      : {
                files: [
                    '<%= paths.app %>/**/*.less'
                ],
                tasks: [
                    'less:main',
                    'postcss:dev',
                    'cssmin:dev'
                ]
            },
            html      : {
                files: [
                    '<%= paths.app %>/**/*.html'
                ],
                tasks: [
                    'wiredep',
                    'jsMin:dev',
                    'notify:buildReady'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files  : [
                    '<%= paths.app %>/scripts/sneg-license.min.js',
                    '<%= paths.app %>/styles/css/*.css',
                    '<%= paths.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options   : {
                port      : 9889,
                hostname  : 'localhost',
                livereload: 35789
            },
            livereload: {
                options: {
                    open      : true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appPaths.app)
                        ];
                    }
                }
            },
            test      : {
                options: {
                    port      : 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appPaths.app)
                        ];
                    }
                }
            }
        },

        clean: {
            server   : '.tmp',
            release  : {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= currentTarget %>/**/*'
                        ]
                    }
                ]
            },
            languages: [
                '.tmp/languages'
            ]
        },

        postcss: {
            dev    : {
                options: {
                    map       : true,
                    processors: [
                        require('pixrem')(),
                        require('autoprefixer')({
                            browsers: globalConfig.browserslist,
                            cascade : true,
                            add     : true,
                            remove  : false,
                            supports: true,
                            flexbox : true,
                            grid    : true
                        })
                    ]
                },
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= paths.app %>/styles/css',
                        src   : '*.css',
                        dest  : '<%= paths.app %>/styles/css'
                    }
                ]
            },
            vendors: {
                options: {
                    map       : true,
                    processors: [
                        require('pixrem')(),
                        require('autoprefixer')({
                            browsers: globalConfig.browserslist,
                            cascade : true,
                            add     : true,
                            remove  : false,
                            supports: true,
                            flexbox : true,
                            grid    : true
                        })
                    ]
                },
                files  : {
                    '<%= currentTarget %>/styles/vendor.css': '<%= currentTarget %>/styles/vendor.css'
                }
            }
        },

        wiredep: {
            app: {
                src       : [
                    '<%= paths.app %>/config/tpls/index.tpl.html'
                ],
                ignorePath: /\.\.\//
            }
        },

        useminPrepare: {
            html   : '<%= currentTarget %>/index.html',
            options: {
                dest: '<%= currentTarget %>',
                flow: {
                    steps: {
                        js : [
                            'concat'
                        ],
                        css: [
                            'concat'
                        ]
                    }
                }
            }
        },

        usemin: {
            html: [
                '<%= currentTarget %>/index.html'
            ]
        },

        cssmin: {
            dev    : {
                options: {
                    keepSpecialComments: 0,
                    sourceMap          : true
                },
                files  : [
                    {
                        '<%= paths.app %>/styles/css/sneg-license.min.css': '<%= paths.app %>/styles/css/sneg-license.css'
                    }
                ]
            },
            vendors: {
                options: {
                    keepSpecialComments: 0,
                    sourceMap          : false
                },
                files  : [
                    {
                        '<%= currentTarget %>/styles/vendor.css': '<%= currentTarget %>/styles/vendor.css'
                    }
                ]
            }
        },

        uglify: {
            release: {
                options: {
                    compress : {
                        drop_debugger: true
                    },
                    mangle   : false,
                    sourceMap: true
                },
                files  : {
                    '<%= currentTarget %>/scripts/sneg-license.min.js': '<%= currentTarget %>/scripts/sneg-license.js'
                }
            },
            dev    : {
                options: {
                    compress : {
                        drop_debugger: true
                    },
                    mangle   : false,
                    sourceMap: true
                },
                files  : {
                    '<%= paths.app %>/scripts/sneg-license.min.js': '<%= paths.app %>/scripts/sneg-license.js'
                }
            },
            vendors: {
                options: {
                    compress : {
                        drop_debugger: true
                    },
                    mangle   : false,
                    sourceMap: false
                },
                files  : {
                    '<%= currentTarget %>/scripts/vendor.js': '<%= currentTarget %>/scripts/vendor.js'
                }
            }
        },

        imagemin: {
            release: {
                options: {
                    optimizationLevel: 5,
                    progressive      : true,
                    interlaced       : true
                },
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= paths.app %>/images',
                        src   : '**/*.{png,jpg,jpeg,gif,svg}',
                        dest  : '<%= currentTarget %>/images'
                    }
                ]
            }
        },

        htmlmin: {
            release: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace       : true,
                    removeAttributeQuotes    : true,
                    removeComments           : true,
                    removeCommentsFromCDATA  : true
                },
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= currentTarget %>',
                        src   : 'index.html',
                        dest  : '<%= currentTarget %>'
                    }
                ]
            }
        },

        ngtemplates: {
            release: {
                options: {
                    module : 'snegLicense',
                    htmlmin: '<%= htmlmin.release.options %>'
                },
                cwd    : '<%= paths.app %>',
                src    : [
                    '**/*.html',
                    '!index.html',
                    '!config/tpls/index.tpl.html'
                ],
                dest   : '.tmp/release/template-cache.js'
            }
        },

        copy: {
            styles       : {
                expand: true,
                cwd   : '.tmp/release/styles',
                src   : '*.css',
                dest  : '<%= currentTarget %>/styles/css'
            },
            languages    : {
                expand: true,
                cwd   : '<%= paths.app %>/languages/min',
                dest  : '<%= currentTarget %>/languages/',
                src   : '*.json'
            },
            other        : {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= paths.app %>/styles/css/',
                        src   : 'reset.min.css',
                        dest  : '<%= currentTarget %>/styles/css'
                    }
                ]
            },
            release      : {
                files: {
                    '<%= currentTarget %>/styles/sneg-license.css'    : '<%= paths.app %>/styles/css/sneg-license.css',
                    '<%= currentTarget %>/styles/sneg-license.min.css': '<%= paths.app %>/styles/css/sneg-license.min.css'
                }
            },
            components   : {
                files: [
                    {
                        expand: true,
                        cwd   : 'bower_components',
                        src   : [
                            '**/*.js',
                            '**/*.css',
                            '**/*.less'
                        ],
                        dest  : '<%= currentTarget %>/bower_components'
                    }
                ]
            },
            i18n         : {
                files: {
                    '<%= currentTarget %>/languages/i18n/fr.js': 'bower_components/angular-i18n/angular-locale_fr.js'
                }
            }
        },

        concurrent: {
            server : [
                'copy:styles'
            ],
            test   : [
                'copy:styles'
            ],
            release: [
                'copy:release',
                'copy:components',
                'imagemin:release'
            ]
        },

        'merge-json': {
            merge: {
                files: [
                    {
                        expand : true,
                        flatten: false,
                        cwd    : '<%= paths.app %>',
                        src    : [
                            '**/*.json',
                            '!config/targets/*.json',
                            '!languages/min/*.json'
                        ],
                        dest   : '.tmp/languages',
                        rename : function (dest, src) {
                            var lang = src.match(/[^/]+(?=\/[^/]+\.json$)/gim);
                            src      = src.match(/[^/]+(.json$)/gim);
                            return dest + '/' + lang + '/' + src;
                        }
                    },
                    {
                        expand : true,
                        flatten: false,
                        cwd    : 'bower_components/altran-angular-lib/release/languages',
                        src    : '*.json',
                        dest   : '.tmp/languages',
                        rename : function (dest, src) {
                            var lang = src.replace('.min.json', '');
                            src      = 'altran-angular-lib.json';
                            return dest + '/' + lang + '/' + src;
                        }
                    }
                ]
            },
            min  : {
                files: {
                    '<%= paths.app %>/languages/min/fr.min.json': [
                        '.tmp/languages/fr/*.json'
                    ],
                    '<%= paths.app %>/languages/min/en.min.json': [
                        '.tmp/languages/en/*.json'
                    ]
                }
            }
        },

        less: {
            main: {
                options: {
                    compress : false,
                    sourceMap: true
                },
                files  : {
                    '<%= paths.app %>/styles/css/sneg-license.css': '<%= paths.app %>/styles/less/sneg-license.less'
                }
            },
            tmp : {
                options: {
                    compress : false,
                    sourceMap: true
                },
                files  : {
                    '.tmp/release/styles/sneg-license.css': '<%= paths.app %>/styles/less/sneg-license.less'
                }
            }
        },

        'string-replace': {
            devIndex: {
                options: {
                    replacements: [
                        {
                            pattern    : /(..\/..\/)/gmi,
                            replacement: ''
                        }
                    ]
                },
                expand : true,
                cwd    : '<%= currentTarget %>',
                src    : 'index.html',
                dest   : '<%= currentTarget %>'
            },
            index   : {
                options: {
                    replacements: [
                        {
                            pattern    : /(..\/..\/)/gmi,
                            replacement: ''
                        }
                    ]
                },
                expand : true,
                cwd    : '<%= paths.app %>',
                src    : 'index.html',
                dest   : '<%= currentTarget %>'
            },
            cssPaths: {
                options: {
                    replacements: [
                        {
                            pattern    : /(..\/..\/)/gmi,
                            replacement: ''
                        }
                    ]
                },
                files  : {
                    '<%= currentTarget %>/styles/sneg-license.css'    : '<%= currentTarget %>/styles/sneg-license.css',
                    '<%= currentTarget %>/styles/sneg-license.min.css': '<%= currentTarget %>/styles/sneg-license.min.css'
                }
            }
        },

        preprocess: {
            dev    : {
                options: {
                    inline : true,
                    context: {
                        config: grunt.file.read('app/config/targets/config.dev.json'),
                        target: 'dev'
                    }
                },
                files  : {
                    '<%= paths.app %>/config/target.config.js': '<%= paths.app %>/config/tpls/target.config.tpl.js',
                    '<%= paths.app %>/index.html'             : '<%= paths.app %>/config/tpls/index.tpl.html'
                }
            },
            test   : {
                options: {
                    inline : true,
                    context: {
                        config: grunt.file.read('app/config/targets/config.test.json'),
                        target: 'test'
                    }
                },
                files  : {
                    '<%= paths.app %>/config/target.config.js': '<%= paths.app %>/config/tpls/target.config.tpl.js',
                    '<%= currentTarget %>/index.html'         : '<%= paths.app %>/config/tpls/index.tpl.html'
                }
            },
            preprod: {
                options: {
                    inline : true,
                    context: {
                        config: grunt.file.read('app/config/targets/config.preprod.json'),
                        target: 'preprod'
                    }
                },
                files  : {
                    '<%= paths.app %>/config/target.config.js': '<%= paths.app %>/config/tpls/target.config.tpl.js',
                    '<%= currentTarget %>/index.html'         : '<%= paths.app %>/config/tpls/index.tpl.html'
                }
            },
            prod   : {
                options: {
                    inline : true,
                    context: {
                        config: grunt.file.read('app/config/targets/config.prod.json'),
                        target: 'prod'
                    }
                },
                files  : {
                    '<%= paths.app %>/config/target.config.js': '<%= paths.app %>/config/tpls/target.config.tpl.js',
                    '<%= currentTarget %>/index.html'         : '<%= paths.app %>/config/tpls/index.tpl.html'
                }
            }
        },

        concat: {
            scripts: {
                src : [
                    '.tmp/release/scripts/app.min.js',
                    '.tmp/release/scripts/main.min.js'
                ],
                dest: '.tmp/release/scripts/sneg-license.min.js'
            },
            js     : {
                src : [
                    '<%= paths.app %>/**/*.js',
                    '!<%= paths.app %>/**/*.tpl.js',
                    '!<%= paths.app %>/scripts/sneg-license.js',
                    '!<%= paths.app %>/scripts/sneg-license.min.js'
                ],
                dest: '<%= paths.app %>/scripts/sneg-license.js'
            },
            release: {
                src : [
                    '<%= paths.app %>/**/*.js',
                    '.tmp/release/template-cache.js',
                    '!<%= paths.app %>/**/*.tpl.js',
                    '!<%= paths.app %>/scripts/sneg-license.js',
                    '!<%= paths.app %>/scripts/sneg-license.min.js'
                ],
                dest: '<%= currentTarget %>/scripts/sneg-license.js'
            }
        },

        notify: {
            test      : {
                options: {
                    title  : '"TEST"',
                    message: 'This is just a test !'
                }
            },
            serve     : {
                options: {
                    title  : '"SERVE"',
                    message: 'Task complete ! Enjoy the app !'
                }
            },
            release   : {
                options: {
                    title  : '"RELEASE"',
                    message: 'Task complete !'
                }
            },
            buildReady: {
                options: {
                    title  : '"BUILD READY"',
                    message: 'The last build was successful ! You can now refresh your browser.'
                }
            }
        },

        notify_hooks: {
            options: {
                enabled                 : true,
                max_jshint_notifications: 5,
                success                 : false,
                duration                : 5,
                windowsVerbatimArguments: true
            }
        },

        prettier: {
            options: globalConfig.prettier,
            files  : {
                src: [
                    '<%= paths.app %>/**/*.js'
                ]
            }
        },

        release: {
            test   : {
                target: 'test'
            },
            preprod: {
                target: 'preprod'
            },
            prod   : {
                target: 'prod'
            }
        },

        jsMin: {
            dev    : {},
            release: {}
        },

        languages: {
            dev    : {},
            release: {}
        }
    });

    // Start the notify system
    grunt.loadNpmTasks('grunt-notify');
    grunt.task.run('notify_hooks');

    // Start a local node server for dev purpose
    grunt.registerTask('serve', 'Compile then start a connect web server', function () {
        grunt.task.run([
            'clean:server',
            'preprocess:dev',
            'wiredep',
            'jsMin:dev',
            'less:main',
            'languages:dev',
            'concurrent:server',
            'string-replace:devIndex',
            'postcss:dev',
            'cssmin:dev',
            'connect:livereload',
            'notify:serve',
            'watch'
        ]);
    });

    // Merge the languages
    grunt.registerMultiTask('languages', 'Languages task to compile the .json', function () {

        // Get the current target
        var target = this.target;

        // Run the languages task
        if (target === 'dev') {
            grunt.task.run([
                'clean:languages',
                'merge-json:merge',
                'merge-json:min'
            ]);
        }
        else if (target === 'release') {
            grunt.task.run([
                'clean:languages',
                'merge-json:merge',
                'merge-json:min',
                'copy:languages'
            ]);
        }
    });

    // Create the min files for dev
    grunt.registerMultiTask('jsMin', 'JS min task to compile the .js', function () {

        // Get the current target
        var target = this.target;

        // Run the jsMin task
        if (target === 'dev') {
            grunt.task.run([
                'concat:js',
                'uglify:dev',
                'merge-json:min'
            ]);
        }
        else if (target === 'release') {
            grunt.task.run([
                'ngtemplates:release',
                'concat:release',
                'uglify:release',
                'merge-json:min'
            ]);
        }
    });

    // Create the release version
    // You can specify the env (e.g: grunt release:prod)
    // The default env is test
    grunt.registerMultiTask('release', 'Create a new stable version', function () {

        // Get the current target
        var target = this.data.target;
        grunt.config.set('currentTarget', target);

        // Run the release task
        grunt.task.run([
            'clean:release',
            'preprocess:' + target,
            'wiredep',
            'jsMin:release',
            'less:main',
            'languages:release',
            'postcss:dev',
            'cssmin:dev',
            'string-replace:index',
            'useminPrepare',
            'usemin',
            'concat:generated',
            'uglify:vendors',
            'postcss:vendors',
            'cssmin:vendors',
            'htmlmin:release',
            'copy:release',
            'copy:i18n',
            'imagemin:release',
            'string-replace:cssPaths',
            'notify:release'
        ]);
    });
};