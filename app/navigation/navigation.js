import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, Platform} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import * as SecureStore from 'expo-secure-store';
import Cookies from 'js-cookie';




import LoginContainer from '../screens/loginScreens/LoginContainer'
import MainContainer from '../screens/mainScreens/MainContainer'

const Stack = createNativeStackNavigator()

const Navigation = () => {
	const authContext = useContext(AuthContext)
	const [status, setStatus] = useState('loading')

	const loadJWT = useCallback(async () => {
		try {
			let jwt
			if (Platform.OS !== 'web') {
			const value = await SecureStore.getItemAsync('token') || {}
			jwt = JSON.parse(value.password)
			}else{
				const tokenString = Cookies.get('token')
				
				jwt = JSON.parse(tokenString)
			}
			
			authContext.setAuthState({
				accessToken: jwt.accessToken || null,
				refreshToken: jwt.refreshToken || null,
				authenticated: jwt.accessToken !== null,
			})
			setStatus('success')
		} catch (error) {
			setStatus('error')
			console.log(`JWT parsing Error: ${error.message}`)
			authContext.setAuthState({
				accessToken: null,
				refreshToken: null,
				authenticated: false,
			})
		}
	}, [])

	useEffect(() => {
		loadJWT()
	}, [loadJWT])

	if (status === 'loading') {
		console.log('HERE !!!')
		return <Text>Create an account</Text>
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{authContext?.authState?.authenticated === false ? (
					<Stack.Screen name="Login" component={LoginContainer} />
				) : (
					<Stack.Screen name="Home" component={MainContainer} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
