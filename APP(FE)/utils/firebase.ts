import * as SecureStore from 'expo-secure-store'
import {
	FirebaseError,
	FirebaseOptions,
	getApp,
	initializeApp,
} from 'firebase/app'
import { initializeAuth, ReactNativeAsyncStorage } from 'firebase/auth'
import { Auth, getReactNativePersistence } from 'firebase/auth/react-native'

import extra from './extra'

const firebaseConfig: FirebaseOptions = {
	...extra.firebase,
}

const sanitizeKey = (key: string) => key.replace(/:/g, '.')

/**
 * A wrapper around SecureStore(expo-secure-store) as ReactNativeAsyncStorage
 */
const AsyncStorage: ReactNativeAsyncStorage = {
	getItem: async key => {
		return SecureStore.getItemAsync(sanitizeKey(key))
	},
	removeItem: async key => {
		return SecureStore.deleteItemAsync(sanitizeKey(key))
	},
	setItem: async (key, value) => {
		return SecureStore.setItemAsync(sanitizeKey(key), value)
	},
}

const firebase = (() => {
	try {
		const app = getApp('tapa')
		// this is a workaround for AsyncStorage import issue
		// _getProvider is an internal API
		// see https://github.com/firebase/firebase-js-sdk/blob/b6c231a282313aeda59c447c24f71fdad35240bc/packages/app/src/internal.ts#L105
		const heartbeatController = (app as any).container
			?.getProvider('heartbeat')
			.getImmediate({ optional: true })
		if (heartbeatController) {
			void heartbeatController.triggerHeartbeat()
		}
		const authProvider = (app as any).container?.getProvider('auth')
		const auth: Auth = authProvider?.isInitialized()
			? authProvider.getImmediate()
			: initializeAuth(app, {
					persistence: getReactNativePersistence(AsyncStorage),
			  })
		return { app, auth }
	} catch (error) {
		if (error instanceof FirebaseError && error.code === 'app/no-app') {
			const app = initializeApp(firebaseConfig, 'tapa')
			const auth = initializeAuth(app, {
				persistence: getReactNativePersistence(AsyncStorage),
			})
			return { app, auth }
		} else {
			throw error
		}
	}
})()

export default firebase
