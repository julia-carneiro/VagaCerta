import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLoadingScreen({ navigation }) {
    useEffect(() => {
        const checkLogin = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                navigation.navigate('Auth', { screen: 'Home' }); 
            } else {
                navigation.navigate('Login'); 
            }
        };

        checkLogin();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

