/**
 * Load gulp plugins.
 */

var gulp = require('gulp')
var less = require('gulp-less')
var plumber = require('gulp-plumber')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var browserSync = require('browser-sync').create()
var babel = require('gulp-babel')
var webpack = require('webpack-stream')

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

/**
 * Processing CSS.
 * Merge all less files and prefix them for browsers.
 */
gulp.task('css', function () {
  return gulp.src('assets/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 5 versions', 'ie 10', 'android 4'] }))
    .on('error', swallowError)
    .pipe(gulp.dest('./'))
})

gulp.task('browser-sync', function () {
  browserSync.init({
    files: [
      './style.css',
      './**/*.php',
      './app.js',
    ],
    proxy: 'localhost/leaf',
  })
})

gulp.task('js', function () {
  return gulp.src('assets/js/*.js')
    .pipe(webpack())
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['browser-sync', 'css', 'js'], function () {
  gulp.watch('assets/less/**/*.less', ['css'])
  gulp.watch('assets/js/**/*.js', ['js'])
})