// Very much in the spirit of the BrowserSync + Browserify recipe: https://github.com/BrowserSync/recipes/tree/master/recipes/gulp.browserify
var gulp            = require('gulp');
var gutil           = require('gulp-util');
var source          = require('vinyl-source-stream');
var babelify        = require('babelify');
var watchify        = require('watchify');
var browserify      = require('browserify');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var config          = require('./GulpConfig.js');

/**
 * Browserify
 */

// Input file.
var bundler     = watchify(browserify(config.js.src, watchify.args));

// Babelify Transformation
bundler.transform(babelify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source(config.js.dist.filename))
        .pipe(gulp.dest(config.js.dist.path))
        .pipe(reload({stream: true, once: true}));
}

gulp.task('bundle', function () {
    return bundle();
});

/**
 * HTML
 */
gulp.task('html', function(){
    return gulp.src(config.html.src)
      .pipe(gulp.dest(config.html.dist.path))
      .on('error', function (err) {
        gutil.log(err.message);
        browserSync.notify("Couldnt Move HTML files!");
        this.emit("end");
      })
      .pipe(reload({stream: true}));
});

gulp.task('sync', ['bundle', 'html'], function() {
    browserSync(config.browserSync);
});

/**
 *  Watcher
 */
gulp.task('watch',['sync'], function() {
    gulp.watch(config.html.watch, ['html']);
});

/**
 * Default Task
 */
gulp.task('default', ['watch']);