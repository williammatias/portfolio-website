var connect = require("gulp-connect");
const { watch, task, parallel, series, src, dest } = require("gulp");

task("check", function() {
 watch(["./src/*.html"], series("html"));
});

task("connect", function() {
  connect.server({
    root: "",
    livereload: true
  });
});

task("html", function() {
  return src("./src/*.html")
    .pipe(connect.reload());
});

exports.default = parallel("connect", "check");
