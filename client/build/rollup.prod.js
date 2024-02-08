import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';


/**
 * @see https://rollupjs.org/guide/en/
 * @type {import('rollup').RollupOptions[]}
 */
const config = [{
    input  : 'client/index.js',
    output : {
        file: 'public/js/v4/rollup/bundle.es5.min.js',
        format : 'iife',
        name   : 'library',
        globals: {
            jquery: ['$', 'jQuery'],
        },
    },
    plugins: [
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets     : [[
                "@babel/preset-env",
                {
                    "targets": {
                        "browsers": ["last 2 versions", "ie >= 11"],
                    },
                }]],
        }),
        terser(), // Minify the js code
    ],
}, { // ES6 config
    input  : 'client/index.js',
    output : {
        file: 'public/js/v4/rollup/bundle.es6.min.js',
        format : 'esm',
        globals: {
            jquery: ['$', 'jQuery'],
        },
    },
    plugins: [
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        terser(), // Minify the js code
    ],
}];
export default config;
