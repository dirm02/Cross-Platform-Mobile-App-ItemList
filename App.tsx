// App.js
import React from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import { ItemsProvider } from './src/context/ItemsContext';

const App = () => {
  return (
    <ItemsProvider>
      <MainStackNavigator />
    </ItemsProvider>
  );
};

export default App;
