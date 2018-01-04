var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var MarkdownIt = require('markdown-it');
var deflist = require('markdown-it-deflist');
var del = require('del');
var shell = require('gulp-shell');
var count = require('gulp-count-stat');

var md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true
});
md.use(deflist);

console.log(md.core.ruler.getRules(""));

md.core.ruler.push("game-term", function game_term_replace(state) {
    var s = "";

});

gulp.task('clean', function () {
    return del('html/**')
        .then(paths => { console.log('cleaned'); });
});


gulp.task('build', ['clean'], function () {
    return gulp.src(['**/*.md', '!node_modules/**'])
        .pipe(tap(markdownToHtml))
        .pipe(gulp.dest('./html'));
});


gulp.task('count', function () {
    return gulp.src(['**/*.md', '!node_modules/**'])
        .pipe(count());
});

function markdownToHtml(file) {
    var result = md.render(file.contents.toString());
    file.contents = new Buffer(result);
    file.path = gutil.replaceExtension(file.path, '.html');
    return;
}