import 'dotenv/config'

import { ExpoConfig } from '@expo/config-types'

const config: ExpoConfig = {
	slug: 'tapa',
	name: 'TAPA',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'light',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	ios: {
		bundleIdentifier: 'com.team-ip.tapa',
		buildNumber: '1.0.0',
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
		package: 'com.team-ip.tapa',
	},
	extra: {
		backendBaseURL: process.env.BACKEND_BASE_URL ?? 'https://api.tip-tapa.kr',
	},
}

export default config
