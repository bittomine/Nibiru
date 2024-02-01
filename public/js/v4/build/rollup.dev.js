// rollup.prod.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const config = [{
    input  : 'index.js',
    output : {
        file     : 'dist/rollup/bundle.es5.js',
        format   : 'iife',
        name     : 'library',
        sourcemap: true
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
    ]
}, { // ES6 config
    input  : 'index.js',
    output : {
        file     : 'dist/rollup/bundle.es6.js',
        format   : 'esm',
        sourcemap: true,
    },
    plugins: [
        resolve(),
        commonjs(),
    ]
}];
export default config;
