import React, {useEffect} from 'react'
import { NativeModules, Appearance } from 'react-native'
import {useStoreActions} from 'easy-peasy'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import views
import HomeScreen from '../views/Home'
import MenuScreen  from '../views/Menu'
import GameScreen from '../views/Game'
import SettingScreen from '../views/Setting'

const Routes = () => {

    // init store
    const selectLang = useStoreActions((actions) => actions.selectLang);
    const changeColorsMode = useStoreActions((action) => action.changeColorsMode)

    // read lang system
    const localeLang = NativeModules.I18nManager.localeIdentifier 
    selectLang(localeLang)

    // read color mode
    changeColorsMode({color: Appearance.getColorScheme(), type: 0})
    
    //init stack
    const Stack = createNativeStackNavigator();

    //effect event mode light/dark
    useEffect(() => {
        Appearance.addChangeListener(()=>{
            changeColorsMode({color: Appearance.getColorScheme(), type: 0})
        })
    }, [])
    

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Setting" component={SettingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes