var gulp = require("gulp"),
    gutil = require("gulp-util"),
    webpack = require("webpack"),
    rimraf = require("rimraf"),
    runSequence = require("run-sequence")

gulp.task("default", function () {
     
});

gulp.task("pack", function (callback) {
    // run webpack
    webpack(require('./webpack.config.js'), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("clean", function (callback) {
    rimraf('./wwwroot/dist/**/*', callback);
});

gulp.task("rebuild", function () {
    runSequence('clean', 'pack');
});