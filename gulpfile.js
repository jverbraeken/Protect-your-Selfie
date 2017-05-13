"use strict"


const browserify = require('gulp-browserify');
const gulp = require('gulp');
const rename = require('gulp-rename');


gulp.task('build', ['script']);
gulp.task('default', ['watch-script']);


gulp.task('script', function() {
	gulp.src('public/scripts/index.js')
		.pipe(browserify({ insertGlobals: false }))
		.pipe(rename('script.js'))
		.pipe(gulp.dest('./public'));
});
gulp.task('watch-script', ['script'], function() {
	gulp.watch('public/scripts/*.js', ['script']);
});
