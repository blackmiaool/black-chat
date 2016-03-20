'use strict';
let gulp = require('gulp');
let react = require('gulp-react');
let babel = require('gulp-babel');
let livereload = require('gulp-livereload');
let gutil = require('gulp-util');
//let less = require('gulp-less');
let path = require('path');
let cached =require("gulp-cached");
function get_babel_params() {
    return {
        //        compact: false,
        presets: ['es2015','react'],
//        plugins: ["transform-es2015-modules-amd"]
        //        plugins: ["transform-runtime"],
        //        optional: ['runtime'],
//        harmony: false,
//        es6module: true
    }
}
gulp.task('jsx', function () {
    var babel_pipe = babel(get_babel_params());
    babel_pipe.on('error', function (ee) {
        gutil.log(ee);
        babel_pipe.end();
    });
    console.log("d")
    return gulp.src('jsx/**/*.jsx')
        .pipe(react())
        .pipe(babel_pipe)
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
})
gulp.task('js', ['jsx'], function () {
    var babel_pipe = babel(get_babel_params());
    babel_pipe.on('error', function (ee) {
        gutil.log(ee);
        babel_pipe.end();
    });
    return gulp.src('js/**/*.js')
        .pipe(babel_pipe)
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
})
gulp.task('mv-dist', function () {
    return gulp.src('libs/**/*')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
gulp.task('default', function () {
    gulp.start(["js","less", "mv-dist"]);
});
gulp.task('reload', function () {
    gulp.src("").pipe(livereload());
});
gulp.task('less', function () {
    let less = require('gulp-less');
    var e = less({
//        paths: [path.join(__dirname, 'less', 'includes')]
    });
//    e.on('error', function (ee) {
//        gutil.log(ee);
//        e.end();
//    });


    return gulp.src('less/**/*.less')
        .pipe(e)
        .pipe(cached("less"))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});
//gulp.watch('less/**/*.less', ['less']);
livereload.listen();
gulp.watch('less/**/*.less', ['less']);
gulp.watch('js/**/*.js', ['js']);
gulp.watch('jsx/**/*.jsx', ['js']);
gulp.watch('libs/**/*.*', ['mv-dist']);
gulp.watch('index.html', ['reload']);
gulp.watch('html/**/*.html', ['html']);