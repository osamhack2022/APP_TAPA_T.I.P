import * as SecureStore from 'expo-secure-store'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import { initializeAuth, ReactNativeAsyncStorage } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'

const firebaseConfig: FirebaseOptions = {
	apiKey: '',
	appId: '',
	authDomain: '',
	databaseURL: '',
	measurementId: '',
	messagingSenderId: '',
	projectId: '',
	storageBucket: '',
}

/**
 * A wrapper around SecureStore(expo-secure-store) as ReactNativeAsyncStorage
 */
const AsyncStorage: ReactNativeAsyncStorage = {
	getItem: async key => SecureStore.getItemAsync(key),
	removeItem: async key => SecureStore.deleteItemAsync(key),
	setItem: async (key, value) => SecureStore.setItemAsync(key, value),
}

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})

const firebase = {
	app,
	auth,
}

export default firebase
