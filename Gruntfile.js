module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourcemap: 'inline',
                    loadPath: 'bower_components/bootstrap-sass/assets/stylesheets'
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

    grunt.registerTask('default', ['sass', 'copy']);
};
