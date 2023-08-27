import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Welcome } from '../pages/Welcome';
import { SingIn } from '../pages/SingIn';
import { SingUp } from '../pages/SingUp';
import { Dashboard } from '../pages/Dashboard';
import { Flashcards } from '../pages/Flashcards';
import { StudyMaterial } from '../pages/StudyMaterial';
import { Summaries } from '../pages/Summaries';
import { Account } from '../pages/Account';
import { Decks } from '../pages/Decks';
import { Temporary } from '../pages/Temporary';
import { Cards } from '../pages/Cards';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingIn"
          component={SingIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingUp"
          component={SingUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Temporary"
          component={Temporary}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
}
  
function MainStack() {
    return (
        <Stack.Navigator>
        <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Flashcards"
            component={Flashcards}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="StudyMaterial"
            component={StudyMaterial}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Summaries"
            component={Summaries}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Decks"
            component={Decks}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Cards"
            component={Cards}
            options={{ headerShown: false }}
        />
        </Stack.Navigator>
    );
}

export default function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AuthStack" component={AuthStack} options={{ tabBarStyle: { display: 'none' }, headerShown: false }} />
            <Tab.Screen name="MainStack" component={MainStack} options={{headerShown: false }}/>
        </Tab.Navigator>
    );
}




// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { Welcome } from '../pages/Welcome';
// import { SingIn } from '../pages/SingIn';
// import { SingUp } from '../pages/SingUp';
// import { Dashboard } from '../pages/Dashboard';
// import { Flashcards } from '../pages/Flashcards';
// import { StudyMaterial } from '../pages/StudyMaterial';
// import { Summaries } from '../pages/Summaries';
// import { Account } from '../pages/Account';
// import { Decks } from '../pages/Decks';
// import { Temporary } from '../pages/Temporary';
// import { Cards } from '../pages/Cards';

// const Stack = createNativeStackNavigator();

// export default function Routes(){
//     return(
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="Welcome"
//                 component={Welcome}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="SingIn"
//                 component={SingIn}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="SingUp"
//                 component={SingUp}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="Temporary"
//                 component={Temporary}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="Dashboard"
//                 component={Dashboard}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="Flashcards"
//                 component={Flashcards}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="StudyMaterial"
//                 component={StudyMaterial}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                 name="Summaries"
//                 component={Summaries}
//                 options={{headerShown: false}}
//             />
//             <Stack.Screen
//                name="Account"
//                component={Account}
//                options={{headerShown: false}}
//             />
//             <Stack.Screen
//                name="Decks"
//                component={Decks}
//                options={{headerShown: false}}
//             />
//             <Stack.Screen
//                name="Cards"
//                component={Cards}
//                options={{headerShown: false}}
//             />
//         </Stack.Navigator>
//     )
// }