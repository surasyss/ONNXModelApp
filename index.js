/**
 * @format
 */


// index.js

// Import the polyfill for TextDecoder
import { TextDecoder } from 'text-encoding';

// Apply the polyfill globally
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Other imports and code follow...
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
