module.exports = function(grunt) {

    var options = {
        port: 8080
    };

    grunt.initConfig({
        options: options,
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: options.port,
                    base: '.'
                }
            }
        },
        watch: {

        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['connect', 'watch']);
};
