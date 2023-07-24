import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Dashboard from './pages/Dashboard';
import Flashcards from './pages/Flashcards';
import StudyMaterial from './pages/StudyMaterial';
import Summaries from './pages/Summaries';
import Account from './pages/Account';

const Tab = createBottomTabNavigator();


export default function Navigator() {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: '#004257',
                    height: 68
                }
            }}>
            <Tab.Screen
                name="Flashcards" 
                component={Flashcards} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, focused }) =>{
                        return (
                            <Image
                            style={{ width: 45, height: 45 }}
                            source={require('../src/assets/flash-card.png')}
                            />
                        )}
                }}/>

            <Tab.Screen name="StudyMaterial" component={StudyMaterial} 
                options={{headerShown: false,
                    tabBarIcon: ({ size, focused }) =>{
                        return (
                            <Image
                            style={{ width: 45, height: 45 }}
                            source={require('../src/assets/books.png')}
                            />
                        )}
                }}/>
            
            <Tab.Screen name="Dashboard" component={Dashboard} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, focused }) =>{
                        return (
                            <Image
                            style={{ width: 45, height: 45 }}
                            source={require('../src/assets/dashboard2.png')}
                            />
                        )}
                }}/>

            <Tab.Screen name="Summaries" component={Summaries} 
            options={{
                headerShown: false,
                tabBarIcon: ({ size, focused }) =>{
                    return (
                        <Image
                        style={{ width: 45, height: 45 }}
                        source={require('../src/assets/bloco-de-anotacoes.png')}
                        />
                    )}
            }}/>

            <Tab.Screen name="Account" component={Account} 
            options={{
                headerShown: false,
                tabBarIcon: ({ size, focused }) =>{
                    return (
                        <Image
                        style={{ width: 45, height: 45 }}
                        source={require('../src/assets/User.png')}
                        />
                    )}
            }}/>
        </Tab.Navigator>
    )
}