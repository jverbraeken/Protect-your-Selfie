"use strict"


const browserify = require('gulp-browserify');
const concatCss = require('gulp-concat-css');
const gulp = require('gulp');
const rename = require('gulp-rename');


gulp.task('build', ['script', 'styles']);
gulp.task('default', ['watch-script', 'watch-styles']);


gulp.task('watch-script', ['script'], () => gulp.watch('public/**/*.js', ['script']));
gulp.task('script', function() {
	gulp.src('public/organization/scripts/index.js')
		.pipe(browserify({ insertGlobals: false }))
		.pipe(rename('script.js'))
		.pipe(gulp.dest('./public/organization'));
	gulp.src('public/user/scripts/index.js')
		.pipe(browserify({ insertGlobals: false }))
		.pipe(rename('script.js'))
		.pipe(gulp.dest('./public/user'));
});


gulp.task('watch-styles', ['styles'], () => gulp.watch('public/**/*.css', ['styles']));
gulp.task('styles', function() {
	gulp.src([
		'./public/user/styles/*.css',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css' // Bootstrap
	])
		.pipe(concatCss('stylesheet.css', { rebaseUrls: false }))
		.pipe(gulp.dest('./public/user'));
	gulp.src([
		'./public/organization/styles/*.css',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css' // Bootstrap
	])
		.pipe(concatCss('stylesheet.css', { rebaseUrls: false }))
		.pipe(gulp.dest('./public/organization'));
});
