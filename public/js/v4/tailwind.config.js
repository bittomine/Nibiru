/** @type {import('tailwindcss').Config} */
module.exports = {
    content : [
        './../../../view/templates/**/*.tpl',
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.php',
        './src/**/*.vue',
        './src/**/*.twig',
        './src/**/*.scss',
        './src/**/*.css',
        './src/**/*.json',
        './src/**/*.svg',
        './src/**/*.md',
        './src/**/*.markdown',
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
