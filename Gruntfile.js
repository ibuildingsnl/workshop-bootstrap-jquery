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
                src: ['bower_components/bootstrap-sass/assets/javascripts/*.js', 'bower_components/jquery/dist/*.js'],
                dest: 'web/js/'
            }
        },
        watch: {
            scripts: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'copy']);
};
