/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'angular2-jwt/**/*.+(js|js.map)',
      'bootstrap/dist/**/*.+(min.js|min.css)',
      'fullcalendar/dist/*.+(min.js|min.css)',
      'jquery/dist/*.js',
      'moment/moment.js',
      'ng2-bs3-modal/**/*.js',
      'leaflet/dist/leaflet.js',
      'leaflet/dist/images/*.png',
      'leaflet.markercluster/dist/leaflet.markercluster.js',
      'leaflet.markercluster/dist/MarkerCluster.*',
      'packery/dist/*.min.js'
    ],
    sassCompiler: {
      includePaths: ['src/app/style'],
      cacheExclude: [/\/_[^\/]+$/]
    }
  });
};
