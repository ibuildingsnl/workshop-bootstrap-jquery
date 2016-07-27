module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-eslint");

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapContents: true
                },
                files: {
                    'web/css/main.css': 'app/Resources/css/main.scss'
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                flatten: true,
                src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
                dest: 'web/fonts/bootstrap/'
            },
            scripts: {
                expand: true,
                flatten: true,
                src: [
                    'bower_components/bootstrap-sass/assets/javascripts/*.js',
                    'bower_components/jquery/dist/*.js',
                    'bower_components/parsleyjs/dist/parsley.js',
                    'app/Resources/js/register.js'
                ],
                dest: 'web/js/'
            },
            styles: {
                expand: true,
                flatten: true,
                src: [
                    'bower_components/parsleyjs/src/parsley.css'
                ],
                dest: 'web/css/'
            }
        },
        eslint: {
            src: ['app/Resources/js/**/*.js']
        },
        watch: {
            sass: {
                files: ['app/**/*.scss'],
                tasks: ['sass']
            },
            files: {
                files: ['app/**/*.js'],
                tasks: ['copy']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'copy', 'eslint']);
    grunt.registerTask('test', ['eslint']);
};
