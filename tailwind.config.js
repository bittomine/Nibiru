/** @type {import('tailwindcss').Config} */
module.exports = {
    content : [
        './application/view/templates/**/*.tpl',
        './application/view/templates/**/*.php',
        './application/view/templates/**/*.twig',
        './client/**/*.html',
        './client/**/*.js',
        './client/**/*.jsx',
        './client/**/*.ts',
        './client/**/*.tsx',
        './client/**/*.vue',
        './client/**/*.scss',
        './client/**/*.css',
        './client/**/*.json',
        './client/**/*.svg',
        './client/**/*.md',
        './client/**/*.markdown',
    ],
    darkMode: 'media',
    theme   : {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins : [],
}
