// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
const render = require('gulp-nunjucks-render');

// Files paths
const paths = {
  dist: 'dist',
  styles: 'src/assets/styles',
  images: 'src/assets/images',
  fonts: 'src/assets/fonts',
  scripts: 'src/scripts',
  partials: 'src/components/partials',
  pages: 'src/components/pages',
}

// Files names
const files = {
  styles: `${paths.styles}/**/*.scss`,
  images: `${paths.images}/**/*.*`,
  fonts: `${paths.fonts}/**/*.*`,
  scripts: `${paths.scripts}/**/*.js`,
  partials: `${paths.partials}/**/*.html`,
  pages: `${paths.pages}/**/*.html`,
}

// Dist files paths
const dist = {
  styles: `${paths.dist}/css`,
  scripts: `${paths.dist}/js`,
  pages: `${paths.dist}/`,
  images: `${paths.dist}/images`,
  fonts: `${paths.dist}/css/fonts`,
};

const scss = () => (
  src(files.styles)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest(dist.styles)) // put final CSS in dist folder
);

const fonts = () => (
  src(files.fonts)
    .pipe(dest(dist.fonts))
);

const images = () => (
  src(files.images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }]
    }))
    .pipe(dest(dist.images))
);

const js = () => (
  browserify([
    `${paths.scripts}/index.js`,
  ])
    .transform(babelify.configure({ presets : ["es2015"] }))
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(dist.scripts))
);

const watch = () => {
  watch([files.styles, files.scripts, files.pages, files.partials],
    parallel(scss, js, nunjucks));
}

const nunjucks = () => (
  src([files.pages])
    .pipe(render({
        path: [paths.partials]
      }))
    .pipe(dest(dist.pages))
);

exports.default = series(
  parallel(
    fonts,
    images,
    scss,
    js,
    nunjucks,
  ),
  watch
);

exports.default = parallel(
  fonts,
  images,
  scss,
  js,
  nunjucks,
);

exports.render = nunjucksRender;
exports.js = js;
exports.img = images;
exports.fonts = fonts;
