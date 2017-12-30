import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    buble({
      exclude: 'node_modules/**',
      jsx: 'h'
    })
  ]
}
