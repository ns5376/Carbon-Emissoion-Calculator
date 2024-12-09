const gulp = require('gulp');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');

// Define the lint task
function lint() {
    return gulp.src(['**/*.js', '!node_modules/**'])  // Adjust the file pattern as needed
        .pipe(eslint())                              // Run ESLint on files
        .pipe(eslint.format())                       // Output results
        .pipe(eslint.failAfterError());              // Fail task on error
}

// Watch for file changes and rerun lint
function watchFiles() {
    gulp.watch(['**/*.js', '!node_modules/**'], lint); // Watch all JS files except node_modules
}

// Define default task
gulp.task('default', gulp.series(lint, watchFiles));
