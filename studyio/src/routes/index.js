import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

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
import { SummarieOpen } from '../pages/SummarieOpen';


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
            <Stack.Screen
            name="Decks"
            component={Decks}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="SummarieOpen"
            component={SummarieOpen}
            options={{ headerShown: false }}
            />
      </Stack.Navigator>
    );
}
  
function MainStack() {
    return (
        <Tab.Navigator
            screenOptions={{

                tabBarStyle:{
                    backgroundColor: '#024959'
                }
            }}
        >
            <Tab.Screen
                name="Flashcards"
                component={Flashcards}
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Icon name='copy' size={30} color='#A7C6D9'/>
                        }

                        return <Icon name='copy-outline' size={30} color='#F0F2F2'/>
                    }
                }}
            />
             <Tab.Screen
                name="Summaries"
                component={Summaries}
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Icon name='document' size={30} color='#A7C6D9'/>
                        }

                        return <Icon name='document-outline' size={30} color='#F0F2F2'/>
                    }
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Icon name='bar-chart' size={30} color='#A7C6D9'/>
                        }

                        return <Icon name='bar-chart-outline' size={30} color='#F0F2F2'/>
                    }

                }}
            />
            <Tab.Screen
                name="StudyMaterial"
                component={StudyMaterial}
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Icon name='book' size={30} color='#A7C6D9'/>
                        }

                        return <Icon name='book-outline' size={30} color='#F0F2F2'/>
                    }
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Icon name='person-circle' size={30} color='#A7C6D9'/>
                        }

                        return <Icon name='person-circle-outline' size={30} color='#F0F2F2'/>
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ tabBarStyle: { display: 'none' }, headerShown: false }} />
            <Stack.Screen name="MainStack" component={MainStack} options={{headerShown: false }}/>
        </Stack.Navigator>
    );
}
