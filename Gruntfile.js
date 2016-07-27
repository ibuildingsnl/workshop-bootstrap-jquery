module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourceMap: true,
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
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'copy']);
};
