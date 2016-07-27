module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourcemap: 'inline'
                },
                files: {
                    'web/css/main.css': 'app/Resources/css/main.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass']);
};
