import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
    input: 'src/index.js',
    plugins: [
        terser()
    ],
    output: [
        {
            name: 'vue-authenticate',
            file: pkg.browser,
            format: 'umd',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ]
};