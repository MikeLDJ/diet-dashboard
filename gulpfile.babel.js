'use strict'

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {create as bsCreate} from 'browser-sync';
import autoprefixer from 'autoprefixer';
import del from 'del';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();
const browserSync = bsCreate();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      prescision: 4,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 4 versions', 'Firefox ESR']
    }))
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('serve', () => {
  runSequence(['clean'], ['styles', 'scripts'], () => {
    browserSync.init({
      notify: false,
      port: 3100,
      server: {
        baseDir: ['dist', 'app'],
      }
    });

    gulp.watch([
      'app/*.html',
      'app/images/**/*',
      'app/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 3100,
    server: {
      baseDir: ['dist'],
    }
  });
});

gulp.task('build', ['html', 'images', 'fonts'], () => {
  return gulp.src('dist/**/*')
    .pipe($.size({
      title: 'build',
      gzip: true
    }));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence('clean', 'build', resolve);
  });
});
