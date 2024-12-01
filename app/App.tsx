import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

import theme from './src/theme';
import { AuthProvider, useAuth } from './src/context/AuthContext';

import Login from './src/screens/Login';
import FormScreen from './src/screens/Form';
import List from './src/screens/List';
import Profile from './src/screens/Profile';
import Details from './src/screens/Details';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// Navegação de usuários autenticados
function AuthenticatedNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName: "home" | "home-outline" | "person" | "person-outline";

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
                tabBarActiveTintColor: theme.COLORS.GREEN,
                tabBarInactiveTintColor: theme.COLORS.GRAY_03,
                tabBarStyle: {
                    backgroundColor: theme.COLORS.GRAY_01,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                },
            })}
        >
            <Tab.Screen name="Home">
                {() => (
                    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                        <HomeStack.Screen name="List" component={List} />
                        <HomeStack.Screen name="Details" component={Details} />
                    </HomeStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function AppContent() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="Authenticated" component={AuthenticatedNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="FormScreen" component={FormScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <StatusBar style="auto" />
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
}
