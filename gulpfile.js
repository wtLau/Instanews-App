var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync= require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass  = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyerror = require('gulp-prettyerror')

gulp.task('sass', function(){
  gulp.src ('./scss/style.scss')
    .pipe(prettyerror())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts',['eslint'], function(){
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname:'.min.js' })) 
    .pipe(gulp.dest('./build/js'))
});

gulp.task('eslint', function (){
    return gulp.src(['./js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());  
})

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir:'./'
    }
  });
  gulp.watch(['./build/js/*.js','./build/css/*.css']).on('change', browserSync.reload)
})

gulp.task('watch', function(){
  gulp.watch('./js/*.js',['scripts'])
  gulp.watch('./scss/*.scss',['sass'])
});

gulp.task('default', ['watch','browser-sync']);



//we need to declare a required depencies in order to run
//create a new file named min.js
//set this up at the beggining of the project
// setting a default task that run automatically
//npm install --save-dev gulp-uglify gulp-rename
//pipe is a node method
//watch what we're doing in js folder in the gulp.task
//use crt+ C to shut down gulp runnning in bash