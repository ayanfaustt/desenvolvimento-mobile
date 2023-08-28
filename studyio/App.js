import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Navigator from './src/navigator';
import { UserProvider } from './src/hooks/useContextUserId';


export default function App() {
  return (
    <NavigationContainer>
        <UserProvider>
          <StatusBar backgroundColor="#F1F5F6" barStyle="dark-content" />
          <Routes />
        </UserProvider>
    </NavigationContainer>
  );
}

//  to apanhando pra juntar o tab navigator com o stack navigator,
// boa sorte para quem for tentar, deus te abençoe.
// https://articles.wesionary.team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181






// import React from 'react';
// import { StatusBar } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import Routes from './src/routes';
// import Navigator from './src/navigator';
// import { UserProvider } from './src/hooks/useContextUserId';


// export default function App() {
//   return (
//     <NavigationContainer>
//       <UserProvider>
//         <StatusBar backgroundColor="#F1F5F6" barStyle="dark-content" />
//         {/* esse aqui é pra ver as telas de login e registro */}
//         <Routes />
//       {/* esse aqui é pra ver a navbar*/}
//       {/* <Navigator/> */}
//       </UserProvider>
//     </NavigationContainer>
//   );
// }

// //  to apanhando pra juntar o tab navigator com o stack navigator,
// // boa sorte para quem for tentar, deus te abençoe.
// // https://articles.wesionary.team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181