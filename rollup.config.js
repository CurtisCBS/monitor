import config from './package.json'

const name = config.name

export default {
  entry: 'src/monitor.js',
  format: 'umd',
  moduleName: name,
  dest: `dist/${name}.js`
}
