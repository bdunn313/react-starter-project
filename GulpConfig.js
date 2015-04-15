module.exports = {
    js: {
        src: './src/js/app.jsx',
        dist: {
            path: './dist/js',
            filename: 'bundle.js'
        },
        watch: ['./src/js/**/*.js', './src/js/**/*.jsx']
    },
    html: {
        src: './src/html/**/*.html',
        dist: {
            path: './dist'
        },
        watch: './src/html/**/*.html'
    },
    browserSync: {
        server: './dist',
        open: false,
    }
};