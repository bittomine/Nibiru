import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';


/**
 * @see https://rollupjs.org/guide/en/
 * @type {import('rollup').RollupOptions[]}
 */
const config = [{
    input  : 'index.js',
    output : {
        file     : 'dist/rollup/bundle.es5.js',
        format   : 'iife',
        name     : 'library',
        sourcemap: true,
        globals  : {
            jquery: ['$', 'jQuery'],
        },
    },
    plugins: [
        nodeResolve({
            browser       : true,
            preferBuiltins: false,
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
    ],
}, { // ES6 config
    input  : 'index.js',
    output : {
        file     : 'dist/rollup/bundle.es6.js',
        format   : 'esm',
        sourcemap: true,
        globals  : {
            jquery: ['$', 'jQuery'],
        },
    },
    plugins: [
        nodeResolve({
            browser       : true,
            preferBuiltins: false,
        }),
        commonjs(),
    ],
}];
export default config;
