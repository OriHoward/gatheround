import App from './App'
import { AuthProvider } from './app/context/AuthContext'
import { AxiosProvider } from './app/context/AxiosContext'
import React from 'react'
import { registerRootComponent } from 'expo'

const Root = () => {
	return (
		<AuthProvider>
			<AxiosProvider>
				<App />
			</AxiosProvider>
		</AuthProvider>
	)
}


export default registerRootComponent(Root)
