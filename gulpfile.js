var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var runSequence = require('run-sequence');
var childprocess = require('child_process');
var stripCode = require('gulp-strip-code');
var tsProject = ts.createProject('tsconfig.json');
var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: "./docs",
            name: "dt-webshop",
            tsconfig: "tsconfig.json",
            ignoreCompilerErrors: true,
            excludeExternals:true
        }))
    ;
});

gulp.task('test-scripts', function () {
    return childprocess.exec('npm test', function (err, stdout, stderr) {
        console.log(stdout);
        if (stderr) console.log(stderr);
    })
});

gulp.task('build-clean', function () {
    return del(['dist/*']).then(paths => {
        //console.log('Deleted files and folders:\n', paths.join('\n'));
    })
});

gulp.task('build-scripts', function () {
    return childprocess.exec('ng build --prod', function (err, stdout, stderr) {
        console.log(stdout);
        if (stderr) console.log(stderr);
    })
});

gulp.task('copy', function () {
    //gulp.src('src/**/*.key').pipe(gulp.dest('dist/'));
    //gulp.src('src/**/*.crt').pipe(gulp.dest('dist/'));
    gulp.src('package.json').pipe(gulp.dest('dist/'));
    //gulp.src('.env').pipe(gulp.dest('dist/'));
    var tsResult = gulp.src('src/**/*.ts').pipe(stripCode({
        //start_comment: "prod-code-only-begin",
        //end_comment: "prod-code-only-end"
    })).pipe(tsProject())
    return tsResult.pipe(tsResult.js.pipe(gulp.dest("dist/")))
});


gulp.task('runprod', gulp.series('build-clean', 'build-scripts', 'copy'));
/*
gulp.task('start', function (callback) {
    runSequence('build-clean','build-scripts', callback);
});*/


module.exports = gulp;