"use strict"


const browserify = require('gulp-browserify');
const concatCss = require('gulp-concat-css');
const gulp = require('gulp');
const rename = require('gulp-rename');


gulp.task('build', ['script', 'styles']);
gulp.task('default', ['watch-script', 'watch-styles']);


gulp.task('watch-script', ['script'], () => gulp.watch('public/scripts/*.js', ['script']));
gulp.task('script', function() {
	gulp.src('public/scripts/index.js')
		.pipe(browserify({ insertGlobals: false }))
		.pipe(rename('script.js'))
		.pipe(gulp.dest('./public'));
});


gulp.task('watch-styles', ['styles'], () => gulp.watch('public/styles/*.css', ['styles']));
gulp.task('styles', function() {
	gulp.src([
		'./public/styles/*.css',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css' // Bootstrap
	])
		.pipe(concatCss('stylesheet.css', { rebaseUrls: false }))
		.pipe(gulp.dest('./public'));
});
