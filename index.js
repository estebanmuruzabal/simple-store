require("babel-register");

/**
 * Intl APIs (ECMA-402) Polyfill.
 */
require('./src/utils/intlServerPolyfill');

/**
 * Start application server.
 */
require('./src/server');

/**
 * In development, also start Webpack dev server.
 */
if (process.env.NODE_ENV === 'development') {
    require('./webpack/server');
}
