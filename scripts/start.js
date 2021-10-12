// in ./build.js
const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/start.js');
const config = defaults.__get__('config');

/**
 * Do not mangle component names in production, for a better learning experience
 * @link https://kentcdodds.com/blog/profile-a-react-app-for-performance#disable-function-name-mangling

config.optimization.minimizer[0].options.terserOptions.keep_classnames = true;
config.optimization.minimizer[0].options.terserOptions.keep_fnames = true; */
//NOTE add alias for maplibre to replace mapbox - https://visgl.github.io/react-map-gl/docs/get-started/get-started
config.resolve.alias['mapbox-gl'] = 'maplibre-gl';