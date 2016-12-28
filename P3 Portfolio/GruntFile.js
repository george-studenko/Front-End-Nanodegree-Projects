module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      responsive_images: {
        dev: {
          options: {
            newFilesOnly: true,
            engine: 'gm',
            sizes: [{
              width: 1200,
              suffix: '_large_2x',
              quality: 90
            },
            {
              width: 800,
              suffix: '_medium_1x',
              quality: 90
            },{
            width: 400,
            suffix: '_small',
            quality: 90
          }
          ]
          },
          files: [{
            expand: true,
            src: ['*.{jpg,png}'],
            cwd: 'img_src/work/',
            dest: 'images/work/'
          }]
        }
      }
      });

  grunt.registerTask('default',['responsive_images']);
};
