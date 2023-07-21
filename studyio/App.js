import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Navigator from './src/navigator';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F1F5F6" barStyle="dark-content"/>
      {/* esse aqui é pra ver as telas de login e registro */}
      {/* <Routes/> */}
      {/* esse aqui é pra ver a navbar*/}
      <Navigator/>
    </NavigationContainer>
  );
}

//  to apanhando pra juntar o tab navigator com o stack navigator, 
// boa sorte para quem for tentar, deus te abençoe.
// https://articles.wesionary.team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181