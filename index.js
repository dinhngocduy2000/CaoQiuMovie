/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';
import {name as appName} from './app.json';

export default function Main() {
    return (
      
      <PopupRootProvider>
          <App />

      </PopupRootProvider>
    );
  }
AppRegistry.registerComponent(appName, () => App);
