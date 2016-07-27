module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapEmbed: true,
                    sourceMapContents: true
                },
                files: {
                    'web/css/main.css': 'app/Resources/css/main.scss'
                }
            }
        },
        copy: {
            app: {
                expand: true,
                flatten: true,
                src: 'app/Resources/js/*',
                dest: 'web/js/app/'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
                dest: 'web/fonts/bootstrap/'
            },
            jquery: {
                expand: true,
                flatten: true,
                src: 'bower_components/jquery/dist/*',
                dest: 'web/js/jquery/'
            },
            bootstrapjs: {
                expand: true,
                flatten: true,
                src: 'bower_components/bootstrap-sass/assets/javascripts/*',
                dest: 'web/js/bootstrap/'
            },
            parsleyjs: {
                expand: true,
                flatten: true,
                src: [
                    'bower_components/parsleyjs/dist/parsley.js',
                    'bower_components/parsleyjs/src/parsley.css',
                ],
                dest: 'web/js/parsley/'
            }
        },
        eslint: {
            appFiles: {
                src: ["app/Resources/js/**/*.js"]
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['eslint', 'sass', 'copy']);
};
