import 'dotenv/config'

import { ExpoConfig } from '@expo/config-types'

const config: ExpoConfig = {
	name: 'TAPA',
	slug: 'tapa',
	owner: 'osam-tapa-tip',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'light',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
	},
	web: {
		favicon: './assets/favicon.png',
	},
	extra: {
		backendBaseURL:
			process.env.BACKEND_BASE_URL ?? 'https://tapa-tip.du.r.appspot.com',
		firebase: {
			apiKey: process.env.FIREBASE_API_KEY,
			appId: process.env.FIREBASE_APP_ID,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			databaseURL: process.env.FIREBASE_DATABASE_URL,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			projectId: process.env.FIREBASE_PROJECT_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		},
	},
}

export default config
