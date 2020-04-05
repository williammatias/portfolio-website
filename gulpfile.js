const { watch, task, parallel, series, src, dest } = require("gulp"),
  connect = require("gulp-connect"),
  log = require("fancy-log"),
  gulpif = require("gulp-if"),
  minifyHTML = require("gulp-minify-html");
let sass = require("gulp-sass");
sass.compiler = require("node-sass");

let env, jsSources, sassSources, outputDir = 'build';

env = "production";


sassSources = ["src/assets/scss/style.scss"];

task("watch", function() {
  watch(["src/*.html"], series("html"));
  watch(["src/assets/scss/*.scss"], series("scss"));
});

task("connect", function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

task("html", function() {
  return src("./src/*.html")
    .pipe(gulpif(env === "production", minifyHTML()))
    .pipe(dest(outputDir))
    .pipe(connect.reload());
});

task("scss", function() {
  return src(sassSources)
    .pipe(gulpif(env !== "production", sass().on('error', log)))
    .pipe(gulpif(env === "production", sass({outputStyle: 'compressed'}).on('error', log)))
    .pipe(dest(outputDir + "/css"))
    .pipe(connect.reload());
});

exports.default = parallel("connect", "scss", "html", "watch");
