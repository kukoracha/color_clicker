var gulp = require('gulp')
var path = require('path')
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');

var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config');

var reactPath = './src/js/**/**/*';
var lessPath = './src/less/**/**/*';
var cssPath = './dist/assets/css/'; 
var jsPath = './dist/assets/js/'

gulp.task('less', function(){
    return gulp.src('./src/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(plumber.stop())
        .pipe(autoprefixer('last 2 versions', 'ie 10')) 
        .pipe(minifyCSS({keepBreaks: false, processImport: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(changed(cssPath, {hasChanged: changed.compareSha1Digest}))
        .pipe(gulp.dest(cssPath));         
});

gulp.task('react', function(){
    return gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(jsPath))
});

gulp.task('watch', ['less', 'react'], function(){
    gulp.watch([lessPath], ['less']);
    gulp.watch([reactPath], ['react']);
})

