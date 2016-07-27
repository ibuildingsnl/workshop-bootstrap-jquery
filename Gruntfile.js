module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

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
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['sass']);
};
