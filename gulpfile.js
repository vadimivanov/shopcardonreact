var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    react = require('gulp-react'),
    minifyCss = require('gulp-minify-css');

var links = [
    'dev/public/source/components/add_card/add_card.js',
    'dev/public/source/components/cards_list/cards_list.js',
    'dev/public/source/components/custom_alert/custom_alert.js',
    'dev/public/source/components/login/login.js',
    'dev/public/source/models/parseList.js',
    'dev/public/source/components/main.js',
    'dev/public/source/index.js'
];

gulp.task('connect', function() {
    connect.server({
        root: 'dev/public',
        livereload: true
    });
});

gulp.task('compress-libs', function() {
    return gulp.src('dev/public/source/libs/*.js')
        .pipe(uglify())
        .pipe(concat('libs-min.js'))
        .pipe(gulp.dest('build/libs/'));
});
gulp.task('compress-views', function() {
    gulp.src(links)
        .pipe(react())
        .pipe(uglify())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('build/components/'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('dev/public/source/assets/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCss(""))
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('public/source/assets/**/*.css', ['css']);
//    gulp.watch('dev/public/source/components/**/*.js', ['compress-views']);
});

gulp.task('default', ['compress-views', 'css','compress-libs', 'watch']);
