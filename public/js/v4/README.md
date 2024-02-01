# nibiru

## Overview
Nibiru is an MMVC PHP Framework for rapid prototyping.

## Version
1.0.0

## Languages
- Node: >=16.0.0
- npm: >=7.0.0

## Dependencies
- Bootstrap: ~3.3.6
- Chart.js: ~1.0.2
- jQuery: ~2.1.4
- jQuery UI: ~1.12.1
- Tablesorter: ~2.31.3
- Tether: ~1.3.7

## Development Dependencies
- Babel Core: ^7.23.9
- Babel Preset Environment: ^7.23.9
- Rollup: ^2.56.3
- Webpack: ^5.90.0

## Building the project
To build the project, use the following npm scripts:

For development:
```shell
npm run bundle:webpack:dev
```

For production:
```shell
npm run bundle:webpack:prod
```

## Dual Bundling Strategy
The project uses a dual bundling strategy to create two separate JavaScript bundles: one with modern ES6 features (`bundle.es6.min.js`), and one transpiled to ES5 for legacy browser support (`bundle.es5.min.js`).

## Importing the Correct Bundle
Depending on the browser's capabilities, the corresponding JavaScript bundle is loaded:

```html
<script type="module" src="/public/js/v4/bundle.es6.min.js"></script>
<script nomodule src="/public/js/v4/bundle.es5.min.js"></script>
```
Here, the `type="module"` attribute interprets the script as an ES6 module. Conversely, the `nomodule` attribute prevents the script from loading in browsers that support the `type="module"` attribute.
