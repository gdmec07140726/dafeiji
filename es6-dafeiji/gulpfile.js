










var gulp = require("gulp");

var babel = require('gulp-babel'); //es6转es5


var uglify = require("gulp-uglify");	//js压缩插件


gulp.task("bullet", function(){
	gulp.src("js/bullet.js")
		.pipe(babel({"presets": ["es2015"]})) //es6转es5
		.pipe( uglify() )
		.pipe( gulp.dest("uglify-js"));
})

gulp.task("Enemy", function(){
	gulp.src("js/Enemy.js")
		.pipe(babel({"presets": ["es2015"]})) //es6转es5
		.pipe( uglify() )
		.pipe( gulp.dest("uglify-js"));
})

gulp.task("myPlane", function(){
	gulp.src("js/myPlane.js")
		.pipe(babel({"presets": ["es2015"]})) //es6转es5
		.pipe( uglify() )
		.pipe( gulp.dest("uglify-js"));
})

gulp.task("gameEngine", function(){
	gulp.src("js/gameEngine.js")
		.pipe(babel({"presets": ["es2015"]})) //es6转es5
		.pipe( uglify() )
		.pipe( gulp.dest("uglify-js"));
})



var minify = require("gulp-minify-css");	//css压缩插件

gulp.task("dafeiji", function(){
	gulp.src("css/dafeiji.css")
		.pipe( minify() )
		.pipe(gulp.dest("minify-css"));
})


gulp.task("default", ["bullet", "Enemy", "myPlane", "gameEngine", "dafeiji"], function(){
	console.log("finish");
})





