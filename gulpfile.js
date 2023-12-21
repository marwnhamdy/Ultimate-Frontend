var gulp = require("gulp");
concat = require("gulp-concat");
autoPrefixer = require("gulp-autoprefixer");
sass = require("gulp-sass")(require("sass"));
pug = require("gulp-pug");
livereload = require("gulp-livereload");
sourcemaps = require("gulp-sourcemaps");
minify = require("gulp-minify");
// uglify = require("gulp-uglify");
// notify = require("gulp-notify");
// zip = require("gulp-zip");
// ftp = require("vinyl-ftp");

// Html Task
gulp.task("html", function () {
  return gulp
    .src("stage/html/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

// Css Task
gulp.task("css", function () {
  return gulp
    .src(["stage/css/**/*css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoPrefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

// Js Task
gulp.task("js", function () {
  return gulp
    .src("stage/js/*.js") // (["project/js/*.js",!"project/js/one.js"]) except this file
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

// Watch Task
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("stage/html/**/*.pug", gulp.series("html"));
  gulp
    .watch(["stage/css/**/*css", "stage/css/**/*.scss"], gulp.series("css"))
    .on("change", livereload.changed);
  gulp.watch("stage/js/*.js", gulp.series("js"));
});
