
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence');


// optimize images
gulp.task('images', function () {
    return gulp.src('./images/*')
        .pipe($.changed('./_build/images'))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./_build/images'));
});

gulp.task('fonts', function () {
    gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
        .pipe($.changed('./_build/fonts'))
        .pipe(gulp.dest('./_build/fonts'));
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// minify JS
gulp.task('minify-js', function () {
    gulp.src('js/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function () {
    gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
        .pipe($.rename({suffix: '.min'}))
        .pipe($.minifyCss({keepBreaks: true}))
        .pipe(gulp.dest('./styles/'))
        .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function () {
    var opts = {
        comments: true,
        spare: true,
        conditionals: true
    };

    gulp.src('./*.html')
        .pipe($.minifyHtml(opts))
        .pipe(gulp.dest('./_build/'));
});

// start webserver
gulp.task('server', function (done) {
    return browserSync({
        server: {
            baseDir: './'
        }
    }, done);
});

// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function (done) {
    return browserSync({
        server: {
            baseDir: './_build/'
        }
    }, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
    del([
        './_build/'
        // if we don't want to clean any file we can use negate pattern
        //'!dist/mobile/deploy.json'
    ], cb);
});

// concat files
gulp.task('concat', function () {
    gulp.src('./js/*.js')
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest('./_build/'));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// index.html build
// script/css concatenation
gulp.task('usemin', function () {
    return gulp.src('./index.html')
    // add templates path
        .pipe($.htmlReplace({
            'templates': '<script type="text/javascript" src="js/templates.js"></script>',
            'meta': "<meta http-equiv='Content-Security-Policy' content='*' />"
        }))
        .pipe($.usemin({
            css: [$.minifyCss(), 'concat'],
            nonangularlibs: [$.uglify()],
            libs: [$.uglify()],
            angularlibs: [$.uglify()],
            mainapp: [$.uglify()]
        }))
        .pipe(gulp.dest('./_build/'));
});

// make templateCache from all HTML files
gulp.task('templates', function () {
    return gulp.src([
        './**/*.html',
        '!bower_components/**/*.*',
        '!node_modules/**/*.*',
        '!_build/**/*.*'
    ])
        .pipe($.minifyHtml())
        .pipe($.angularTemplatecache({
            module: 'app'
        }))
        .pipe(gulp.dest('_build/js'));
});

// reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// calculate build folder size
gulp.task('build:size', function () {
    var s = $.size();

    return gulp.src('./_build/**/*.*')
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function () {
                return 'Total build size ' + s.prettySize;
            }
        }));
});


// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch('styles/*.css', function (file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['*.html', 'views/*.html'], ['bs-reload']);
    gulp.watch(['app/**/*.js', 'components/**/*.js', 'js/*.js'], ['bs-reload']);
    gulp.watch('styles/**/*.scss', ['sass', 'minify-css']);
});


/**
 * build task:
 * 1. clean /_build folder
 * 2. copy and minimize images
 * 3. minify and copy all HTML files into $templateCache
 * 4. build index.html
 * 5. minify and copy all JS files
 * 6. copy fonts
 * 7. show build folder size
 *
 */
gulp.task('build', function (callback) {
    runSequence(
        'clean:build',
        'images',
        'templates',
        'usemin',
        'build:size',
        'concat',
        'fonts',
        callback);
});