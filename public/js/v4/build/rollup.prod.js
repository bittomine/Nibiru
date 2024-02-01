// rollup.prod.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

const config = [{
    input  : 'index.js',
    output : {
        file  : 'dist/rollup/bundle.es5.min.js',
        format: 'iife',
        name  : 'library'
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets     : [[
                "@babel/preset-env",
                {
                    "targets": {
                        "browsers": ["last 2 versions", "ie >= 11"]
                    }
                }]]
        }),
        terser() // Minify the js code
    ]
}, { // ES6 config
    input  : 'index.js',
    output : {
        file  : 'dist/rollup/bundle.es6.min.js',
        format: 'esm',
    },
    plugins: [
        resolve(),
        commonjs(),
        terser() // Minify the js code
    ]
}];
export default config;
