import serve from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import del from 'del';
import gulp from 'gulp';
import rename from 'gulp-rename';
import template from 'gulp-template';
import gutil from 'gulp-util';
import path from 'path';
import colorsSupported from 'supports-color';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import yargs from 'yargs';

const root = 'client';

// helper method for resolving paths
const resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

const resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
const paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  scss: resolveToApp('**/*.scss'), // stylesheets
  html: [resolveToApp('**/*.html'), path.join(root, 'index.html')],
  entry: ['babel-polyfill', path.join(__dirname, root, 'app/app.js')],
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist'),
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], cb => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log(
      '[webpack]',
      stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true,
      })
    );

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry);

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: root },
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false,
        },
        publicPath: config.output.publicPath,
      }),
      webpackHotMiddleware(compiler),
    ],
  });
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
  const cap = val => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp
    .src(paths.blankTemplates)
    .pipe(
      template({
        name: name,
        upCaseName: cap(name),
      })
    )
    .pipe(
      rename(path => {
        path.basename = path.basename.replace('temp', name);
      })
    )
    .pipe(gulp.dest(destPath));
});

gulp.task('clean', cb => {
  del([paths.dest]).then(function(paths) {
    gutil.log('[clean]', paths);
    cb();
  });
});

gulp.task('default', ['watch']);
