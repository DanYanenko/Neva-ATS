var 
	gulp = require('gulp'),
	minifyCss = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    del = require('del'),
    gutil = require('gulp-util'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'),
    size = require("gulp-size"),
    plumber = require('gulp-plumber');
 
gulp.task('jade',function(){
	gulp.src('app/markups/_pages/*.jade')
		.pipe(plumber())
        .pipe(jade({
			pretty:true
		}))
		.pipe(gulp.dest('app/'));	
});



gulp.task('css', function () {
  return gulp.src('app/styles/main.scss')
  	.pipe(plumber())
    .pipe(sass())
  	.pipe(autoprefixer('Firefox > 20'))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('server', function(){
	browserSync({
		port:9000,
		server: {
			baseDir:'./app'
		}
	});
});

gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({
     
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./app/'));

});

gulp.task('watch', function(){
    gulp.watch('app/markups/**/*.jade', ['jade']);
    gulp.watch('app/styles/**/*.scss', ['css']);
    gulp.watch('app/index.html', ['bower']);
    
    gulp.watch([
        'app/index.html', 
        'app/css/*.css',
        'app/js/*.js'
        ]).on('change', browserSync.reload);
});

gulp.task('default', ['jade', 'css', 'server','watch']);


/*********************************

	Сборка DIST

*********************************/

//Очистка директория DIST
gulp.task("clean-dist", function () {
    return del(['dist/**/**'], function(err, paths){
		console.log('Deleted files/folders:\n', path.join('\n'));
	});
});

// Перенос шрифтов
gulp.task("fonts", function() {
    gulp.src("./app/Fonts/*.*")
        // .pipe(filter(["*.css,*.eot","*.svg","*.ttf","*.woff","*.woff2"]))
        .pipe(gulp.dest("./dist/Fonts/"));
});

// Перенос картинок
gulp.task("images", function () {
    return gulp.src("./app/img/**/*")
            .pipe(gulp.dest("./dist/img"));
});

// Перенос остальных файлов (favicon и т.д.)
gulp.task("extras", function () {
    return gulp.src(["./app/*.*", "!./app/*.html"])
            .pipe(gulp.dest("./dist"));
});

// Подключение js и css
gulp.task('useref', function () {
	var assets = useref.assets();

    return gulp.src('./app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist/'));
});

// Вывод размера папки APP
gulp.task("size-app", function () {
    return gulp.src("app/**/*").pipe(size({title: "APP size: "}));
});

//Сборка всего в DIST

gulp.task('dist', ['useref', 'fonts', 'images']);

//Запуск сборки после очистки папки DIST

gulp.task('build', ['clean-dist'], function(){
	gulp.start('dist');
});
