gulp          = require 'gulp'
babel         = require 'gulp-babel'
browserify    = require 'browserify'
source        = require 'vinyl-source-stream'
glob          = require 'glob'
plumber       = require 'gulp-plumber'

gulp.task 'build', ->
  files = glob.sync './components/*.{js,jsx,coffee}'
  browserify
    entries: files,
    debug: true
  .transform 'babelify'
  .bundle()
  .pipe plumber((err) ->
      console.log(err)
      this.emit('end')
    )
  .pipe source 'bundle.js'
  .pipe gulp.dest 'app/assets/javascripts/components'
  .pipe gulp.dest 'app/assets/javascripts/admin/components'

gulp.task 'watch', ->
  gulp.watch('./components/*.{js,jsx,coffee}', ['build'])

gulp.task 'default', ['build', 'watch']
