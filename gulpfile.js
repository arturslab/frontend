// Declare Gulp Plugins
const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

// Sources and distribution folder
var
	source = 'src/',
	dest = 'dist/'

// Bootstrap SCSS source
var bootstrapSass = {
	in: './node_modules/bootstrap/',
}

var imageSources = [source + 'assets/images/**.*']

// CSS source file: .scss files
var css = {
	in: [source + 'styles/vendor.scss', source + 'styles/app.scss'],
	out: dest + 'css/',
	watch: source + 'styles/**/*',
}

// Copy images
gulp.task('images', function () {
	return gulp.src(imageSources).pipe(gulp.dest(dest + 'assets/images'))
})

// Compile SCSS
gulp.task('sass', function () {
	return gulp.src(css.in).pipe(sourcemaps.init()).pipe(sass())
		.pipe(gulp.dest(css.out)).
		pipe(cleanCSS()).
		pipe(rename({ suffix: '.min' })).
		pipe(sourcemaps.write('./maps')).
		pipe(gulp.dest(css.out))
})

// Default task
gulp.task('default', ['sass', 'images'], function () {
	gulp.watch(css.watch, ['sass'])
})
