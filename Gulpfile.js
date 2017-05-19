const gulp = require('gulp');
var sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('babelfy', () => {
    return gulp.src('src/js/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('default', () => {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js',['babelfy']);
});




