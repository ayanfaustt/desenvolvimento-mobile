import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SingIn"
                component={SingIn}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SingUp"
                component={SingUp}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Temporary"
                component={Temporary}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Flashcards"
                component={Flashcards}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="StudyMaterial"
                component={StudyMaterial}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Summaries"
                component={Summaries}
                options={{headerShown: false}}
            />
            <Stack.Screen
               name="Account"
               component={Account}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="Decks"
               component={Decks}
               options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}