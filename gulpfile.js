var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync= require('browser-sync'),
    eslint = require('gulp-eslint')
//we need to declare a required depencies in order to run

gulp.task('scripts',['eslint'], function(){
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname:'.min.js' })) //create a new file named min.js
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
  gulp.watch(['./buil/js/*.js','./css/style.css']).on('change', browserSync.reload)
})

gulp.task('watch', function(){
  gulp.watch('./js/*.js',['scripts'])
});
//watch what we're doing in js folder in the gulp.task

gulp.task('default', ['watch','browser-sync']);
//set this up at the beggining of the project
// setting a default task that run automatically
//npm install --save-dev gulp-uglify gulp-rename
//pipe is a node method


//use crt+ C to shut down gulp runnning in bash