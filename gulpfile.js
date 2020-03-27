var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	bless = require('gulp-bless'),
	livereload = require('gulp-livereload'),
	gulpUtil = require('gulp-util');

var assetsFolder = './assets/';

var config = {
	scripts: [
		'node_modules/bootstrap/dist/js/bootstrap.js',
		'assets/js/app/*'
	],
	sass: [
		(assetsFolder + 'sass/**/*.scss')
	],
	sassDest: (assetsFolder + 'css/'),
	scriptDest: (assetsFolder + 'js/')
};

gulp.task('scripts', function () {
	return gulp.src(config.scripts)
		.pipe(uglify().on('error', function (error) {
			gulpUtil.log(
				error.toString()
					.replace(/\/.*?\/(themes)\/.+?\//gi, '')
					.replace(/: syntaxerror/gi, ':\n\t' + gulpUtil.colors.red.bold.underline('SyntaxError'))
					.replace(/(filename:.+\/)(.+)/gi, '$1' + gulpUtil.colors.magenta.bold.underline('$2'))
					.replace(/(linenumber: )(\d+)/gi, '$1' + gulpUtil.colors.red.bold.underline('$2'))
			);
			this.emit('end');
		}))
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(config.scriptDest))
		.pipe(livereload());
});

gulp.task('sass', function () {
	return gulp.src(assetsFolder + 'sass/style.scss')
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(config.sassDest));
});

gulp.task('minify-css', gulp.series('sass', function () {
	return gulp.src([
		'node_modules/fontawesome/css/*.css',
		'node_modules/bootstrap/dist/css/bootstrap.css',
		assetsFolder + 'css/style.css',
		'!' + assetsFolder + 'css/all*min*.css'])
		.pipe(concat('all.min.css'))
		.pipe(bless())
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(config.sassDest))
		.pipe(livereload());
}));

gulp.task('watch', function () {
	livereload.listen(35729);
	gulp.watch('./*.php').on('change', function (file) {
		livereload.changed(file.path);
	});
	gulp.watch('./*.html').on('change', function (file) {
		livereload.changed(file.path);
	});
	gulp.watch(config.sass, gulp.series('sass', 'minify-css'));
	gulp.watch(assetsFolder + 'js/*/*.js', gulp.series('scripts'));
});

gulp.task('copy', function () {
	gulp.src([
		'node_modules/fontawesome/webfonts/**',
	]).pipe(gulp.dest("assets/webfonts/"));
});

gulp.task('default', gulp.series(gulp.parallel('copy', 'sass', 'minify-css', 'scripts', 'watch')));
