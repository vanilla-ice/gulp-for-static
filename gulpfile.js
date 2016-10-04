var gulp        = require('gulp'),
    less        = require('gulp-less'),
    path        = require('path'),
    prefixer    = require('gulp-autoprefixer'),
    watch       = require('gulp-watch'),
    browserSync = require('browser-sync'),
    jade        = require('gulp-jade'),
    jquery      = require('gulp-jquery'),
    merge       = require('merge-stream'),

    reload      = browserSync.reload,

    slick = 'node_modules/slick-carousel/slick/',
    assets = 'build/';


gulp.task('copy', function() {
  gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('build/'));
});

gulp.task('style', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(prefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream: true}));
});


gulp.task('watch', function () {
    watch(['./src/**/*.less'], function () {
        gulp.start('style');
    });

    watch(['src/**/*.jade'], function () {
        gulp.start('templates');
    });
});

gulp.task('templates', function() {

  gulp.src('./src/*.jade')
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(reload({stream: true}));
});

gulp.task('jquery', function () {
	return jquery.src({
		release: 2 //jQuery 2
	})
	.pipe(gulp.dest('./build/javascripts'));
	// creates ./public/vendor/jquery.custom.js
});

// Server
var config = {
    server: {
        baseDir: "./build"
    },
    ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
    },
    tunnel: false,
    ui: false,
    host: 'localhost',
    logPrefix: "Simple Project Template"
};
gulp.task('server', function () {
    browserSync(config);
});


// Default task
gulp.task('default', ['copy', 'style', 'server', 'watch', 'templates', 'jquery']);
