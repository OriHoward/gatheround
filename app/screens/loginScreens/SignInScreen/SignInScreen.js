import React, { useContext, useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert, Platform } from 'react-native'
import Logo from '../../../../assets/Images/logo-transparent-background.png'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../context/AuthContext'
import { AxiosContext } from '../../../context/AxiosContext'
import * as SecureStore from 'expo-secure-store'
import Cookies from 'js-cookie';

const SignInScreen = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const authContext = useContext(AuthContext)
	const { publicAxios } = useContext(AxiosContext)

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const onLogin = async () => {
		try {
			const response = await publicAxios.post('/login', {
				username,
				password,
			})

			const { access_token: accessToken, refresh_token: refreshToken } = response.data
			authContext.setAuthState({
				accessToken,
				refreshToken,
				authenticated: true,
			})
			if (Platform.OS !== 'web') {
				await SecureStore.setItemAsync(
					'token',
					JSON.stringify({
						accessToken,
						refreshToken,
					})
				)
			}else{
				Cookies.set('token', JSON.stringify({
					accessToken,
					refreshToken,
				}))

			}
		} catch (error) {
			Alert.alert('Login Failed', error)
		}
	}

	const onForgotPasswordPressed = () => {
		navigation.navigate('ForgotPassword')
	}

	const onSignUpPressed = () => {
		navigation.navigate('SignUp')
	}

	return (
		<ScrollView>
			<View style={styles.root}>
				<Image source={Logo} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
				<CustomInput placeholder="Username" value={username} setValue={setUsername} keyboardType="email-address" />
				<CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
				<CustomButton text="Sign In" onPress={onLogin} />
				<CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
				<SocialSignInButtons />
				<CustomButton text="Don't have an account? Sign up" onPress={onSignUpPressed} type="TERTIARY" />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		padding: 20,
		backgroundColor: 'white',
	},
	logo: {
		width: '80%',
		maxWidth: 600,
		maxHeight: 450,
	},
})

export default SignInScreen
