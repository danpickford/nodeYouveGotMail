const gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', [], function () {
    var options = {
       script: 'app.js',
       delayTime: 1,
       watch: ['*.js', 'modules/**/*.js']
    }
    return nodemon(options).on('restart', function (ev) {
        console.log('Change detected application restarting..');
    });
});